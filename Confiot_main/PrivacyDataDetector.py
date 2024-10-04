# Function tests for detecting privacy sensitive data
# Input: UIComparator directory, privacy sensitive data category
# Output: Privacy sensitive data detection results
# Test cases
#   1. August
#       key files (with host name): 
#           output/August/guest/Confiot/Comparation/UIHierarchy/000_to_10_1_Access_and_modify_Edit_House_Owners/158c0f863e2718afeed12ad26e5ef3ee5892e6715d7ebea4af5b052557430ea1.html, 253c3c6111c428bfa34b3ffc1fb61f579dd53d44a7db96fd597a58d5db0ed375.html

import os, re, difflib, json
from bs4 import BeautifulSoup
import xml.dom.minidom


def text_similarity(text1, text2):
    return difflib.SequenceMatcher(None, text1, text2).ratio()

def format_xml(xml_string):
        # 创建DOM解析器
        dom_parser = xml.dom.minidom.parseString(xml_string)
        # 获取格式化后的XML字符串
        formatted_xml = dom_parser.toprettyxml(indent="    ")
        return formatted_xml

def parse_html(html, class_name):
    output_list = []
    soup = BeautifulSoup(html, 'html.parser')
    tags = soup.find_all(class_=class_name)
    cleaned_tags = [get_clean_text(element) for element in tags]
    for tag in cleaned_tags:
        if class_name == 'diff_add':
            a = {'type': 'added', 'element': tag.strip()}
        elif class_name == 'diff_sub':
            a = {'type': 'deleted', 'element': tag.strip()}
        elif class_name == 'diff_chg':
            a = {'type': 'deleted', 'element': tag.strip()}
        if (a["element"] == '' or a["element"] == 'Added' or a["element"] == 'Deleted' or a["element"] == 'Changed'):
            continue
        output_list.append(a)
    return output_list

def get_clean_text(text):
    return text.replace('\u00a0', ' ')

# detect the added nodes
def get_UI_add(diff_html):
    with open(diff_html) as f:
        diff_html = f.read()
        return parse_html(diff_html, 'diff_add')

def get_UI_delete(diff_html):
    with open(diff_html) as f:
        diff_html = f.read()
        return parse_html(diff_html, 'diff_sub')

def get_UI_properties_changed(diff_html):
    return parse_html(diff_html, 'diff_chg')

def get_diff(before_xml, after_xml):
    with open(before_xml, 'r', encoding='UTF-8') as f:
        old_fp = format_xml(f.read()).replace('<text>None</text>', '').replace('<content_description>None</content_description>', '').split('\n')
    with open(after_xml, 'r', encoding='UTF-8') as f:
        new_fp = format_xml(f.read()).replace('<text>None</text>', '').replace('<content_description>None</content_description>', '').split('\n')
    diff = difflib.HtmlDiff()
    # tables = diff.make_table(old_fp, new_fp)
    # print(tables)
    diff_html = diff.make_file(old_fp, new_fp)
    # sys.stdout.writelines(diff)
    return diff_html

# # Step 1: only get before.xml diff between each two configurations, like (000, 10_1_Access_and_modify_Edit_House_Owners)
# def get_files_diff(before_conf_UI_path, after_conf_UI_path, output_path):
#     for dir in os.listdir(before_conf_UI_path):
#         if os.path.isdir(before_conf_UI_path + "/" + dir) and os.path.isdir(after_conf_UI_path + "/" + dir):
#             if os.path.exists(before_conf_UI_path + "/" + dir + "/" + "before.xml") and os.path.exists(after_conf_UI_path + "/" + dir + "/" + "before.xml"):
#                 diff_html = get_diff(before_conf_UI_path + "/" + dir + "/" + "before.xml", after_conf_UI_path + "/" + dir + "/" + "before.xml")
#                 with open(output_path + "/" + "diff_" + dir + ".html", 'w') as file:
#                     file.write(diff_html)
#             else:
#                 raise Exception("The before.xml does not exist.")
#         else:
#             continue

# Use text-based similarity to recognize similar snapshots
# [TODO] Other ways might be more precise:
#    1. Use image-based similarity
#    2. Use UI hierarchy node similarity
def page_similarity(page1, page2):
    text1 = get_text(page1)
    text2 = get_text(page2)
    similarity = text_similarity(text1, text2)
    if similarity > 0.75: # 80% similarity
        return True
    else:
        return False
    
### Substep for substep 1: get text from the added/removed pages
### input: the page xml file
### output: get all texts in the UI page
def get_text(page_xml):
    with open(page_xml) as f:
        page = f.read()
        # page_xml = format_xml(f.read()).replace('<text>None</text>', '').replace('<content_description>None</content_description>', '').split('\n')

    # [TODO] debug: Use BeautifulSoup to parse the xml file and get all <text>
    texts = re.findall(r'<text>(.*?)</text>', page)
    cleaned_texts = []
    for text in texts:
        if text != 'None':
            cleaned_texts.append(get_clean_text(text))
    print(cleaned_texts)
    return cleaned_texts

