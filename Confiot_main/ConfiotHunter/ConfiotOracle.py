import os, sys
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.ConfiotHunter.UIComparator import UIComparator
from Confiot_main.ConfigurationParser.ConfigurationParser import ConfigurationParser
from TestingPhase import Phase


class ConfiotOracle():

    def __init__(self) -> None:
        self.stage = Phase.Initilization
        # {"page-0": (File_dir, UIchanges)}
        self.UIChanges = None
        pass

    def ParseUIChagnes(self, xml_old: str, xml_new: str, output_dir=""):
        comparator = UIComparator(xml_old, xml_new)

        UI_old = xml_old
        UI_new = xml_new
        hierachy_compare_result = output_dir

        # if (not UI_old and UI_new):
        #     # 如果没UI_old is None，代表UI_new为刚刚delegation后的UI


        if (not UI_old or UI_new):
            print("[ERR]: Do not found files:", UI_old, UI_new)
            return None
        if (not os.path.exists(UI_old) or not os.path.exists(UI_new)):
            print("[ERR]: Do not found files:", UI_old, UI_new)
            return None

        comparator.compare_xml_files(UI_old, UI_new, hierachy_compare_result)

        UI_add = comparator.get_UI_add(hierachy_compare_result)
        UI_delete = comparator.get_UI_delete(hierachy_compare_result)

        print(UI_add, UI_delete)

    # Return Type: [Configuration List, "str", ...]
    def ParseCapabilities(self, configurationparser:ConfigurationParser):
        # Load capablities criteria from the file
        # with open("criterias.json") as f:
        #     capab = json.load(f)
        #     pass

        # 解析UI changes为capablities
        Add_capabilities = []
        Delete_capabilities = []

        operation_configuration_mapping = configurationparser.operation_configuration_mapping
        if (self.stage == Phase.AfterDelegation):
            for page in operation_configuration_mapping:
                for caps in operation_configuration_mapping[page]:
                    Add_capabilities.append(caps)

        else:
            for page in self.UIChanges:
                pass




        # 比较criteria 与changed capablities

        pass

    # Return Type: [Data List]
    def ParseData(self):
        pass

    # Report the Confiot Chaoses
    def IdnetifyConfiot(self, criteria_table, capablity_list, data_list):

        # Rules for excessive capablities
        pass

        # Rules for different data
        # Data = {
        #     "Privacy": {},
        #     "User-entitled": {}
        # }

        pass

