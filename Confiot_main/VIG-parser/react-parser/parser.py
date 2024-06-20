import os, sys
import copy

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

sys.path.append(BASE_DIR + "/../../")

from VIG_extraction import ASTParser
from util import *


# 1. 分析所有的plugins中多少存在角色区分
def analyze_sharing_content(Plugin_Output):
    not_empty = []
    if not os.path.isdir(Plugin_Output):
        print("The provided path is not a valid directory.")
        return

    for dirpath, models, filenames in os.walk(Plugin_Output):
        for model in models:
            for _, _, filenames in os.walk(dirpath + "/" + model):
                for file in filenames:
                    if ("js-results" in file):
                        if os.path.getsize(dirpath + "/" + model + "/" + file) != 0:
                            not_empty.append(model)
                            print(model)
                # file_path = os.path.join(dirpath, filename)
                # if is_file_empty(file_path):
                #     empty_files.append(file_path)
                # else:
            #     non_empty_files.append(file_path)

    print(len(not_empty), 100, len(not_empty) / 100)


def is_file_empty(file_path):
    """Check if a file is empty."""
    return os.path.getsize(file_path) == 0


def tidy_ConfigResourceMapper(ConfigResourceMapper):
    results = copy.deepcopy(ConfigResourceMapper)
    for i, m in enumerate(ConfigResourceMapper):
        resources = m["Resources"]
        for j, r in enumerate(resources):
            if (len(r) != 2):
                continue
            operation = r[0]
            results[i]["Resources"][j][1] = r[1].strip()
            if ("edit" in operation.lower()):
                results[i]["Resources"][j][0] = "Edit"
            else:
                results[i]["Resources"][j][0] = "View"

    return results


def analyze_policies(model):
    parser = ASTParser(
        f"/root/documents/droidbot-confiot/Confiot_main/VIG-parser/react-parser/javascript/MihomePlugins/{model}/{model}.js")
    out_dir = f"/root/documents/Output/PLUGINS/{model}/"

    if (not os.path.exists(f'{out_dir}/ConfigResourceMappingResponse.txt')):
        parser.start_parser()

        # parser.get_elements(parser.resources[10007]["node"])
        # 获取所有的pages/screens
        parser.get_Navigator()

        if (not parser.screens or not parser.initialRouteName):
            print("[ERR]: Get Navigator failed")
            sys.exit(1)

        # 获取navigations
        for id in parser.resources:
            nav = parser.get_navigations(id)
            # if (nav):
            #     print(nav)

        # STEP-1: 获取host的UITree
        parser.construct_UITree(out_dir=out_dir, UITree_file="host_UITree")

        parser.device_map_config_resource(model=model, out_dir=out_dir)

        # STEP-2: 获取guest的UITree
        parser.construct_shared_UITree(static_analysis_results_csv=out_dir + "js-results.csv",
                                       out_dir=out_dir,
                                       UITree="guest_UITree")

    # STEP-3: 提取host以及guest的policies
    ConfigResourceMappingResponse = ''
    with open(f'{out_dir}/ConfigResourceMappingResponse.txt', 'r') as f:
        ConfigResourceMappingResponse = f.read()
    ConfigResourceMapper = Plugin_parse_config_resource_mapping(ConfigResourceMappingResponse)
    ConfigResourceMapper = tidy_ConfigResourceMapper(ConfigResourceMapper)

    # [{"ElementsID": (n.name, eid), "Screens": []},]
    action_paths = []
    shared_contents = {"delete_elements": {}, "delete_screens": []}
    delete_action_paths = []

    with open(f'{out_dir}/ActionPaths.txt', 'r') as f:
        action_paths = json.load(f)

    with open(f'{out_dir}/Role_comaparsion.txt', 'r') as f:
        shared_contents = json.load(f)

    for idx, p in enumerate(action_paths):
        element_screen = p["ElementsID"][0]
        eid = p["ElementsID"][1]
        screens = p["Screens"]

        if (not element_screen or not eid):
            continue

        is_shared = False
        if (element_screen in shared_contents["delete_elements"]):
            for de in shared_contents["delete_elements"][element_screen]:
                if (int(de["ID"]) == eid):
                    is_shared = True
                    break

        if (not is_shared):
            for ds in shared_contents["delete_screens"]:
                if (ds in screens):
                    is_shared = True
                    break

        if (is_shared):
            delete_action_paths.append(idx)

    POLICIES = {"Host": {}, "Guest": {}}
    for m in ConfigResourceMapper:
        Resources = m["Resources"]
        for r in Resources:
            operation = r[0]
            resource = r[1]
            if (resource not in POLICIES["Host"]):
                POLICIES["Host"][resource] = operation
            else:
                if (POLICIES["Host"][resource] == "View" and operation == "Edit"):
                    POLICIES["Host"][resource] = operation

        is_shared = False
        for action_path_id in m["Id"]:
            if (action_path_id in delete_action_paths):
                is_shared = True
                break
        if (not is_shared):
            for r in Resources:
                operation = r[0]
                resource = r[1]
                if (resource not in POLICIES["Guest"]):
                    POLICIES["Guest"][resource] = operation
                else:
                    if (POLICIES["Guest"][resource] == "View" and operation == "Edit"):
                        POLICIES["Guest"][resource] = operation

    with open(out_dir + "/Policies.txt", 'w', encoding="UTF-8") as json_file:
        json.dump(POLICIES, json_file)


if __name__ == "__main__":
    # analyze_sharing_content("/root/documents/Output/PLUGINS/")
    model = input("model: ")
    # model = "090615.curtain.1mcu01"
    analyze_policies(model)
