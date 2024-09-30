import os, sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) + "/"
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.settings import settings
from Confiot_main.utils.util import get_ConfigResourceMapper_from_file, progress


# 得到action path 与configuration的对应关系
def parse_configuration_list():

    configuration_actionpath_mapping = {}

    if (not os.path.exists(settings.Confiot_output + "/ConfigResourceMapping.txt")):
        # confiot.ConfigResourceMapper = confiot.device_map_config_resource(settings.Confiot_output)
        pass
    else:
        ConfigResourceMapper = get_ConfigResourceMapper_from_file(settings.Confiot_output + "/ConfigResourceMapping.txt",
                                                                  settings.Confiot_output)

        # print(ConfigResourceMapper)
        for i in ConfigResourceMapper:
            for task in i["Tasks"]:
                if (task not in configuration_actionpath_mapping):
                    configuration_actionpath_mapping[task] = []
                configuration_actionpath_mapping[task].append(i["Id"])

    return configuration_actionpath_mapping


parse_configuration_list()
