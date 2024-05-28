from optparse import OptionParser
import os
import sys
import re
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) + "/"
sys.path.append(BASE_DIR + "/../")

from Confiot_main.Confiot import ConfiotGuest, ConfiotHost, Confiot
from Confiot_main.settings import settings
from Confiot_main.util import get_ConfigResourceMapper_from_file, progress
from Confiot_main.PolicyGenerator import PolicyGenerator
from Confiot_main.UIComparator import UIComparator


def HostInitialization(path=''):
    confiot = ConfiotHost()
    full_mapping_path = ''
    filtered_mapping_path = ''

    if (path != ''):
        full_mapping_path = path + "/ConfigResourceMapping.txt"
        filtered_mapping_path = path + "/FilteredConfigResourceMapping.txt"
    else:
        full_mapping_path = settings.Confiot_output + "/ConfigResourceMapping.txt"
        filtered_mapping_path = settings.Confiot_output + "/FilteredConfigResourceMapping.txt"

    # 请求GPT
    if (not os.path.exists(full_mapping_path)):
        confiot.ConfigResourceMapper = confiot.device_map_config_resource(settings.Confiot_output)
    else:
        confiot.ConfigResourceMapper = get_ConfigResourceMapper_from_file(full_mapping_path, settings.Confiot_output)

    if (os.path.exists(filtered_mapping_path)):
        confiot.FilteredConfigResourceMapper = get_ConfigResourceMapper_from_file(filtered_mapping_path)
    else:
        print("[ERR]: can not find file:", filtered_mapping_path)

    # print(confiot.FilteredConfigResourceMapper)
    return confiot


def GuestInitialization():
    confiot = ConfiotGuest()

    if (not os.path.exists(settings.Confiot_output + "/ConfigResourceMapping.txt")):
        confiot.ConfigResourceMapper = confiot.device_map_config_resource(settings.Confiot_output)
    else:
        confiot.ConfigResourceMapper = get_ConfigResourceMapper_from_file(
            settings.Confiot_output + "/ConfigResourceMapping.txt", settings.Confiot_output)

    if (os.path.exists(settings.Confiot_output + "/FilteredConfigResourceMapping.txt")):
        confiot.FilteredConfigResourceMapper = get_ConfigResourceMapper_from_file(settings.Confiot_output +
                                                                                  "/FilteredConfigResourceMapping.txt")
    else:
        print("[ERR]: can not find file:", settings.Confiot_output + "/FilteredConfigResourceMapping.txt")
    return confiot


def HostRunTask(task, task_state):
    from AutoDroid.droidbot import input_manager
    from AutoDroid.droidbot import input_policy
    from AutoDroid.droidbot import env_manager
    from AutoDroid.droidbot.droidbot import DroidBot
    from AutoDroid.droidbot.droidmaster import DroidMaster

    droidbot = DroidBot(app_path=settings.app_path,
                        device_serial=settings.device_serial,
                        task=task,
                        is_emulator=True,
                        output_dir=settings.droid_output + "/Autodroid/",
                        env_policy=env_manager.POLICY_NONE,
                        policy_name=input_manager.POLICY_TASK,
                        script_path=None,
                        event_interval=2,
                        timeout=input_manager.DEFAULT_TIMEOUT,
                        event_count=input_manager.DEFAULT_EVENT_COUNT,
                        debug_mode=False,
                        keep_app=True,
                        keep_env=True,
                        grant_perm=True,
                        enable_accessibility_hard=True,
                        ignore_ad=True,
                        state=task_state)
    droidbot.start()


# point用于断点继续开始, replay_point:state_str, walker_point:view_2fb7d047fc22be5efccfd0fa9c96be7b.jpg121
def GuestRunAnalysis(host_analyzing_config="", related_resources=None):
    actor = GuestInitialization()
    actor.device_connect()

    actor.device_state_replay(host_analyzing_config, related_resources)
    actor.device_guest_config_walker(host_analyzing_config, related_resources)
    actor.device.disconnect()


def HostAction(hosttasks, task_point=''):
    # 主人开始task list中的任务
    tasks = hosttasks

    for task in tasks:
        for t in task["Tasks"]:
            if (task_point == '' or str(task["Id"]) == task_point):
                # 主人进行task t
                HostRunTask(t, task["state"])
                break
            else:
                continue


