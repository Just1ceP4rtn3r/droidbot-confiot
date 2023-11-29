import difflib
import xml.dom.minidom
import xmldiff.main as xml_diff
import Confiot_main.settings as settings
import xml.etree.ElementTree as ET
import os

from xmldiff import formatting
from bs4 import BeautifulSoup


class UIComparator:

    def __init__(self, first_option: str, second_option: str):
        self.Confiot_output = settings.Confiot_output
        self.first_option = first_option
        self.second_option = second_option
        self.old_hierarchy_path = self.Confiot_output + settings.UI_DIR + first_option
        self.new_hierarchy_path = self.Confiot_output + settings.UI_DIR + second_option
        self.compare_output_path = self.Confiot_output + settings.Comparation_DIR
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
        ui_adds = []
        soup = BeautifulSoup(diff_html, 'html.parser')
        for added_tag in soup.find_all(class_='diff_add'):
            a = {'type': 'added', 'element': added_tag.text.strip()}
            if (a["element"] == '' or a["element"] == 'Added'):
                continue
            ui_adds.append(a)
        return ui_adds

    def get_UI_delete(self, diff_html):
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

    @staticmethod
    def compare_xml_files_with_bounds(file1, file2, bounds):
        # 目前只判断了checkable的情况，如果点击后无效UI property没有变化，则证明该配置无效
        before_xml = ET.parse(file1)
        after_xml = ET.parse(file2)

        before_root = before_xml.getroot()
        after_root = after_xml.getroot()

        print("[DBG]: Finding config in bounds: ", bounds)
        before_config_node = before_root.findall(f".//*[@bounds='{bounds}']")
        after_config_node = after_root.findall(f".//*[@bounds='{bounds}']")

        if (before_config_node == []):
            print("[ERR]: Cannot find config in before state")
            return True
        elif (before_config_node != [] and after_config_node == []):
            # [TODO-confiot-11.29]: 可能跳转到别的activity中了，一般是表示这个config是成功进行的，有没有别的情况？
            return True
        elif (before_config_node != [] and after_config_node != [] and len(before_config_node) == 1 and
              len(after_config_node) == 1):
            before_node = before_config_node[0]
            after_node = after_config_node[0]

            is_disabled = True
            if (before_node.attrib["checkable"]):
                if (before_node.attrib["checked"] != after_node.attrib["checked"]):
                    is_disabled = False

            ret = not is_disabled
            return ret
        else:
            print("[ERR]: Find more than one config node: ", before_config_node, after_config_node)
            return True
        # for node in bounds_related_nodes:
        #     print(ET.tostring(node, encoding='unicode'))

    def compare_xml_files(self, old_file, new_file):
        return self.compare_xml_files_with_difflib(
            old_file, new_file, self.compare_output_path + self.first_option + "_to_" + self.second_option + ".html")

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
            old_fp = self.format_xml(f.read()).split('\n')
        with open(new_file, 'r', encoding='UTF-8') as f:
            new_fp = self.format_xml(f.read()).split('\n')
        if old_fp is None or new_fp is None:
            print("[ERR]: cannot open file: " + old_file + " or " + new_file)
            return

        diff = difflib.HtmlDiff()
        diff_html = diff.make_file(old_fp, new_fp)

        with open(output_file, 'w', encoding='UTF-8') as f:
            f.write(diff_html)

        return diff_html


if __name__ == "__main__":
    comparator = UIComparator("A2DP_Start_at_Boot_off", "A2DP_Start_at_Boot_on")

    diff_html = comparator.compare_xml_files(comparator.old_hierarchy_path + "/819b47c5d517aba591f31b13343d5fde.xml",
                                             comparator.new_hierarchy_path + "/819b47c5d517aba591f31b13343d5fde.xml")

    UI_add = comparator.get_UI_add(diff_html)
    UI_delete = comparator.get_UI_delete(diff_html)

    print(UI_add, UI_delete)
