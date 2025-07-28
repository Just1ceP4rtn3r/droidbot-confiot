import optparse
import os
import sys
import re
import json
import time
from loguru import logger


BASE_DIR = os.path.dirname(os.path.abspath(__file__)) + "/"
sys.path.append(BASE_DIR + "/../")

from Confiot_main.Confiot import ConfiotGuest, ConfiotHost, Confiot
from Confiot_main.settings import settings
from Confiot_main.ConfigurationParser.ConfigurationParser import ConfigurationParser
from Confiot_main.ConfigurationParser.PageExploration import PageExplorer
from Confiot_main.ConfiotHunter.TestingPhase import Phase
from Confiot_main.ConfiotHunter.ConfiotOracle import (
    ConfiotOracle,
    ConfigurationConfiotOracle,
)


@logger.catch
def _Autodroid(task_id, page=None, task=None):
    from Confiot_main.globalvars import GlobalVars

    from AutoDroid.droidbot import input_manager
    from AutoDroid.droidbot import env_manager
    from AutoDroid.droidbot.droidbot import DroidBot as AutoDroid
    from AutoDroid.droidbot.input_event import KeyEvent, IntentEvent

    # s = settings(
    #     "172.20.10.10:5555",
    #     "/root/documents/Output/mihome/mihome-aqarahub-usenix25/mihome.apk",
    #     r"/root/documents/Output/mihome/mihome-aqarahub-usenix25/host/result",
    # )
    if not task:
        Tasks = {}
        with open(
            settings.LLMConfiguration_output + "/ConfigurationsSummary.json", "r"
        ) as f:
            Tasks = json.load(f)
        for t in Tasks:
            if t["Id"] == task_id:
                page = t["Page ID"]
                task = t["Tasks"]
                break

    droidbot = AutoDroid(
        app_path=settings.app_path,
        device_serial=settings.device_serial,
        task=task,
        is_emulator=True,
        output_dir=settings.droid_output + "/Autodroid/",
        env_policy=env_manager.POLICY_NONE,
        policy_name=input_manager.POLICY_TASK,
        script_path=None,
        event_interval=1,
        timeout=input_manager.DEFAULT_TIMEOUT,
        event_count=30,
        debug_mode=False,
        keep_app=True,
        keep_env=True,
        grant_perm=True,
        enable_accessibility_hard=True,
        ignore_ad=True,
    )

    Agent = Confiot()
    Agent.device = droidbot.device
    Agent.app = droidbot.app
    Agent.device.connect()

    PE = PageExplorer(Agent)

    PE.parse_struture_unique_pages()
    PE.extract_navigations()

    if page:
        GlobalVars.event_dict_steps = PE.test_device_page_replay(
            settings.UIHierarchy_comparation_output + "/tmp/", page, autodroid=True
        )

        GlobalVars.step_outputfile = (
            settings.autodroid_output + f"/Task-{str(task_id)}.json"
        )
    else:
        GlobalVars.step_outputfile = settings.droid_output + "/tmp.json"

        droidbot.device.connect()
        event = IntentEvent(droidbot.app.get_stop_intent())

        event.send(droidbot.device)

        time.sleep(1)
        event = IntentEvent(droidbot.app.get_start_intent())
        event.send(droidbot.device)
        time.sleep(3)


    droidbot.start()


def run_Configuration_parser(options):
    Agent = Confiot()
    try:
        Agent.device_connect()
    except:
        pass

    CP = ConfigurationParser(Agent)

    CP.query_LLM_for_configuration_mapping_based_on_page_graph(
        settings.LLMConfiguration_output
    )
    CP.save_configurations(settings.LLMConfiguration_output)
    try:
        Agent.device.disconnect()
    except:
        pass