def GuestAction(hosttasks, task_point=''):
    # 主人开始task list中的任务
    tasks = hosttasks

    if (task_point == ''):
        # 对于每条path代表的所有task进行前，完成一遍GuestRunAnalysis
        host_analyzing_config = "000"
        GuestRunAnalysis(host_analyzing_config)

    begin_flag = False

    if (task_point == ''):
        begin_flag = True

    for task in tasks:
        if (task_point != '' and not begin_flag):
            if (str(task["Id"]) == task_point):
                begin_flag = True
            else:
                continue
        if (begin_flag):
            for t in task["Tasks"]:
                cleaned_sentence = re.sub(r'[^a-zA-Z0-9 ]', '', t)
                task_name = '_'.join(cleaned_sentence.split())
                host_analyzing_config = str(task["Id"]) + "_" + task_name
                host_analyzing_config = host_analyzing_config[:50]

                # 主人进行task t
                # HostRunTask(host, t)
                input()
                # 客人进行app分析
                GuestRunAnalysis(host_analyzing_config, task["Resources"])


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


#Infer Policy with the feasibility of the configurations
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


if __name__ == "__main__":

    # test
    # s = settings("192.168.31.121:5555", "/root/documents/Output/Huawei_AI_Life/Huawei.apk",
    #              "/root/documents/Output/Huawei_AI_Life/guest/result")
    # GuestActor = GuestInitialization()
    # HostActor = HostInitialization(path="/root/documents/Output/Huawei_AI_Life/guest/result" + "/../../host/result/Confiot")
    # InferPolicyWithFeasibility(HostActor, GuestActor, "503c186b9a0ec74f8067fcd50b431b40b3f55c38354bec8a34a7f208136985d6")

    # s = settings("14131FDF600073", "/root/documents/Output/Huawei_AI_Life/Huawei.apk",
    #              "/root/documents/Output/Huawei_AI_Life/host/result")
    # # HostActor = HostInitialization()
    # HostAction(None, "2. Remove an alarm", "015ba3ec79e0b0f55a19ce31bbc72b503e56184e14e0cef46ad942d8d357f489")

    parser = OptionParser()
    parser.add_option("-a", "--app-path", dest="app_path", help="The apk path of the target application")
    parser.add_option("-d", "--device", dest="device", help="The device serial")
    parser.add_option("-D", "--droidbot-output", dest="droid_output", help="The output path of droidbot")
    parser.add_option("-H", "--host", dest="host", action="store_true", default=False, help="Host")
    parser.add_option("-G", "--guest", dest="guest", action="store_true", default=False, help="Guest")
    parser.add_option("-b", "--director", dest="director", action="store_true", default=False, help="Director Mode")
    parser.add_option("-c",
                      "--configuration",
                      dest="config",
                      action="store_true",
                      default=False,
                      help="Genereate configurations")
    parser.add_option("-P", "--policygeneration", dest="policy", action="store_true", default=False, help="Policy generation")
    parser.add_option("--proxy", dest="proxy", help="HTTPS Proxy")
    parser.add_option("--task-point", dest="task_point", help="Configuration File")
    (options, args) = parser.parse_args()

    s = settings(options.device, options.app_path, options.droid_output)

    HostActor = None
    GuestActor = None

    task_point = ''
    if (options.task_point):
        task_point = str(options.task_point)
    if (options.proxy):
        os.environ["https_proxy"] = options.proxy

    if (options.config):
        GuestInitialization()
    elif (options.host):
        HostActor = HostInitialization()
        HostAction(HostActor.FilteredConfigResourceMapper, task_point)
    elif (options.guest and not options.policy):
        GuestActor = GuestInitialization()
        HostConfiotPath = options.droid_output + "/../../host/result/Confiot" if (
            "guest" in options.droid_output) else options.droid_output + "/../../guest/result/Confiot"
        # print(HostConfiotPath)
        HostActor = HostInitialization(path=HostConfiotPath)
        GuestAction(HostActor.FilteredConfigResourceMapper, task_point=task_point)
    elif (options.guest and options.policy):
        GuestActor = GuestInitialization()
        HostConfiotPath = options.droid_output + "/../../host/result/Confiot" if "guest" in options.droid_output else options.droid_output + "/../../guest/result/Confiot"
        HostActor = HostInitialization(path=HostConfiotPath)
        InferPolicyWithUIHierarchy(HostActor, GuestActor)
        InferPolicyWithFeasibility(HostActor, GuestActor)
