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

<<<<<<< Updated upstream
    with open(settings.Feasibility_comparation_output + "/Feasibilities.txt", 'w') as f:
        f.write(Feasibilities_json)
=======

def run_Appcrawler(task, steplimit=100):
    from Confiot_main.globalvars import GlobalVars

    from Appcrawler.droidbot import input_manager
    from Appcrawler.droidbot import env_manager
    from Appcrawler.droidbot.droidbot import DroidBot as AutoDroid
    from Appcrawler.droidbot.input_event import KeyEvent, IntentEvent
    import time

    droidbot = AutoDroid(
        app_path=settings.app_path,
        device_serial=settings.device_serial,
        task=task,
        is_emulator=True,
        output_dir=settings.droid_output,
        env_policy=env_manager.POLICY_NONE,
        policy_name=input_manager.POLICY_AutodroidCrawlerPolicy,
        script_path=None,
        event_interval=1,
        timeout=1200,
        event_count=steplimit,
        debug_mode=False,
        keep_app=True,
        keep_env=True,
        grant_perm=True,
        enable_accessibility_hard=True,
        ignore_ad=True,
    )

    # droidbot = AutoDroid(
    #     app_path=settings.app_path,
    #     device_serial=settings.device_serial,
    #     task=task,
    #     is_emulator=True,
    #     output_dir=settings.droid_output,
    #     env_policy=env_manager.POLICY_NONE,
    #     policy_name=input_manager.POLICY_TASK,
    #     script_path=None,
    #     event_interval=1,
    #     timeout=1200,
    #     event_count=3000,
    #     debug_mode=False,
    #     keep_app=True,
    #     keep_env=True,
    #     grant_perm=True,
    #     enable_accessibility_hard=True,
    #     ignore_ad=True,
    # )

    GlobalVars.step_outputfile = settings.droid_output + "/tmp.json"

    droidbot.device.connect()
    event = IntentEvent(droidbot.app.get_stop_intent())

    event.send(droidbot.device)

    time.sleep(1)
    event = IntentEvent(droidbot.app.get_start_intent())
    event.send(droidbot.device)
    time.sleep(3)

    droidbot.start()


