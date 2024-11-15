import os, sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.ConfiotHunter.UIComparator import UIComparator
from TestingPhase import Phase


class ConfiotOracle():

    def __init__(self) -> None:
        self.stage = Phase.Initilization
        self.UIChanges = None
        pass

    def ParseUIChagnes(self, xml_old: str, xml_new: str, output_dir=""):
        comparator = UIComparator(xml_old, xml_new)

        UI_old = xml_old
        UI_new = xml_new
        hierachy_compare_result = output_dir

        if (not os.path.exists(UI_old) or not os.path.exists(UI_new)):
            print("[ERR]: Do not found files:", UI_old, UI_new)
            return {}

        comparator.compare_xml_files(UI_old, UI_new, hierachy_compare_result)

        UI_add = comparator.get_UI_add(hierachy_compare_result)
        UI_delete = comparator.get_UI_delete(hierachy_compare_result)

        print(UI_add, UI_delete)

    # Return Type: [Configuration List, "str", ...]
    def ParseCapabilities(self):
        # Load capablities criteria from the file
        with open("criterias.json") as f:
            capab = json.load(f)
            pass

        # 解析UI changes为capablities
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
