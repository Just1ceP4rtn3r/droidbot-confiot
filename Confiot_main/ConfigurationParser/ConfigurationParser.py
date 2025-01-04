import os, sys
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.Confiot import Confiot
from Confiot_main.settings import settings
from Confiot_main.ConfigurationParser.PageExploration import PageExplorer
from Confiot_main.ConfigurationParser.OperationExtraction import OperationExtractor
from Confiot_main.utils.util import query_config_resource_mapping, parse_config_resource_mapping


class ConfigurationParser():

    def __init__(self, Agent: Confiot) -> None:
        self.Agent = Agent

        # App Pages
        self.PE = PageExplorer(self.Agent)
        self.app_pages_exploration()
        self.pages = self.PE.pages
        self.page_navigation_graph = self.PE.page_navigation_graph

        # operations
        # {
        #     "page-1":
        #   (
        #     {
        #         "1234abdf(viewhash)": [(text, distance), (text, distance)],
        #     },
        #     {
        #         "123abdf": operation_view, // operation_view["bounds"]
        #     }
        #   )
        # }
        self.operations = {}
        self.plain_labels = {}
        self.operations_extraction()

        # Page Contexts
        # {"page-1": [(view, text),]}
        self.page_context = {}
        self.pagecontext_extraction()

        self.save_operations_to_file(settings.Confiot_output)

        # LLM configuration mapping
        # {"page-1": {"configuration": [viewhash,...]}}
        self.operation_configuration_mapping = {}
        self.query_LLM_for_configuration_mapping(settings.Confiot_output)

    def app_pages_exploration(self):
        self.PE.parse_struture_unique_pages()
        self.PE.extract_navigations()

        if (not os.path.exists(settings.UIHierarchy_comparation_output + "/000/")):
            self.device_state_replay(settings.UIHierarchy_comparation_output + "/000/")

    def operations_extraction(self):
        page_xmls = {}
        for page in self.pages:
            xml_path = settings.UIHierarchy_comparation_output + "/000/" + f"{page}.xml"
            if (os.path.exists(xml_path)):
                page_xmls[page] = xml_path

        for page in page_xmls:
            operations, plain_labels, hashable_views = OperationExtractor(page_xml_file=page_xmls[page]).extract_operations()
            self.operations[page] = (operations, hashable_views)
            self.plain_labels[page] = plain_labels

    def pagecontext_extraction(self):
        replay_paths = {}
        for page in self.pages:
            steps = self.PE.find_path_to_page(page)
            if (page == self.page_navigation_graph.start_node or not steps):
                continue
            replay_paths[page] = steps

        context_operations = {}
        for page in self.pages:
            if (page not in replay_paths):
                continue
            xml_path = settings.UIHierarchy_comparation_output + "/000/" + f"{page}.xml"
            if (not os.path.exists(xml_path)):
                continue
            # 最后到达page所需要的最后一步，可选的operations
            last_page = list(replay_paths[page].keys())[-1]
            last_operations = replay_paths[page][last_page]
            context_operations[page] = []
            for op in last_operations:
                view, event = op
                text = None

                # find view-related text in last_page
                target_view_hash = None
                if (last_page == '000' and view is None):
                    text = "Start Application"
                else:
                    operations, hashable_views = self.operations[last_page]
                    for hash in hashable_views:
                        exist_view = hashable_views[hash]
                        if (view["resource_id"] == exist_view["resource_id"] and view["bounds"] == exist_view["bounds"] and
                                view["class"] == exist_view["class"] and view["clickable"] == exist_view["clickable"] and
                                view["checkable"] == exist_view["checkable"]):
                            target_view_hash = hash
                            break

                    if (target_view_hash in operations):
                        text = ','.join([tview[0]["text"] for tview in operations[target_view_hash]])

                context_operations[page].append((view, text))

        self.page_context = context_operations
        # for page in context_operations:
        #     print("page:")
        #     print("    ", context_operations[page][1])

    # walk through all pages and store the UI hierachy in UI/
    def device_state_replay(self, outputdir):
        self.PE.device_page_replay(outputdir)

    # - Operations
    # | - Page-1
    # | | - context
    # | | - operation_hash
    def save_operations_to_file(self, outputdir):
        save_dir = outputdir + "/Operations/"
        if (not os.path.exists(save_dir)):
            os.makedirs(save_dir)

        for page in self.operations:
            overview = {"PAGE": page, "CONTEXT": {}, "OPERATIONS": {}, "LABELS": {}}

            # save labels
            overview["LABELS"] = {"label_views": self.plain_labels[page]}

            # save operations
            operations_str = []
            operations, hashable_views = self.operations[page]
            op_id = 0
            for op in operations:
                op_view = hashable_views[op]
                op_type = op_view["class"]
                op_text = ','.join([tview[0]["text"] for tview in operations[op]])
                op_action = None
                if ("select" in op_type.lower()):
                    op_action = "Select"
                elif ("check" in op_type.lower()):
                    op_action = "check"
                elif ("input" in op_type.lower()):
                    op_action = "Input"
                else:
                    op_action = "Click"

                op_str = f"({op_id}) <{op_action}, {op_type}, \"{op_text}\">"
                operations_str.append(op_str)

                overview["OPERATIONS"][op] = {
                    "op_id": op_id,
                    "op_str": op_str,
                    "op_views": op_view,
                    "op_text": [tview[0] for tview in operations[op]]
                }
                op_id += 1

            context_operation = ''
            for context in self.page_context[page]:
                context_view, context_text = context
                if (context_text == '' or not context_text):
                    continue
                else:
                    op_action = None
                    if (not context_view):
                        context_operation = f"<\"{context_text}\">"
                    else:
                        if ("select" in context_view["class"].lower()):
                            op_action = "Select"
                        elif ("check" in context_view["class"].lower()):
                            op_action = "check"
                        elif ("input" in context_view["class"].lower()):
                            op_action = "Input"
                        else:
                            op_action = "Click"
                        context_operation = f"<{op_action}, {context_view['class']}, \"{context_text}\">"

                ctx_str = context_operation
                overview["CONTEXT"] = {"ctx_str": ctx_str, "ctx_view": context_view}
                break
            # save overview to f{page}.json
            import json
            with open(save_dir + f"{page}.json", "w") as f:
                f.write(json.dumps(overview, indent=2))

    def query_LLM_for_configuration_mapping(self, outputdir):
        prompt_template = ''
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        with open(BASE_DIR + "/../prompt/OperationConfigurationMapping.txt") as f:
            prompt_template = f.read()

        for page in self.operations:
            operations_file = outputdir + f"/Operations/{page}.json"
            if (not os.path.exists(operations_file)):
                print(f"[ERR]: missing file {operations_file}")
                break

            # parse the operations file
            with open(operations_file) as f:
                operations = json.loads(f.read())

                operations_str = []
                context_str = ""
                plain_texts_str = []

                if (operations["OPERATIONS"]):
                    for op in operations["OPERATIONS"]:
                        operations_str.append(operations["OPERATIONS"][op]["op_str"])
                if (operations["CONTEXT"]):
                    context_str = operations["CONTEXT"]["ctx_str"]

                if (operations["LABELS"]):
                    for label in operations["LABELS"]["label_views"]:
                        plain_texts_str.append("<p>" + label["text"] + "</p>")

                prompt = prompt_template.replace("{{PAGE}}", page)
                prompt = prompt.replace("{{CONTEXT}}", context_str)
                prompt = prompt.replace("{{LIST}}", '\n'.join(operations_str))
                prompt = prompt.replace("{{TEXT}}", '\n'.join(plain_texts_str))

                print(prompt)
                print(
                    "----------------------------------------------------------------------------------------------------------------------------------------------"
                )
                with open(outputdir + "/ConfigResourceMappingPrompt.txt", "a") as f:
                    f.write("################ Page: " + page + "################\n")
                    f.write(prompt + "\n")



                res = query_config_resource_mapping(prompt)

                with open(outputdir + "/ConfigResourceMappingResponse.txt", "a") as f:
                    f.write("################ Page: " + page + "################\n")
                    f.write(prompt + "\n")
                    f.write(res + "\n")