def main():
    """
    Main function to parse command line arguments.
    """
    # Define usage message for the script
    usage = "usage: %prog [options]"
    # Create an OptionParser object
    parser = optparse.OptionParser(usage=usage)

    # --- Added Work Module Options ---
    # Create a group for better readability in help message
    module_group = optparse.OptionGroup(
        parser, "Work Modules", "Options to enable specific work modules."
    )
    module_group.add_option(
        "--task-parser",
        dest="task_parser",
        action="store_true",
        default=False,
        help="Enable the TaskParser module.",
    )
    module_group.add_option(
        "--testing",
        dest="testing",
        action="store_true",
        default=False,
        help="Enable the Testing module.",
    )
    module_group.add_option(
        "--oracle",
        dest="oracle",
        action="store_true",
        default=False,
        help="Enable the Oracle module.",
    )
    module_group.add_option(
        "--Autodroid-crawler",
        dest="autodroid_crawler",
        action="store_true",
        default=False,
        help="Run crawler with Autodroid.",
    )
    parser.add_option_group(module_group)


    # --- User Provided Options ---
    # parser.add_option(
    #     "-A",
    #     dest="is_host",
    #     action="store_true",
    #     default=False,
    #     help="The agent that make configurations",
    # )

    # parser.add_option(
    #     "-a",
    #     dest="is_guest",
    #     action="store_true",
    #     default=False,
    #     help="The agent that capture UI changes",
    # )

    # --- Host Agent Configuration Group ---
    # Parameters specific to the Host agent (-A)
    host_group = optparse.OptionGroup(parser, "The agent that make configurations")
    host_group.add_option(
        "--A-app-path",
        dest="host_app_path",
        help="[A] The apk path of the target application.",
    )
    host_group.add_option(
        "--A-device",
        dest="host_device",
        help="[A] The device serial (e.g., emulator-5554).",
    )
    host_group.add_option(
        "--A-droidbot-output",
        dest="host_droidbot_output",
        help="[A] The output path for droidbot.",
    )
    parser.add_option_group(host_group)

    parser.add_option(
        "--crawler-steplimit",
        dest="steplimit",
        type="int",
        default=100,
        help="How many operation steps does the app crawler execute before it stops exploring.",
    )

    # --- Guest Agent Configuration Group ---
    # Parameters specific to the Guest agent (-a)
    guest_group = optparse.OptionGroup(parser, "The agent that capture UI changes")
    guest_group.add_option(
        "-R",
        dest="role",
        action="store_true",
        default=False,
        help="The role of the agent [a]: Set: Administrators, Unset: Guests",
    )
    guest_group.add_option(
        "--a-app-path",
        dest="guest_app_path",
        help="[a] The apk path of the target application.",
    )
    guest_group.add_option(
        "--a-device",
        dest="guest_device",
        help="[a] The device serial (e.g., emulator-5554).",
    )
    guest_group.add_option(
        "--a-droidbot-output",
        dest="guest_droidbot_output",
        help="[a] The output path for droidbot.",
    )
    parser.add_option_group(guest_group)

    parser.add_option(
        "--proxy",
        dest="proxy",
        help="Specify an HTTP proxy (e.g., http://user:pass@host:port).",
    )

    parser.add_option(
        "--device-name",
        dest="device_name",
        help="The device name in App (e.g., Tuya smartplug)",
    )

    parser.add_option(
        "--Revocation",
        dest="home_name",
        help="The device in which/whose home (e.g., 133xxxxx's home)",
    )

    (options, args) = parser.parse_args()

    # --- Validate Arguments ---
    # Check if a role is selected
    # if not options.is_host and not options.is_guest:
    #     logger.error("Error: You must specify a role. Use -A for Host or -a for Guest.")
    #     parser.logger.info_help()
    #     sys.exit(1)

    # # Check for mutually exclusive roles
    # if options.is_host and options.is_guest:
    #     logger.error(
    #         "Error: -A (Host) and -a (Guest) are mutually exclusive. Please choose one."
    #     )
    #     parser.logger.info_help()
    #     sys.exit(1)

    # Validate arguments for the selected role
    # if not options.host_app_path:
    #     logger.error("Error: --A-app-path is required when running as Host agent (-A).")
    #     parser.logger.info_help()
    #     sys.exit(1)

    # if not options.guest_app_path:
    #     logger.error(
    #         "Error: --a-app-path is required when running as Guest agent (-a)."
    #     )
    #     parser.logger.info_help()
    #     sys.exit(1)

    # --- Example Usage ---
    logger.info("--- Parsed Configuration ---")
    logger.info(f"  Host App Path: {options.host_app_path}")
    logger.info(f"  Host Device: {options.host_device}")
    logger.info(f"  Host Droidbot Output: {options.host_droidbot_output}")
    logger.info(f"  Guest App Path: {options.guest_app_path}")
    logger.info(f"  Guest Device: {options.guest_device}")
    logger.info(f"  Guest Droidbot Output: {options.guest_droidbot_output}")

    logger.info("--- General & Module Settings ---")
    logger.info(f"  Proxy: {options.proxy}")
    if options.task_parser:
        logger.info("  TaskParser Module Enabled")
    if options.testing:
        logger.info("  Testing Module Enabled")
    if options.oracle:
        logger.info("  Oracle Module Enabled")
    logger.info("  ---------------------------------")

    if options.proxy:
        os.environ["https_proxy"] = options.proxy

    # start configuration parser module
    if options.task_parser:
        try:
            settings(
                options.host_device, options.host_app_path, options.host_droidbot_output
            )
            logger.debug(settings.Confiot_output)
            run_Configuration_parser(options)
        except:
            pass

        try:
            settings(
                options.guest_device,
                options.guest_app_path,
                options.guest_droidbot_output,
            )
            logger.debug(settings.Confiot_output)
            run_Configuration_parser(options)
        except:
            pass
    elif options.testing:
        run_Configuration_testing(options)
    elif options.oracle:
        run_Oracle(options)
    elif options.autodroid_crawler:
        settings(
            options.host_device, options.host_app_path, options.host_droidbot_output
        )
        run_Appcrawler(
            f"Explore the this app to identify and capture all unique pages related to device [{options.device_name}]. Always cancel the configuration. Focus exclusively on functionalities and settings. Avoid enter any advertisements and promotional materials content.", options.steplimit
        )
>>>>>>> Stashed changes


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
