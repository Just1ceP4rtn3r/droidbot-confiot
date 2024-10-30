import os, sys

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
        self.operations_extraction()

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
            operations, hashable_views = OperationExtractor(page_xml_file=page_xmls[page]).extract_operations()
            self.operations[page] = (operations, hashable_views)
            # print(operations)

    def pagecontext_extraction(self):
        pass

    # walk through all pages and store the UI hierachy in UI/
    def device_state_replay(self, outputdir):
        self.Agent.device_connect()
        self.PE.device_page_replay(outputdir)

    def query_LLM_for_configuration_mapping(self, outputdir):

        prompt_template = ''
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        with open(BASE_DIR + "/../prompt/OperationConfigurationMapping.txt") as f:
            prompt_template = f.read()

        for page in self.operations:
            operations_str = []
            operations, hashable_views = self.operations[page]
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

                op_str = f"<{op_action}, {op_type}, \"{op_text}\">"
                operations_str.append(op_str)

            prompt = prompt_template.replace("{{LIST}}", '\n'.join(operations_str))

            print(prompt)
            print(
                "----------------------------------------------------------------------------------------------------------------------------------------------"
            )
            # os.environ["https_proxy"] = "http://192.168.72.1:1083"
            res = query_config_resource_mapping(prompt)

            with open(outputdir + "/ConfigResourceMappingResponse.txt", "a") as f:
                f.write(prompt + "\n")
                f.write(res + "\n")
