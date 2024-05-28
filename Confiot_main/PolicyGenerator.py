import os, sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../")

from Confiot_main.settings import settings
from Confiot_main.util import deprecated
from Confiot_main.UIComparator import UIComparator

import re


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
