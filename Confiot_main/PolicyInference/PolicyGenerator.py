import os, sys
import re
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../")

from Confiot_main.settings import settings
from Confiot_main.utils.util import deprecated, progress
from Confiot_main.PolicyInference.UIComparator import UIComparator
from Confiot_main.Confiot import ConfiotGuest, ConfiotHost, Confiot


class PolicyGenerator:

    # 通过分析STEP1:device_state_replay的输出结果，生成policy
    def Policy_generate_1(self,
                          host_analyzing_config_before,
                          host_analyzing_config_after,
                          state_str,
                          ConfigResourceMapper,
                          resource_changed=False):
        add_related_resources = set()
        remove_related_resources = set()
        potential_policies = []

        comparator = UIComparator(host_analyzing_config_before, host_analyzing_config_after)
        desc = []
        policy_change = []

        UI_old = comparator.old_hierarchy_path + f"/{state_str}.xml"
        UI_new = comparator.new_hierarchy_path + f"/{state_str}.xml"
        hierachy_compare_result = comparator.compare_output_path + f"/{state_str}.html"

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
                        for r in cr["Resources"]:
                            if (node in UI_add):
                                add_related_resources.add(r)
                            else:
                                remove_related_resources.add(r)

                    if (content != '' and content in cr["Path"][-1].replace("\n", '').replace(' ', '').replace('\t', '')):
                        for r in cr["Resources"]:
                            if (node in UI_add):
                                add_related_resources.add(r)
                            else:
                                remove_related_resources.add(r)

        # print(add_related_resources)

        if desc == []:
            return {
                "Add": list(add_related_resources),
                "Delete": list(remove_related_resources),
                "Conf_name": desc,
                "Change": "Change views without text or content_description."
            }
        else:
            return {
                "Add": list(add_related_resources),
                "Delete": list(remove_related_resources),
                "Conf_name": desc[0],
                "Change": policy_change
            }

        # 如果相关的host的配置会导致资源增多或减少，但是客人没有看到改变，则生成一条客人无法看见的policy
        if (resource_changed and len(add_related_resources) == 0):
            pass

    # def Policy_generate_2(self,
    #                       host_analyzing_config_before,
    #                       host_analyzing_config_after,
    #                       state_str,
    #                       ConfigResourceMapper,
    #                       resource_changed=False):


# Infer Policy through UI Hierarchy comparison
def InferPolicyWithUIHierarchy(HostActor: ConfiotHost, GuestActor: ConfiotGuest, target_state=None):
    STEP1 = '''
##########################################
Infer Policy through UI Hierarchy comparison
##########################################
'''
    print(STEP1)

    if (os.path.exists(settings.UIHierarchy_comparation_output + "/UIHierarchyChanges.txt")):
        return

    policy_generator = PolicyGenerator()
    host_tasks = ["000"]

    for task in HostActor.FilteredConfigResourceMapper:
        for t in task["Tasks"]:
            cleaned_sentence = re.sub(r'[^a-zA-Z0-9 ]', '', t)
            task_name = '_'.join(cleaned_sentence.split())
            host_analyzing_config = str(task["Id"]) + "_" + task_name
            host_analyzing_config = host_analyzing_config[:50]
            host_tasks.append(host_analyzing_config)

    UIHierarchyChanges = {}
    for n in range(len(GuestActor.utg_graph.nodes)):
        node = GuestActor.utg_graph.nodes[n]
        state_str = node.name
        UIHierarchyChanges[state_str] = []
        before_config = None
        after_config = None
        if (target_state and state_str != target_state):
            continue
        for host_analyzing_config in host_tasks:
            host_analyzing_config = host_analyzing_config[:50]
            if (not before_config):
                before_config = host_analyzing_config
            else:
                after_config = host_analyzing_config
                resource_changes = policy_generator.Policy_generate_1(before_config, after_config, state_str,
                                                                      GuestActor.ConfigResourceMapper)

                resource_changes["host_analyzing_config"] = f"{before_config}_to_{after_config}"
                UIHierarchyChanges[state_str].append(resource_changes)

                s = json.dumps(resource_changes)
                with open(settings.UIHierarchy_comparation_output + f"/{before_config}_to_{after_config}/{state_str}.txt",
                          'w') as f:
                    f.write(s)
                before_config = after_config

        progress(100 * (n + 1) / len(GuestActor.utg_graph.nodes))

    UIHierarchyChanges_json = json.dumps(UIHierarchyChanges)

    with open(settings.UIHierarchy_comparation_output + "/UIHierarchyChanges.txt", 'w') as f:
        f.write(UIHierarchyChanges_json)


# Infer Policy with the feasibility of the configurations
def InferPolicyWithFeasibility(HostActor: ConfiotHost, GuestActor: ConfiotGuest, target_state=None):
    STEP2 = '''
##########################################
Infer Policy with the feasibility of the configurations
##########################################
'''
    print(STEP2)
    if (os.path.exists(settings.Feasibility_comparation_output + "/Feasibilities.txt")):
        return

    host_tasks = ["000"]

    for task in HostActor.FilteredConfigResourceMapper:
        for t in task["Tasks"]:
            cleaned_sentence = re.sub(r'[^a-zA-Z0-9 ]', '', t)
            task_name = '_'.join(cleaned_sentence.split())
            host_analyzing_config = str(task["Id"]) + "_" + task_name
            host_analyzing_config = host_analyzing_config[:50]
            host_tasks.append(host_analyzing_config)

    Feasibilities = {}
    totalconfs = len(GuestActor.conf_list) * len(host_tasks)
    count = 0
    for host_analyzing_config in host_tasks:
        # 分析每个guest的config
        Feasibilities[host_analyzing_config] = {}
        for conf in GuestActor.conf_list:
            config_view_name = conf["view_images"] + str(conf["event_id"])
            xml_dir = settings.UI_output + f"/{host_analyzing_config}/guest:" + config_view_name

            if (os.path.exists(xml_dir + "/before.xml") and os.path.exists(xml_dir + "/after.xml")):
                feasible = UIComparator.compare_xml_files_with_bounds(xml_dir + "/before.xml", xml_dir + "/after.xml",
                                                                      str(conf['bounds']))
                if (feasible):
                    Feasibilities[host_analyzing_config][config_view_name] = feasible
            else:
                print("[ERR]: Do not found files:", xml_dir)
                continue
            count += 1
            progress(100 * count / totalconfs)

    Feasibilities_json = json.dumps(Feasibilities)

    with open(settings.Feasibility_comparation_output + "/Feasibilities.txt", 'w') as f:
        f.write(Feasibilities_json)