### Substep for substep 1: get text changes from the diff html (only for similar pages)
### input: html files path
### output: get all added, deleted, and changed texts in the UI page
def get_text_diff(output_path):
    for file in os.listdir(output_path):
        if file.startswith("diff_") & file.endswith(".html"):
            diff_html = output_path + "/" + file
            ui_adds = get_UI_add(diff_html)
            ui_deletes = get_UI_delete(diff_html)
            ui_changes = get_UI_properties_changed(diff_html)
            ui_add_texts, ui_delete_texts, ui_change_texts = [], [], []
            for ui_add in ui_adds:
                if "<text>" in ui_add["element"]:
                    ui_add_texts.append(ui_add["element"])
            for ui_delete in ui_deletes:
                if "<text>" in ui_delete["element"]:
                    ui_delete_texts.append(ui_delete["element"])
            for ui_change in ui_changes:
                if "<text>" in ui_change["element"]:
                    ui_change_texts.append(ui_change["element"])
            with open(output_path + "/" + file.split(".html")[0] + ".json", 'w', encoding='UTF-8') as json_file:
                json.dump([ui_add_texts, ui_delete_texts, ui_change_texts], json_file)
    return ui_add_texts, ui_delete_texts, ui_change_texts

def get_dirs(path):
    dirs = []
    for dir in os.listdir(path):
        if os.path.isdir(path + "/" + dir):
            dirs.append(dir)
    return dirs

### Remove duplicate pages
def remove_duplicate_pages(pages):
    unique_pages, duplicate_pages = [], []
    for page in pages:
        if page not in duplicate_pages:
            unique_pages.append(page)
        else:
            continue
        for page2 in pages:
            if page == page2:
                continue
            if page2 in duplicate_pages:
                continue
            if page_similarity(page, page2):
                duplicate_pages.append(page2)
        
    return unique_pages

### Substep for step 1: get UI page text changes
### input: before and after conducting one configuration (xml files)
### output: get all added, deleted, and changed texts in the UI
def get_page_diff(before_conf_UI_path, after_conf_UI_path, output_path):
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    dirs_before = get_dirs(before_conf_UI_path)
    dirs_after = get_dirs(after_conf_UI_path)

    pages_before, pages_after = [], []

    # Remove duplicate pages
    for dir_before in dirs_before:
        if os.path.exists(before_conf_UI_path + "/" + dir_before + "/" + "before.xml"):
            pages_before.append(before_conf_UI_path + "/" + dir_before + "/" + "before.xml")
    pages_before = remove_duplicate_pages(pages_before)
    for dir_after in dirs_after:
        if os.path.exists(after_conf_UI_path + "/" + dir_after + "/" + "before.xml"):
            pages_after.append(after_conf_UI_path + "/" + dir_after + "/" + "before.xml")
    pages_after = remove_duplicate_pages(pages_after)

    similar_page_pairs = []
    deleted_pages = []
    added_pages = []
    for page_before in pages_before:
        for page_after in pages_after:
            if page_similarity(page_before, page_after):
                # same page, no need to compare 
                pages_before.remove(page_before)
                pages_after.remove(page_after)
                similar_page_pairs.append((page_before, page_after))

                # get changes in similar pages
                diff_html = get_diff(page_before, page_after)
                with open(output_path + "/" + "diff_" + dir_before + "_" + dir_after + ".html", 'w') as file:
                    file.write(diff_html)
                break
    
    # for the remianing dirs, they are not the same snapshots. Snapshots in dirs_before are deleted snapshots, and snapshots in dirs_after are added snapshots
    for page_before in pages_before:
        deleted_pages.append(page_before)
        # add_text = get_text(before_conf_UI_path + "/" + dir_before + "/" + "before.xml")
    for page_after in pages_after:
        added_pages.append(page_after)
        # delete_text = get_text(after_conf_UI_path + "/" + dir_after + "/" + "before.xml")
                
    return similar_page_pairs, deleted_pages, added_pages

### Step 1: get UI snapshot text changes              
### input: before and after conducting one configuration (xml files)
### output: text changes in the current snapshot, and related snapshot xml files
def get_snapshot_diff(before_conf_UI_path, after_conf_UI_path, output_path):
    ### get text changes in similar snapshots
    # save text changes to json file
    similar_page_pairs, deleted_pages, added_pages = get_page_diff(before_conf_UI_path, after_conf_UI_path, output_path)

    ui_add_texts, ui_delete_texts, ui_change_texts = get_text_diff(output_path)

    for deleted_page in deleted_pages:
        ui_add_texts.append(get_text(before_conf_UI_path + "/" + deleted_page + "/" + "before.xml"))
    for added_page in added_pages:
        ui_delete_texts.append(get_text(after_conf_UI_path + "/" + added_page + "/" + "before.xml"))

    return ui_add_texts, ui_delete_texts, ui_change_texts

    

# def detector(UIComparation):
#     # Load the UIComparator directory
#     # Load the privacy sensitive data category
#     # Load the privacy sensitive data detection rules
#     # Detect privacy sensitive data
#     # Output the detection results
#     if os.path.exists(UIComparation):
#         for dir in os.listdir(UIComparation):
#             if os.path.isdir(UIComparation + "/" + dir):
#                 for file in os.listdir(UIComparation + "/" + dir):
#                     if file.endswith(".html"):
#                         diff = difflib.HtmlDiff()
#                         file
#     else:
#         print("The directory does not exist.")
#         return
    
# UIComparation = "/Users/tracy/Downloads/Output/August/guest/Confiot/Comparation/UIHierarchy"
# detector(UIComparation)

