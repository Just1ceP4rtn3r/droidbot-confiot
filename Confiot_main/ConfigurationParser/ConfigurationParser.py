from Confiot_main.Confiot import Confiot
from Confiot_main.ConfigurationParser.PageExploration import PageExplorer
from Confiot_main.ConfigurationParser.OperationExtraction import OperationExtractor


class ConfigurationParser():

    def __init__(self, Agent: Confiot) -> None:
        self.Agent = Agent

        # App Pages
        self.pages = None
        self.page_navigation = None

        # operations

    def app_pages_exploration(self):
        PE = PageExplorer(self.Agent)

        PE.parse_struture_unique_pages()
        PE.extract_navigations()
        self.pages = PE.pages
        self.page_navigation = PE.page_navigation

    def operations_extraction(self):
        pass

    # walk through all pages and store the UI hierachy in UI/
    def device_state_replay(self):
        #         STEP1 = '''
        # ###################################
        # ### Traverse static UI states #####
        # ###################################
        # '''
        #         print(STEP1)





        # 过滤与realted_resources无关的state replay
        # related_states = set()
        # for m in self.ConfigResourceMapper:
        #     flag = False
        #     if (related_resources is None or related_resources == []):
        #         flag = True
        #     else:
        #         for r in related_resources:
        #             if (r in m['Resources']):
        #                 flag = True
        #                 break
        #     if (flag):
        #         related_states.add(m['state'])

        # for s in related_states:
        #     finished = self.device_to_state(host_analyzing_config, s)
        #     if (finished):
        #         self.device_get_UIElement(host_analyzing_config, s)

        # print(DONE)
