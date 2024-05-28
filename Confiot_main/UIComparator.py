import difflib
import xml.dom.minidom
import xmldiff.main as xml_diff
import xml.etree.ElementTree as ET
import os, sys
import base64
import requests
import re

from xmldiff import formatting
from bs4 import BeautifulSoup

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../")

from Confiot_main.settings import settings
from Confiot_main.util import deprecated


class UIComparator:

    def __init__(self, first_option: str, second_option: str):
        self.Confiot_output = settings.Confiot_output
        self.first_option = first_option
        self.second_option = second_option
        self.old_hierarchy_path = settings.UI_output + first_option
        self.new_hierarchy_path = settings.UI_output + second_option
        self.compare_output_path = settings.UIHierarchy_comparation_output + f"/{first_option}_to_{second_option}/"

        if (not os.path.exists(self.compare_output_path)):
            os.makedirs(self.compare_output_path)

    def format_xml(self, xml_string):
        # 创建DOM解析器
        dom_parser = xml.dom.minidom.parseString(xml_string)
        # 获取格式化后的XML字符串
        formatted_xml = dom_parser.toprettyxml(indent="    ")
        return formatted_xml

    # detect the added nodes
    def get_UI_add(self, diff_html):
        with open(diff_html) as f:
            diff_html = f.read()
            ui_adds = []
            soup = BeautifulSoup(diff_html, 'html.parser')
            for added_tag in soup.find_all(class_='diff_add'):
                a = {'type': 'added', 'element': added_tag.text.strip()}
                if (a["element"] == '' or a["element"] == 'Added'):
                    continue
                ui_adds.append(a)
            return ui_adds

    def get_UI_delete(self, diff_html):
        with open(diff_html) as f:
            diff_html = f.read()
            ui_deletes = []
            soup = BeautifulSoup(diff_html, 'html.parser')
            for sub_tag in soup.find_all(class_='diff_sub'):
                a = {'type': 'deleted', 'element': sub_tag.text.strip()}
                if (a["element"] == '' or a["element"] == 'Deleted'):
                    continue
                ui_deletes.append(a)
            return ui_deletes

    def get_UI_properties_changed(self, diff_html):
        ui_deletes = []
        soup = BeautifulSoup(diff_html, 'html.parser')
        for sub_tag in soup.find_all(class_='diff_chg'):
            a = {'type': 'changed', 'element': sub_tag.text.strip()}
            if (a["element"] == '' or a["element"] == 'Changed'):
                continue
            ui_deletes.append(a)
        return ui_deletes

    def compare_xml_files(self, old_file, new_file, output):
        return self.compare_xml_files_with_difflib(old_file, new_file, output)

    @deprecated
    def compare_xml_files_with_xmldiff(self, old_file, new_file):
        old_fp = None
        new_fp = None
        with open(old_file, 'r', encoding='UTF-8') as f:
            old_fp = self.format_xml(f.read())
        with open(new_file, 'r', encoding='UTF-8') as f:
            new_fp = self.format_xml(f.read())
        if old_fp is None or new_fp is None:
            print("[ERR]: cannot open file: " + old_file + " or " + new_file)
            return

        formatter = formatting.DiffFormatter()
        differences = xml_diff.diff_texts(old_fp,
                                          new_fp,
                                          diff_options={
                                              "F": 0.5,
                                              "ratio_mode": "accurate"
                                          },
                                          formatter=formatter)

        print(differences)

        return differences

    def compare_xml_files_with_difflib(self, old_file, new_file, output_file):
        old_fp = None
        new_fp = None
        with open(old_file, 'r', encoding='UTF-8') as f:
            old_fp = self.format_xml(f.read()).replace('<text>None</text>',
                                                       '').replace('<content_description>None</content_description>',
                                                                   '').split('\n')
        with open(new_file, 'r', encoding='UTF-8') as f:
            new_fp = self.format_xml(f.read()).replace('<text>None</text>',
                                                       '').replace('<content_description>None</content_description>',
                                                                   '').split('\n')
        if old_fp is None or new_fp is None:
            print("[ERR]: cannot open file: " + old_file + " or " + new_file)
            return

        diff = difflib.HtmlDiff()
        diff_html = diff.make_file(old_fp, new_fp)

        with open(output_file, 'w', encoding='UTF-8') as f:
            f.write(diff_html)

        return diff_html

    @staticmethod
    # return: feasible:true
    def compare_xml_files_with_bounds(file1, file2, bounds):
        # 目前只判断了checkable的情况，如果点击后无效UI property没有变化，则证明该配置无效
        before_xml = ET.parse(file1)
        after_xml = ET.parse(file2)

        before_root = before_xml.getroot()
        after_root = after_xml.getroot()

        # print("[DBG]: Finding config in bounds: ", bounds)

        for node in before_root:
            before_config_node = None
            for attr in node:
                if (attr.tag == "bounds"):
                    if (attr.text == bounds):
                        before_config_node = node
                        break
            if (before_config_node):
                break

        for node in after_root:
            after_config_node = None
            for attr in node:
                if (attr.tag == "bounds"):
                    if (attr.text == bounds):
                        after_config_node = node
                        break
            if (after_config_node):
                break

        # before_config_node = before_root.findall(f".//*[@bounds='{bounds}']")
        # after_config_node = after_root.findall(f".//*[@bounds='{bounds}']")

        if (not before_config_node):
            print("[ERR]: Cannot find config in before state")
        elif (before_config_node and not after_config_node):
            # [TODO-confiot-11.29]: 可能跳转到别的activity中了，一般是表示这个config是成功进行的，有没有别的情况？
            print("[ERR]: different activities")
        elif (before_config_node and after_config_node):
            # before_node = before_config_node[0]
            # after_node = after_config_node[0]

            # checkbox
            if (before_config_node[0].text == "True"):
                # checked
                if (before_config_node[9].text != after_config_node[9].text):
                    return True

        else:
            print("[ERR]: Find more than one config node: ", before_config_node, after_config_node)
        return None
        # for node in bounds_related_nodes:
        #     print(ET.tostring(node, encoding='unicode'))

    @staticmethod
    def identify_alert(before_image_path, after_image_path, out_dir):
        # Function to encode the image
        def encode_image(image_path):
            with open(image_path, "rb") as image_file:
                return base64.b64encode(image_file.read()).decode('utf-8')

        # Getting the base64 string
        before_base64_image = encode_image(before_image_path)
        after_base64_image = encode_image(after_image_path)

        api_key = os.environ.get("OPENAI_API_KEY")
        headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}

        payload = {
            "model": "gpt-4-vision-preview",
            "messages": [{
                "role":
                    "user",
                "content": [
                    {
                        "type":
                            "text",
                        "text":
                            "I will provide 2 screenshots of a mobile app. The first image will highlight the upcoming action (such as checkboxes, buttons, or dropdown menus), while the second image will showcase the corresponding results after performing that action in the app. If the 2 pictures are the same, answer 'unknown'. Otherwise, if there is an error message in the second picture, based on the meaning of the message, answer 'fail' if the message shows lack permission, and answer 'succeed' if the message is just showing the status. Otherwise, answer 'succeed'. I just need the result."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{before_base64_image}"
                        },
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{after_base64_image}"
                        },
                    },
                ]
            }],
            "max_tokens": 300
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

        with open(out_dir + "/gpt_resp.txt", 'w') as f:
            f.write(response.text)

        # print(response.json()["choices"][0]["message"]["content"])

        try:
            if ("succeed" in response.json()["choices"][0]["message"]["content"]) or (
                    "Succeed" in response.json()["choices"][0]["message"]["content"]):
                return "succeed"
            elif ("fail" in response.json()["choices"][0]["message"]["content"]) or (
                    "Fail" in response.json()["choices"][0]["message"]["content"]):
                return "fail"
            else:
                return "unknown"
        except Exception as e:
            return "unknown"


