import optparse
import os
import sys
import re
import json
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


def _Autodroid(task_id, page=None, task=None):
    from Confiot_main.globalvars import GlobalVars

    from AutoDroid.droidbot import input_manager
    from AutoDroid.droidbot import env_manager
    from AutoDroid.droidbot.droidbot import DroidBot as AutoDroid

    # s = settings(
    #     "172.20.10.10:5555",
    #     "/root/documents/Output/mihome/mihome-aqarahub-usenix25/mihome.apk",
    #     r"/root/documents/Output/mihome/mihome-aqarahub-usenix25/host/result",
    # )
    if not page or not task:
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

    GlobalVars.event_dict_steps = PE.test_device_page_replay(
        settings.UIHierarchy_comparation_output + "/tmp/", page, autodroid=True
    )

    GlobalVars.step_outputfile = (
        settings.autodroid_output + f"/Task-{str(task_id)}.json"
    )

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

    settings(options.host_device, options.host_app_path, options.host_droidbot_output)
    Tasks = {}
    with open(
        settings.LLMConfiguration_output + "/ConfigurationsSummary.json", "r"
    ) as f:
        Tasks = json.load(f)

    logger.info("--- Configuration Tasks in Testing ---")
    logger.info(Tasks)

    for t in Tasks:
        try:
            logger.info(
                f"Try to complete the configuration {t['Id']} with Autodroid on device {options.host_device}"
            )
            settings(
                options.host_device, options.host_app_path, options.host_droidbot_output
            )
            _Autodroid(task_id=t["Id"])
            logger.info("Autodroid finished\n")
            logger.info("  ---------------------------------")
        except:
            pass

        logger.info(f"Try to capture the UI changes in {options.host_device}")
        settings(
            options.guest_device, options.guest_app_path, options.guest_droidbot_output
        )
        Agent = Confiot()

        # 执行Task-0, ...
        Agent.device_connect()
        ConfigurationParser(Agent).app_pages_exploration(f"Task-{str(t['Id'])}")

        Agent.device.disconnect()


def run_Oracle(options):
    settings(
        options.guest_device, options.guest_app_path, options.guest_droidbot_output
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
    Configurations = oracle.LoadConfigurations(
        settings.Confiot_output + "/LLM_ConfigParsing"
    )
    last_task = None
    for task in task_ids:
        UIChanges = oracle.LoadUIChanges(last_task, task)

        if not last_task:
            phase = Phase.AfterDelegation
        elif task == "Task-REVOKE":
            phase = Phase.AfterRevocation
        else:
            phase = Phase.DuringUsage
        oracle.IdentifyConfiot(
            phase,
            Criteria,
            Configurations,
            UIChanges,
            "Administrators" if options.role else "Guests",
            settings.violation_output + "/" + oracle.proceed_configuration + "/",
        )
        last_task = task

    # Privacy Oracle

    # co = ConfiotOracle()
    # co.IdnetifyConfiot(
    #     options.guest_droidbot_output + "/Confiot/",
    #     [],
    # )


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
        settings(
            options.host_device, options.host_app_path, options.host_droidbot_output
        )
        logger.debug(settings.Confiot_output)
        run_Configuration_parser(options)

        settings(
            options.guest_device, options.guest_app_path, options.guest_droidbot_output
        )
        logger.debug(settings.Confiot_output)
        run_Configuration_parser(options)
    elif options.testing:
        run_Configuration_testing(options)
    elif options.oracle:
        run_Oracle(options)


if __name__ == "__main__":
    main()