def run_Configuration_testing(options):
    input()
    settings(options.host_device, options.host_app_path, options.host_droidbot_output)
    Tasks = {}
    with open(
        settings.LLMConfiguration_output + "/ConfigurationsSummary.json", "r"
    ) as f:
        Tasks = json.load(f)

    if options.home_name:
        Tasks.append(
            {
                "Id": "REVOKE",
                "Page ID": None,
                "Tasks": f"Exit the {options.home_name} in home management",
                "Related operations": [],
            }
        )

    logger.info("--- Configuration Tasks in Testing ---")
    logger.info(Tasks)


    for t in Tasks:
        task_content = t["Tasks"]
        autodroid_result = {}
        try:
            logger.info(
                f"Try to complete the configuration {t['Id']} with Autodroid on device {options.host_device}"
            )
            settings(
                options.host_device, options.host_app_path, options.host_droidbot_output
            )
            _Autodroid(task_id=t["Id"], page=t["Page ID"], task=t["Tasks"])

            autodroid_dir = settings.droid_output + "/Autodroid/"
            if os.path.exists(f"{autodroid_dir}/isfinished.json"):
                with open(
                    f"{autodroid_dir}/isfinished.json", "r", encoding="utf-8"
                ) as f:
                    autodroid_result = json.load(f)
                if "finished" not in autodroid_result:
                    autodroid_result["finished"] = False

            autodroid_result["state_views"] = {}
            states_path = f"{autodroid_dir}/states/"
            states_json = os.listdir(states_path)
            for j in states_json:
                if "screen" in j:
                    continue
                with open(states_path + j, "r") as f:
                    try:
                        s = json.load(f)
                        state_str = s["state_str"]
                        if state_str != "":
                            autodroid_result["state_views"][state_str] = s["views"]
                    except Exception as e:
                        print(f"[ERR]: Failed to parse the state file `{j}`\n" + str(e))

            logger.info("Autodroid finished\n")
            logger.info("  ---------------------------------")
        except Exception as e:
            logger.error(e)
            continue

        autodroid_result["worklist_pages"] = set()
        if autodroid_result["finished"]:
            logger.info(f"Try to capture the UI changes in {options.host_device}")
            settings(
                options.guest_device,
                options.guest_app_path,
                options.guest_droidbot_output,
            )
            Agent = Confiot()

            # 执行Task-0, ...
            Agent.device_connect()
            CP = ConfigurationParser(Agent)

            # 在guest app中识别相应的page
            for state in autodroid_result["state_views"]:
                tmp_views = autodroid_result["state_views"][state]
                _page = CP.PE.identify_current_page(tmp_views)
                if _page:
                    if _page in CP.pages:
                        autodroid_result["worklist_pages"].add(_page)

            logger.info(f"Related Pages: {autodroid_result['worklist_pages']}")
            CP.app_pages_exploration(f"Task-{str(t['Id'])}")
            # if t["Id"] == "REVOKE":
            #     CP.app_pages_exploration(f"Task-{str(t['Id'])}")
            # else:
            #     for page in autodroid_result["worklist_pages"]:
            #         outputdir = (
            #             settings.UIHierarchy_comparation_output + f"/Task-{str(t['Id'])}"
            #         )
            #         if not os.path.exists(outputdir + f"/{page}.xml"):
            #             CP.PE.test_device_page_replay(outputdir, page)

            with open(settings.UIHierarchy_comparation_output + f"/Task-{str(t['Id'])}/Task.txt", "w") as f:
                f.write(task_content)

            Agent.device.disconnect()


def run_Oracle(options):
    if options.guest_device:
        settings(
            options.guest_device, options.guest_app_path, options.guest_droidbot_output
        )
    else:
        settings(
            options.host_device, options.host_app_path, options.host_droidbot_output
        )

    task_replay_steps_file = os.listdir(settings.UIHierarchy_comparation_output)
    task_ids = [
        int(file[5:])
        for file in task_replay_steps_file
        if file.startswith(("Task")) and file != "Task-REVOKE"
    ]
    task_ids.sort()
    task_ids = [f"Task-{id}" for id in task_ids]
    if "000" in task_replay_steps_file:
        task_ids.insert(0, "000")
    if "Task-REVOKE" in task_replay_steps_file:
        task_ids.append("Task-REVOKE")
    # Capabilities Oracle

    Agent = Confiot()
    oracle = ConfigurationConfiotOracle(Agent)
    Criteria = oracle.LoadCriterias()
    UserCapabilities = oracle.LoadConfigurations(
        settings.Confiot_output + "/LLM_ConfigParsing"
    )
    last_task = None
    for task in task_ids:
        UIChanges = oracle.LoadUIChanges(last_task, task)
        task_content = ""

        if os.path.exists(settings.violation_output + "/" + oracle.proceed_configuration + "/"):
            logger.info("Relevant violation results already exist: " + settings.violation_output + "/" + oracle.proceed_configuration + "/")
            last_task = task
            continue

        if os.path.exists(settings.UIHierarchy_comparation_output + f"/{task}/Task.txt"):
            with open(settings.UIHierarchy_comparation_output + f"/{task}/Task.txt", "r") as f:
                task_content = f.read()

        if not last_task:
            phase = Phase.AfterDelegation
        elif task == "Task-REVOKE":
            phase = Phase.AfterRevocation
        else:
            phase = Phase.DuringUsage
        oracle.IdentifyConfiot(
            phase,
            Criteria,
            UserCapabilities,
            UIChanges,
            "Administrators" if options.role else "Guests",
            settings.violation_output + "/" + oracle.proceed_configuration + "/",
            task_content=task_content
        )
        last_task = task

    # Privacy Oracle

    # co = ConfiotOracle()
    # co.IdnetifyConfiot(
    #     options.guest_droidbot_output + "/Confiot/",
    #     [],
    # )


def run_Appcrawler(task, steplimit=100):
    from Confiot_main.globalvars import GlobalVars

    from Appcrawler.droidbot import input_manager
    from Appcrawler.droidbot import env_manager
    from Appcrawler.droidbot.droidbot import DroidBot as AutoDroid
    from Appcrawler.droidbot.input_event import KeyEvent, IntentEvent

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
            f"Explore the this app to identify and capture all unique pages related to device [{options.device_name}]. Always cancel the configuration. Focus exclusively on functionalities and settings. Avoid enter any advertisements and promotional materials content.",
            int(options.steplimit),
        )


if __name__ == "__main__":
    main()
