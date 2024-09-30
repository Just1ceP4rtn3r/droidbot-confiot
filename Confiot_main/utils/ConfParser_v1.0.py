import os, sys
import re
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) + "/"
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.Confiot import ConfiotGuest, ConfiotHost, Confiot
from Confiot_main.utils.util import get_ConfigResourceMapper_from_file, progress
from Confiot_main.PolicyInference.UIComparator import UIComparator
from Confiot_main.settings import settings


# 得到action path 与configuration的对应关系
# 1. 获取GPT输出的基础结果
# 2. TODO：合并相似的task
def parse_configuration_list(confiot,Confiot_output):

    configuration_actionpath_mapping = {}
    if (not os.path.exists(Confiot_output + "/ConfigResourceMapping.txt")):
        pass
    else:
        confiot.ConfigResourceMapper = get_ConfigResourceMapper_from_file(
            Confiot_output + "/ConfigResourceMapping.txt", Confiot_output)

    if (os.path.exists(Confiot_output + "/FilteredConfigResourceMapping.txt")):
        confiot.FilteredConfigResourceMapper = get_ConfigResourceMapper_from_file(Confiot_output +
                                                                                  "/FilteredConfigResourceMapping.txt")
    else:
        print("[ERR]: can not find file:", Confiot_output + "/FilteredConfigResourceMapping.txt")

        # print(ConfigResourceMapper)
    for i in confiot.ConfigResourceMapper:
        for task in i["Tasks"]:
            if (task not in configuration_actionpath_mapping):
                configuration_actionpath_mapping[task] = []
            configuration_actionpath_mapping[task].append(i["Id"])

    return configuration_actionpath_mapping




def UIChanges_to_configuration(
                          host_analyzing_config_before,
                          host_analyzing_config_after,
                          state_str,
                          ConfigResourceMapper):
    add_related_Tasks = set()
    remove_related_Tasks = set()
    potential_policies = []

    comparator = UIComparator(host_analyzing_config_before, host_analyzing_config_after)
    desc = []
    policy_change = []

    UI_old = comparator.old_hierarchy_path + f"/{state_str}.xml"
    UI_new = comparator.new_hierarchy_path + f"/{state_str}.xml"
    hierachy_compare_result = comparator.compare_output_path + f"/{state_str[:5]}.html"

    if (not os.path.exists(UI_old) or not os.path.exists(UI_new)):
        print("[ERR]: Do not found files:", UI_old, UI_new)
        return {}

    comparator.compare_xml_files(UI_old, UI_new, hierachy_compare_result)

    UI_add = comparator.get_UI_add(hierachy_compare_result)
    UI_delete = comparator.get_UI_delete(hierachy_compare_result)

    # print(UI_add, UI_delete)

    if (len(UI_add) > len(UI_delete)):
        policy_change.append("Add")
    else:
        policy_change.append("Delete")

    change_nodes_count = 0
    for n in UI_add:
        if ("<Node>" in n["element"]):
            change_nodes_count += 1
    for n in UI_delete:
        if ("<Node>" in n["element"]):
            change_nodes_count += 1

    # 未进入同一个state
    if (change_nodes_count > 10):
        return {}

    for node in UI_add + UI_delete:
        text = re.findall("<text>(.*?)</text>", node["element"])
        if (text):
            text = text[0].replace("\n", '').replace(' ', '').replace('\t', '').replace("None", '')
        else:
            text = ""
        content = re.findall("<content_description>(.*?)</content_description>", node["element"])
        if (content):
            content = content[0].replace("\n", '').replace(' ', '').replace('\t', '').replace("None", '')
        else:
            content = ""

        if (text == '' and content == ''):
            continue

        desc = text + content
        desc = re.findall("[a-zA-Z]+", desc)
        # 希望是完整的单词
        if (len(desc) > 0 and len(desc[0]) > 2):
            print(desc)
            for cr in ConfigResourceMapper:
                if (state_str != cr["state"]):
                    continue

                if (text != '' and text in cr["Path"][-1].replace("\n", '').replace(' ', '').replace('\t', '')):
                    for r in cr["Tasks"]:
                        if (node in UI_add):
                            add_related_Tasks.add(r)
                        else:
                            remove_related_Tasks.add(r)

                if (content != '' and content in cr["Path"][-1].replace("\n", '').replace(' ', '').replace('\t', '')):
                    for r in cr["Tasks"]:
                        if (node in UI_add):
                            add_related_Tasks.add(r)
                        else:
                            remove_related_Tasks.add(r)

    # print(add_related_Tasks)


    if desc == []:
        return {}
        # return {
        #     "Add": list(add_related_Tasks),
        #     "Delete": list(remove_related_Tasks),
        #     "Conf_name": desc,
        #     "Change": "Change views without text or content_description."
        # }
    else:
        return {
            "Add": list(add_related_Tasks),
            "Delete": list(remove_related_Tasks),
            "Conf_name": desc[0],
            "Change": policy_change
        }


s = settings("", "", "/root/ConfiotOutput/output/Huawei_AI_Life/guest/result")

HostConfiot = ConfiotGuest()
GuestConfiot = ConfiotGuest()
host_tasks = []

Host_configuration_actionpath_mapping = parse_configuration_list(HostConfiot, "/root/ConfiotOutput/output/Huawei_AI_Life/host/result/Confiot")
Guest_configuration_actionpath_mapping = parse_configuration_list(GuestConfiot, "/root/ConfiotOutput/output/Huawei_AI_Life/guest/result/Confiot")

for task in HostConfiot.FilteredConfigResourceMapper:
    for t in task["Tasks"]:
        cleaned_sentence = re.sub(r'[^a-zA-Z0-9 ]', '', t)
        task_name = '_'.join(cleaned_sentence.split())
        host_analyzing_config = str(task["Id"]) + "_" + task_name
        host_analyzing_config = host_analyzing_config[:50]
        host_tasks.append(host_analyzing_config)

UIHierarchyChanges = {}
for n in range(len(GuestConfiot.utg_graph.nodes)):
    node = GuestConfiot.utg_graph.nodes[n]
    state_str = node.name
    UIHierarchyChanges[state_str] = []
    before_config = None
    after_config = None

    for host_analyzing_config in host_tasks:
        host_analyzing_config = host_analyzing_config[:50]
        if (not before_config):
            before_config = host_analyzing_config
        else:
            after_config = host_analyzing_config
            resource_changes = UIChanges_to_configuration(before_config, after_config, state_str,
                                                                    GuestConfiot.ConfigResourceMapper)

            if (not resource_changes):
                before_config = after_config
                continue
            resource_changes["host_analyzing_config"] = f"{before_config}_to_{after_config}"
            UIHierarchyChanges[state_str].append(resource_changes)

            # s = json.dumps(resource_changes)
            # with open(UIHierarchy_comparation_output + f"/{before_config}_to_{after_config}/{state_str}.txt",
            #             'w') as f:
            #     f.write(s)
            before_config = after_config

    progress(100 * (n + 1) / len(GuestConfiot.utg_graph.nodes))

UIHierarchyChanges_json = json.dumps(UIHierarchyChanges)

with open(settings.UIHierarchy_comparation_output + "/ConfigurationChanges.txt", 'w') as f:
    f.write(UIHierarchyChanges_json)