if __name__ == "__main__":
    comparator = UIComparator("33_Rename_the_body_fat_scale_to_its_original_name_with_the_name_guest",
                              "45_1_Confirm_deletion_of_all_guest_users_data_from_the_body_fat_scale_with_the_user_name_guest")

    state_str = "7f98c90078956f2da5a667489fb2432ba0b82045bb0254f9649e8090b6190b54"

    UI_old = comparator.old_hierarchy_path + f"/{state_str}.xml"
    UI_new = comparator.new_hierarchy_path + f"/{state_str}.xml"
    compare_output_path = comparator.compare_output_path + f"/{state_str}.html"
    diff_html = comparator.compare_xml_files(UI_old, UI_new, compare_output_path)

    UI_add = comparator.get_UI_add(compare_output_path)
    UI_delete = comparator.get_UI_delete(compare_output_path)

    change_nodes_count = 0
    for n in UI_add:
        if ("<Node>" in n["element"]):
            change_nodes_count += 1
    for n in UI_delete:
        if ("<Node>" in n["element"]):
            change_nodes_count += 1
    print(change_nodes_count)

    # for add_node in UI_add:
    #     text = re.findall("text=\"(.*?)\"", add_node["element"])
    #     content = re.findall("content-desc=\"(.*?)\"", add_node["element"])

    #     print(text, content)
