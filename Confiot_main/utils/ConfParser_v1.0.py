import os, sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) + "/"
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.Confiot import ConfiotGuest, ConfiotHost, Confiot
from Confiot_main.settings import settings
from Confiot_main.utils.util import get_ConfigResourceMapper_from_file, progress


# 得到action path 与configuration的对应关系
def parse_configuration_list():
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

    print(confiot.ConfigResourceMapper)
    return confiot
