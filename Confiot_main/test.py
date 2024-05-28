import os, sys
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../")
from Confiot_main.Confiot import ConfiotGuest, ConfiotHost, Confiot
import xml.etree.ElementTree as ET
from Confiot_main.UIComparator import UIComparator
from Confiot_main.PolicyGenerator import PolicyGenerator

# For test
HOST_CONFIG_ANALYZED = "host:August_on"


######################################
# util.py
def test_parse_config_resource_map():
    from Confiot_main.util import parse_config_resource_mapping
    with open("prompt/response.txt") as f:
        respond = f.read()
        parse_config_resource_mapping(respond)


def test_resize_png():
    from Confiot_main.util import png_resize
    png_resize(
        "/root/documents/droidbot-new/a2dp/Confiot/UI/host:A2DP_Start_at_Boot_off/guest:view_0fe88b3189e686f7242ae495c9b79a4a.png/after.png",
        230, 512)


#####################################
# Confiot.py


def test_goto_state():
    from Confiot_main.settings import settings
    from Confiot_main.util import query_config_resource_mapping, parse_config_resource_mapping, get_ConfigResourceMapper_from_file
    settings.device_serial = "192.168.31.218:5555"
    settings.app_path = "/root/documents/Output/Huawei_AI_Life/Huawei.apk"
    settings.droid_output = "/root/documents/Output/Huawei_AI_Life/host/result"
    confiot = ConfiotGuest()
    confiot.device_connect()

    # print(confiot.events)

    while (1):
        target_str = input("state: ")
        if (target_str == '\n' or target_str == ''):
            confiot.device_stop_app()
            break
        confiot.device_to_state(HOST_CONFIG_ANALYZED, target_str)
        confiot.parse_all_views(confiot.device.get_current_state())


def test_stop_app():
    confiot = ConfiotGuest()
    confiot.device_connect()

    confiot.device_stop_app()


def test_state_walker():
    confiot = ConfiotGuest()
    confiot.device_connect()

    # print(confiot.events)

    confiot.device_state_replay("A2DP_Start_at_Boot_off")


def test_config_extract():
    confiot = ConfiotGuest()
    #confiot.device_connect()

    # print(confiot.events)


def test_xml_parse():
    out_dir = "/root/documents/droidbot-new/a2dp/Confiot/UI/host:A2DP_Start_at_Boot_off/view_80907fa95fc546d10b3034979424ff23.png"
    config_bounds = "[965,129][1080,267]"

    before_xml = ET.parse(out_dir + "/before.xml")
    after_xml = ET.parse(out_dir + "/after.xml")

    before_root = before_xml.getroot()
    after_root = after_xml.getroot()

    print("[DBG]: Find config in bounds: ", config_bounds)
    before_config_node = before_root.findall(f".//*[@bounds='{config_bounds}']")
    after_config_node = after_root.findall(f".//*[@bounds='{config_bounds}']")

    # 打印相关的node元素
    for node in before_config_node:
        print(ET.tostring(node, encoding='unicode'))

    for node in after_config_node:
        print(ET.tostring(node, encoding='unicode'))


def test_identify_alert():
    os.environ["https_proxy"] = "http://192.168.72.1:1083"
    before_image_path = "/root/documents/droidbot-new/a2dp/Confiot/UI/host:A2DP_Start_at_Boot_off/guest:view_80907fa95fc546d10b3034979424ff23.png/before.png"
    after_image_path_test1 = "/root/documents/droidbot-new/a2dp/Confiot/UI/host:A2DP_Start_at_Boot_off/guest:view_80907fa95fc546d10b3034979424ff23.png/after.png"
    # image_path_no_alert_test = "/Users/tracy/Documents/GitHub/droidbot/mihome/pixel5/states/screen_2023-11-20_174510.png"
    print(UIComparator.identify_alert(before_image_path, before_image_path))


def check_nearby_rectangles(rectangle, target_rectangle, threshold):
    target_center_x = (target_rectangle[0][0] + target_rectangle[1][0]) / 2
    target_center_y = (target_rectangle[0][1] + target_rectangle[1][1]) / 2

    center_x = (rectangle[0][0] + rectangle[1][0]) / 2
    center_y = (rectangle[0][1] + rectangle[1][1]) / 2

    distance = math.sqrt((center_x - target_center_x)**2 + (center_y - target_center_y)**2)
    print(distance)
    if distance < threshold:
        return True

    return False


def test_device_guest_config_walker():
    os.environ["https_proxy"] = "http://192.168.72.1:1083"

    confiot = ConfiotGuest()
    confiot.device_connect()

    # print(confiot.events)

    # confiot.device_state_replay(HOST_CONFIG_ANALYZED)
    confiot.device_guest_config_walker(HOST_CONFIG_ANALYZED)
    # confiot.device_guest_config_GPTAnalyze(HOST_CONFIG_ANALYZED)

    print(confiot.result)


def test_STEP0():
    confiot = ConfiotGuest()
    confiot.device_connect()

    # print(confiot.events)

    confiot.device_get_all_description_config()


def test_STEP1():
    confiot = ConfiotGuest()
    confiot.device_connect()

    # print(confiot.events)

    confiot.device_state_replay(HOST_CONFIG_ANALYZED)


def test_get_ui_hierarchy():
    from Confiot_main.settings import settings
    import json
    settings.device_serial = "192.168.31.218:5555"
    confiot = ConfiotHost()
    confiot.device_connect()
    while (input() != '1'):
        confiot.device_get_UIElement("", "", "/root/documents/droidbot-confiot/Confiot_main/", "output.json")

    # while(input() != '1'):
    #     a= confiot.device.get_views()
    #     json_data = json.dumps(a, indent=2)  # indent 参数用于设置缩进，使 JSON 文件更易读

    #     # 将 JSON 数据写入文件
    #     with open('output.json', 'w') as json_file:
    #         json_file.write(json_data)


def test_mapping_uitree():
    from Confiot_main.settings import settings
    from Confiot_main.util import query_config_resource_mapping, parse_config_resource_mapping, get_ConfigResourceMapper_from_file

    confiot = Confiot()
    policy_generator = PolicyGenerator()
    #confiot.device_connect()

    # print(confiot.events)

    os.environ["https_proxy"] = "http://192.168.72.1:1083"
    # 请求GPT
    ConfigResourceMapper = confiot.device_map_config_resource(settings.Confiot_output)
    # 使用文件读取mapper测试
    # ConfigResourceMapper = get_ConfigResourceMapper_from_file(settings.Confiot_output + "/FilteredConfigResourceMapping.txt")

    # policy_generator.Policy_generate_1("host_august_Edit_house_owner_not_check", "host_august_Edit_house_owner_check",
    #                                    "51b1b582e9a5351503e9f7a195ce1f9e4674ccdf38cb61c00d4b6eac163a9a2c", ConfigResourceMapper)


if __name__ == "__main__":
    #test_device_guest_config_walker()
    # test_STEP0()
    test_mapping_uitree()
