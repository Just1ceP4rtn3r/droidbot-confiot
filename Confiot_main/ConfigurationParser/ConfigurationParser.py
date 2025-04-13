import os, sys
import json
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.Confiot import Confiot
from Confiot_main.settings import settings
from Confiot_main.ConfigurationParser.PageExploration import PageExplorer
from Confiot_main.ConfigurationParser.OperationExtraction import OperationExtractor
from Confiot_main.utils.util import (
    query_config_resource_mapping,
    parse_config_resource_mapping_v2_0,
    get_ConfigResourceMapper_from_file,
    query_config_operation_mapping_with_structured_output,
    filter_configurations,
)


class ConfigurationParser:

    def __init__(self, Agent: Confiot) -> None:
        self.Agent = Agent

        # App Pages
        self.PE = PageExplorer(self.Agent)
        self.app_pages_exploration("000")
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
        # if not os.path.exists(settings.Confiot_output + "/Operations/"):
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
        # self.operation_configuration_mapping = {}
        # self.query_LLM_for_configuration_mapping(settings.Confiot_output + "/LLM_SinglePageQuery")

    def app_pages_exploration(self, configuration):
        self.PE.parse_struture_unique_pages()
        self.PE.extract_navigations()

        if not os.path.exists(
            settings.UIHierarchy_comparation_output + f"/{configuration}/"
        ):
            self.device_state_replay(
                settings.UIHierarchy_comparation_output + f"/{configuration}/"
            )

    def operations_extraction(self):
        page_xmls = {}
        for page in self.pages:
            xml_path = settings.UIHierarchy_comparation_output + "/000/" + f"{page}.xml"
            if os.path.exists(xml_path):
                page_xmls[page] = xml_path

        for page in page_xmls:
            operations, plain_labels, hashable_views = OperationExtractor(
                page_xml_file=page_xmls[page]
            ).extract_operations()
            self.operations[page] = (operations, hashable_views)
            self.plain_labels[page] = plain_labels

    def pagecontext_extraction(self):
        replay_paths = {}
        for page in self.pages:
            steps = self.PE.find_path_to_page(page)
            if page == self.page_navigation_graph.start_node or not steps:
                continue
            replay_paths[page] = steps

        context_operations = {}
        for page in self.pages:
            if page not in replay_paths:
                continue
            xml_path = settings.UIHierarchy_comparation_output + "/000/" + f"{page}.xml"
            if not os.path.exists(xml_path):
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
                if last_page == "000" and view is None:
                    text = "Start Application"
                else:
                    if last_page not in self.operations:
                        operations, hashable_views = [], []
                    else:
                        operations, hashable_views = self.operations[last_page]
                    for hash in hashable_views:
                        exist_view = hashable_views[hash]
                        if (
                            view["resource_id"] == exist_view["resource_id"]
                            and view["bounds"] == exist_view["bounds"]
                            and view["class"] == exist_view["class"]
                            and view["clickable"] == exist_view["clickable"]
                            and view["checkable"] == exist_view["checkable"]
                        ):
                            target_view_hash = hash
                            break

                    if target_view_hash in operations:
                        text = ",".join(
                            [tview[0]["text"] for tview in operations[target_view_hash]]
                        )

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
        if not os.path.exists(save_dir):
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
                op_text = ",".join([tview[0]["text"] for tview in operations[op]])
                op_action = None
                if "select" in op_type.lower():
                    op_action = "Select"
                elif "check" in op_type.lower():
                    op_action = "check"
                elif "input" in op_type.lower():
                    op_action = "Input"
                else:
                    op_action = "Click"

                lowertext = op_text.lower()
                # popup dialog
                if (
                    "cancel" in lowertext
                    or "apply" in lowertext
                    or "yes" in lowertext
                    or "confirm" in lowertext
                    or "ok" == lowertext
                    or "确定" in lowertext
                    or "取消" in lowertext
                ):
                    op_str = f'(operation_{op_id}) <Confirm, Popup dialog, "{op_text}">'
                else:
                    op_str = (
                        f'(operation_{op_id}) <{op_action}, {op_type}, "{op_text}">'
                    )
                operations_str.append(op_str)

                overview["OPERATIONS"][op] = {
                    "op_id": op_id,
                    "op_str": op_str,
                    "op_view": op_view,
                    "op_text": [tview[0] for tview in operations[op]],
                }
                op_id += 1

            context_operation = ""
            if page not in self.page_context:
                continue
            for context in self.page_context[page]:
                context_view, context_text = context
                if context_text == "" or not context_text:
                    continue
                else:
                    op_action = None
                    if not context_view:
                        context_operation = f'<"{context_text}">'
                    else:
                        if "select" in context_view["class"].lower():
                            op_action = "Select"
                        elif "check" in context_view["class"].lower():
                            op_action = "check"
                        elif "input" in context_view["class"].lower():
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

    def query_LLM_for_configuration_mapping_based_on_page_graph(self, outputdir):
        if not os.path.exists(outputdir):
            os.makedirs(outputdir)
        else:
            return

        LeafQuery_template = ""
        FatherQuery_template = ""
        PageInfo_template = ""
        ChildPage_template = ""

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        with open(BASE_DIR + "/../prompt/ConfigParsing_PromptChain/LeafQuery.txt") as f:
            LeafQuery_template = f.read()
        with open(
            BASE_DIR + "/../prompt/ConfigParsing_PromptChain/FatherQuery.txt"
        ) as f:
            FatherQuery_template = f.read()
        with open(BASE_DIR + "/../prompt/ConfigParsing_PromptChain/PageInfo.txt") as f:
            PageInfo_template = f.read()
        with open(BASE_DIR + "/../prompt/ConfigParsing_PromptChain/ChildPage.txt") as f:
            ChildPage_template = f.read()

        page_worklist = {}
        page_infos = {}
        for node in self.page_navigation_graph.nodes:
            page_worklist[node.name] = node.level

        # 根据node.level，从大到小排序
        page_worklist = dict(
            sorted(page_worklist.items(), key=lambda item: item[1], reverse=True)
        )

        leaf_level = page_worklist[list(page_worklist.keys())[0]]

        for page in page_worklist:
            Configurations = []
            if page not in self.operations:
                continue

            children = []
            if page in self.page_navigation_graph.edges_dict:
                for child_page in self.page_navigation_graph.edges_dict[page]:
                    if page_worklist[child_page] == page_worklist[page] + 1:
                        children.append(child_page)

            page_info = ""
            operations_file = settings.Confiot_output + f"/Operations/{page}.json"
            if not os.path.exists(operations_file):
                print(f"[ERR]: missing file {operations_file}")
                continue

            # parse the operations file
            with open(operations_file) as f:
                operations = json.loads(f.read())

                operations_str = []
                context_str = ""
                plain_texts_str = []

                if operations["OPERATIONS"]:
                    for op in operations["OPERATIONS"]:
                        operations_str.append(operations["OPERATIONS"][op]["op_str"])
                if operations["CONTEXT"]:
                    context_str = operations["CONTEXT"]["ctx_str"]

                if operations["LABELS"]:
                    for label in operations["LABELS"]["label_views"]:
                        if "is_title" in label and label["is_title"]:
                            plain_texts_str.append(
                                "<title>" + label["text"] + "</title>"
                            )
                        else:
                            plain_texts_str.append("<p>" + label["text"] + "</p>")

                page_info = PageInfo_template.replace("{{PAGE}}", page)
                page_info = page_info.replace("{{LIST}}", "\n".join(operations_str))
                page_info = page_info.replace("{{TEXT}}", "\n".join(plain_texts_str))

                if not os.path.exists(outputdir + f"/{page}"):
                    os.makedirs(outputdir + f"/{page}")

                with open(outputdir + f"/{page}/PageInfo.txt", "w") as f:
                    f.write(
                        page_info.replace(
                            'The operation lead to this page is: "{{CONTEXT}}"\n', ""
                        )
                        + "\n"
                    )

                page_info = page_info.replace("{{CONTEXT}}", context_str)

                page_infos[page] = {"context": context_str}

            print(page)
            print(
                "----------------------------------------------------------------------------------------------------------------------------------------------"
            )

            system_prompt = ""
            user_prompt = ""
            # prompt = system_prompt + "\n" + user_prompt
            prompt = ""

            # 如果是叶子节点，直接总结
            if page_worklist[page] == leaf_level or len(children) == 0:
                system_prompt = LeafQuery_template
                user_prompt = page_info
                prompt = LeafQuery_template + "\n" + page_info
            # 父节点，一方面总结父节点，另一方面，反省叶子节点是否正确
            else:
                # {
                #     "PageInfo": "",
                #     "Response": "",
                # }
                children_info = {}
                for child_page in children:
                    childpage_info = ""
                    response = ""
                    result = {}

                    if not os.path.exists(outputdir + f"/{child_page}"):
                        continue

                    with open(outputdir + f"/{child_page}/PageInfo.txt", "r") as f:
                        childpage_info = f.read()

                    with open(
                        outputdir + f"/{child_page}/Configurations.json", "r"
                    ) as f:
                        response = f.read()

                    children_info[child_page] = {
                        "PageInfo": childpage_info,
                        "Response": response,
                    }

                system_prompt = FatherQuery_template
                user_prompt = (
                    "# Current Page information\n"
                    + page_info
                    + "\n"
                    + "-" * 60
                    + "\nFrom the current page, here are the pages (child pages) that can be navigated to:\n"
                )
                for child_page in children_info:
                    if child_page not in page_infos:
                        continue

                    if not page_infos[child_page]["context"].strip():
                        user_prompt += (
                            (
                                ChildPage_template.replace(
                                    "{{CONTEXT}}", "<click, A button without text>"
                                )
                                .replace(
                                    "{{PAGEINFO}}",
                                    children_info[child_page]["PageInfo"],
                                )
                                .replace(
                                    "{{RESPONSE}}",
                                    children_info[child_page]["Response"],
                                )
                            )
                            + "\n"
                            + "-" * 60
                            + "\n"
                        )
                    else:
                        user_prompt += (
                            (
                                ChildPage_template.replace(
                                    "{{CONTEXT}}", page_infos[child_page]["context"]
                                )
                                .replace(
                                    "{{PAGEINFO}}",
                                    children_info[child_page]["PageInfo"],
                                )
                                .replace(
                                    "{{RESPONSE}}",
                                    children_info[child_page]["Response"],
                                )
                            )
                            + "\n"
                            + "-" * 60
                            + "\n"
                        )

            prompt = system_prompt + "\n" + user_prompt
            Configurations = query_config_operation_mapping_with_structured_output(
                system_prompt=system_prompt, user_prompt=user_prompt
            )

            with open(outputdir + f"/{page}/Raw.txt", "w") as f:
                f.write("################ Page: " + page + "################\n")
                f.write(prompt + "\n")
                f.write("################ Response: " + page + "################\n")
                f.write(str(Configurations) + "\n")

            with open(outputdir + f"/{page}/Configurations.json", "w") as f:
                f.write(json.dumps(Configurations))

    # [TODO]: 添加对于LLM configuration种Dependency的解析
    def save_configurations(self, LLMResult_dir):

        if not os.path.exists(LLMResult_dir):
            print(
                "[ERR]: run query_LLM_for_configuration_mapping_based_on_page_graph first"
            )
            return

        configurations = {}

        page_worklist = {}
        for node in self.page_navigation_graph.nodes:
            page_worklist[node.name] = node.level

        # 根据node.level，从小到大排序
        page_worklist = dict(
            sorted(page_worklist.items(), key=lambda item: item[1], reverse=False)
        )

        completed_pages = set()
        for page in page_worklist:
            if not os.path.exists(LLMResult_dir + f"/{page}/Configurations.json"):
                continue
            # if page in completed_pages:
            #     continue
            with open(LLMResult_dir + f"/{page}/Configurations.json") as f:
                tasks = json.load(f)
                # 可能包含来自child pages的tasks
                for t in tasks:
                    try:
                        page_id = t["Page ID"]
                        task_content = t["Tasks"]
                        related_operations = []

                        page_id = "Page-" + "".join(re.findall(r"\d", page_id))

                        for o in t["Related operations"]:
                            digits = re.findall(r"\d", o)
                            related_operations.append(int("".join(digits)))
                        if page_id not in configurations:
                            configurations[page_id] = {}

                        if (
                            task_content == "None"
                            or task_content == ""
                            or not task_content
                            or not related_operations
                        ):
                            continue
                        configurations[page_id][task_content] = related_operations
                        # completed_pages.add(page_id)
                    except:
                        print(
                            "[ERR]: wrong structure of the configuration file ",
                            LLMResult_dir + f"{page}/Configurations.json",
                        )
                        continue

        config_json = []

        for page in configurations:
            for task_content in configurations[page]:
                config_json.append(
                    {
                        "Id": len(config_json),
                        "Page ID": page,
                        "Tasks": task_content,
                        "Related operations": configurations[page][task_content],
                    }
                )

        # config_json = filter_configurations(config_json)

        from pydantic import BaseModel
        from openai import OpenAI

        class ConfigurationFormat(BaseModel):
            task_id: int
            page_id: str
            task_content: str
            related_operations: list[int]

        class response(BaseModel):
            configuration_tasks: list[ConfigurationFormat]

        client = OpenAI()
        completion = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Below are some JSON-formatted testing tasks for an IoT app. You have following requirements: (1) Please deduplicate the tasks in the same page based on their semantics. If two tasks perform the same operation (or configure the same resource) and only differ in their configuration options (e.g., pair with/add device_a'' and add device_b'' is the same task), keep only one and try to retain the one with richer and more complete details like options (e.g., keep 'configure the light state to off' instead of 'light management'). (2) Then, remove tasks that only involve read semantic (not write to any resource): ['view', 'access', 'retrieve', 'obtain', 'read', 'inspect']."},
                # {"role": "system", "content": "Below are some JSON-formatted testing tasks for an IoT app. You have following requirements: (1) Please deduplicate the tasks in the same page based on their semantics. If two tasks perform the same operation (or configure the same resource) and only differ in their configuration options (e.g., pair with/add device_a'' and add device_b'' is the same task), keep only one and try to retain the one with richer and more complete details like options (e.g., keep 'configure the light state to off' instead of 'light management'). (2) Prioritize tasks with more specific details or options by ranking them first in the response. (3) Then, remove tasks that only involve read semantic (not write to any resource): ['view', 'access', 'retrieve', 'obtain', 'read', 'inspect']."},
                {
                    "role": "user",
                    "content": json.dumps(config_json),
                },
            ],
            response_format=response,
        )

        event = completion.choices[0].message.parsed
        Configurations = []

        for r in event.configuration_tasks:
            task =  {
                        "Id": len(Configurations),
                        "Page ID": r.page_id,
                        "Tasks": r.task_content,
                        "Related operations": r.related_operations,
                    }
            Configurations.append(task)


        # Configurations = sorted(Configurations, key=lambda x: len(x["Tasks"]), reverse=True)

        with open(LLMResult_dir + "/ConfigurationsComplete.json", "w") as f:
            f.write(json.dumps(config_json))

        with open(LLMResult_dir + "/ConfigurationsSummary.json", "w") as f:
            f.write(json.dumps(Configurations))

    # decrpted
    # def query_LLM_for_configuration_mapping(self, outputdir):
    #     if not os.path.exists(outputdir):
    #         os.makedirs(outputdir)
    #     Configurations = []

    #     prompt_template = ""
    #     BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    #     with open(BASE_DIR + "/../prompt/OperationConfigurationMapping.txt") as f:
    #         prompt_template = f.read()

    #     for page in self.operations:
    #         operations_file = settings.Confiot_output + f"/Operations/{page}.json"
    #         if not os.path.exists(operations_file):
    #             print(f"[ERR]: missing file {operations_file}")
    #             break

    #         # parse the operations file
    #         with open(operations_file) as f:
    #             operations = json.loads(f.read())

    #             operations_str = []
    #             context_str = ""
    #             plain_texts_str = []

    #             if operations["OPERATIONS"]:
    #                 for op in operations["OPERATIONS"]:
    #                     operations_str.append(operations["OPERATIONS"][op]["op_str"])
    #             if operations["CONTEXT"]:
    #                 context_str = operations["CONTEXT"]["ctx_str"]

    #             if operations["LABELS"]:
    #                 for label in operations["LABELS"]["label_views"]:
    #                     plain_texts_str.append("<p>" + label["text"] + "</p>")

    #             prompt = prompt_template.replace("{{PAGE}}", page)
    #             prompt = prompt.replace("{{CONTEXT}}", context_str)
    #             prompt = prompt.replace("{{LIST}}", "\n".join(operations_str))
    #             prompt = prompt.replace("{{TEXT}}", "\n".join(plain_texts_str))

    #             print(page)
    #             print(
    #                 "----------------------------------------------------------------------------------------------------------------------------------------------"
    #             )
    #             with open(outputdir + "/ConfigResourceMappingPrompt.txt", "a") as f:
    #                 f.write("################ Page: " + page + "################\n")
    #                 f.write(prompt + "\n")

    #             res = query_config_resource_mapping(prompt)

    #             with open(outputdir + "/ConfigResourceMappingResponse.txt", "a") as f:
    #                 f.write("################ Page: " + page + "################\n")
    #                 f.write(prompt + "\n")
    #                 f.write(res + "\n")

    #             mapper = parse_config_resource_mapping_v2_0(res)
    #             for idx, value in enumerate(mapper):
    #                 mapper[idx]["Page"] = page
    #                 mapper[idx]["Id"] = len(Configurations)
    #                 Configurations.append(mapper[idx])

    #     with open(outputdir + "/ConfigResourceMapping.txt", "w") as f:
    #         f.write(json.dumps(Configurations))
