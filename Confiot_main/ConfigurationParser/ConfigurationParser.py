import os
from Confiot_main.Confiot import Confiot
from Confiot_main.settings import settings
from Confiot_main.ConfigurationParser.PageExploration import PageExplorer
from Confiot_main.ConfigurationParser.OperationExtraction import OperationExtractor


class ConfigurationParser():

    def __init__(self, Agent: Confiot) -> None:
        self.Agent = Agent
        self.pages = {}
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

        # App Pages
        self.PE = PageExplorer(self.Agent)
        self.app_pages_exploration()
        self.pages = self.PE.pages

        # operations
        self.operations_extraction()

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

    # walk through all pages and store the UI hierachy in UI/
    def device_state_replay(self, outputdir):
        self.Agent.device_connect()
        self.PE.device_page_replay(outputdir)
