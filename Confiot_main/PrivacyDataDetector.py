# Function tests for detecting privacy sensitive data
# Input: UIComparator directory, privacy sensitive data category
# Output: Privacy sensitive data detection results
# Test cases
#   1. August
#       key files (with host name): 
#           output/August/guest/Confiot/Comparation/UIHierarchy/000_to_10_1_Access_and_modify_Edit_House_Owners/158c0f863e2718afeed12ad26e5ef3ee5892e6715d7ebea4af5b052557430ea1.html, 253c3c6111c428bfa34b3ffc1fb61f579dd53d44a7db96fd597a58d5db0ed375.html

import os, re, difflib, json, pickle, argparse
from bs4 import BeautifulSoup
import xml.dom.minidom
from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity


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
    if type(text) == str:
        return text.replace('\u00a0', ' ')
    else:
        return str(text).replace('\u00a0', ' ')

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

# Use text-based similarity to recognize similar snapshots
# TODO: Other ways might be more precise:
#    1. Use image-based similarity
#    2. Use UI hierarchy node similarity
# TODO: Another thing is the similarity threshold, 0.65~0.7 is a good choice based on the test results, but need further evaluation.
def page_similarity(page1, page2):
    text1 = get_text(page1)
    text2 = get_text(page2)
    similarity = text_similarity(text1, text2)
    if similarity > 0.65: 
        return True
    else:
        return False
    
### Substep for substep 1: get text from the added/removed pages
### input: the page xml file
### output: get all texts in the UI page
def get_text(page_xml):
    if not os.path.exists(page_xml):
        raise Exception("The xml file does not exist.", page_xml)
    with open(page_xml) as f:
        page = f.read()
        # page_xml = format_xml(f.read()).replace('<text>None</text>', '').replace('<content_description>None</content_description>', '').split('\n')

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
# TODO: bug output nothing
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
            # with open(output_path + "/" + file.split(".html")[0] + ".json", 'w', encoding='UTF-8') as json_file:
            #     json.dump([ui_add_texts, ui_delete_texts, ui_change_texts], json_file)
    return ui_add_texts, ui_delete_texts, ui_change_texts

def get_dirs(path):
    dirs = []
    if not os.path.isdir(path):
        raise Exception("The path is not a dir.")
    for dir in os.listdir(path):
        if os.path.isdir(path + "/" + dir):
            dirs.append(dir)
    return dirs

### Remove duplicate pages
def remove_duplicate_pages(pages):
    unique_pages, duplicate_pages = [], []
    for page in pages:
        if page in duplicate_pages:
            continue
        unique_pages.append(page)

        for page2 in pages:
            if page == page2 or page2 in unique_pages:
                continue
            if page_similarity(page, page2):
                duplicate_pages.append(page2)
        
    return unique_pages

### Get unique pages (including before and after pages)
### TODO: to improve the precision, we can consider the relationship between before and after pages
### For example, for august /Users/tracy/Downloads/Output/August/guest/Confiot/UI/000/guest_view_05f997c12d0e37ddf4f31cd6ca167324.png12/after.png, this is recognized as a deleted page, but this one is reachable from /Users/tracy/Downloads/Output/August/guest/Confiot/UI/000/guest_view_05f997c12d0e37ddf4f31cd6ca167324.png12/before.png. 
### Therefore, if consider tree structure, we will find this page is not covered by the crawler, not a deleted page.
def get_unique_pages(UI_path):
    pages, unique_pages = [], []
    dirs = get_dirs(UI_path)

    # Remove duplicate pages
    for dir in dirs:
        if os.path.exists(UI_path + "/" + dir + "/" + "before.xml") and os.path.exists(UI_path + "/" + dir + "/" + "after.xml"):
            pages.append(UI_path + "/" + dir + "/" + "before.xml")
            pages.append(UI_path + "/" + dir + "/" + "after.xml")
        else:
            raise Exception("The before.xml or after.xml do not exist.")
    unique_pages = remove_duplicate_pages(pages)
    return unique_pages

### Substep for step 1: get UI page text changes
### input: before and after conducting one configuration (xml files)
### output: get all added, deleted, and changed texts in the UI
def get_page_diff(before_conf_UI_path, after_conf_UI_path, output_path):
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    
    # get unique pages
    pages_before = get_unique_pages(before_conf_UI_path)
    pages_after = get_unique_pages(after_conf_UI_path)

    # get similar pages, added pages, and deleted pages
    similar_page_pairs, deleted_pages, added_pages = [], [], []
    similar_before_pages, similar_after_pages = [], []
    for page_before in pages_before:
        for page_after in pages_after:
            if page_before in similar_before_pages or page_after in similar_after_pages:
                continue
            if page_similarity(page_before, page_after):
                # same page, no need to compare 
                similar_before_pages.append(page_before)
                similar_after_pages.append(page_after)
                similar_page_pairs.append((page_before, page_after))

                # get changes in similar pages
                diff_html = get_diff(page_before, page_after)
                with open(output_path + "/" + "diff_" + page_before.split(".")[0].split("/")[-1] + "_" + page_after.split(".")[0].split("/")[-1] + ".html", 'w') as file:
                    file.write(diff_html)
                break
    
    # for the remianing dirs, they are not the same snapshots. Snapshots in dirs_before are deleted snapshots, and snapshots in dirs_after are added snapshots
    for page_before in pages_before:
        if page_before not in similar_before_pages:
            deleted_pages.append(page_before)
            # add_text = get_text(before_conf_UI_path + "/" + dir_before + "/" + "before.xml")
    for page_after in pages_after:
        if page_after not in similar_after_pages:
            added_pages.append(page_after)
            # delete_text = get_text(after_conf_UI_path + "/" + dir_after + "/" + "before.xml")
                
    return similar_page_pairs, deleted_pages, added_pages

### Sub-step for Step 1: get UI snapshot text changes              
### input: before and after conducting one configuration (xml files)
### output: text changes in the current snapshot, and related snapshot xml files
def get_snapshot_diff(before_conf_UI_path, after_conf_UI_path, output_path):
    ### get text changes in similar snapshots
    # save text changes to json file
    similar_page_pairs, deleted_pages, added_pages = get_page_diff(before_conf_UI_path, after_conf_UI_path, output_path)

    ui_add_texts, ui_delete_texts, ui_change_texts = get_text_diff(output_path)

    for deleted_page in deleted_pages:
        ui_delete_texts.append(get_text(deleted_page))
    for added_page in added_pages:
        ui_add_texts.append(get_text(added_page))

    return ui_add_texts, ui_delete_texts, ui_change_texts

### Step 1 for mode 1: analyze one device
### input: device output path
### output: effects(key: configuration, value: effects(add, delete, change))
def get_device_effects(device_path):
    effects = dict() # key: configuration, value: effects(add, delete, change)
    conf_UI_path = device_path + "guest/Confiot/UI"
    conf_dirs = get_dirs(conf_UI_path)
    for conf_dir in conf_dirs:
        before_conf_UI_path = conf_UI_path + "/" + conf_dir
        after_conf_UI_path = conf_UI_path + "/" + conf_dirs[conf_dirs.index(conf_dir) + 1]
        output_path = device_path + "guest/Confiot/Comparation/UIHierarchy/" + conf_dir + "_to_" + conf_dirs[conf_dirs.index(conf_dir) + 1]

        effects[conf_dir] = get_snapshot_diff(before_conf_UI_path, after_conf_UI_path, output_path)

    return effects

### Step 1 for mode 2: analyze all devices
### input: output path
### output: all devices effects(key: device, value: effects(key: configuration, value: effects(add, delete, change)))
def get_all_devices_effects(path):
    devices = get_dirs(path)
    all_devices_effects = dict()

    for device in devices:
        all_devices_effects[device] = get_device_effects(path + "/" + device)
    
    return all_devices_effects

def get_tokens(text_list):
    token = '[CLS]'
    for text in text_list:
        token += text.lower() + '[SEP]'

    return token

### get text similarity using BERT
### TODO: 
###     1. SBERT
###     2. Other embedding models 
###     3. Another possible way to improve the precision is to use another LLM to get keywords first
def texts_senmatic_similarity(text1, text2):
    # 1. Tokenization: load the BERT tokenizer
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')

    # Tokenize the texts
    # Done: consider adding [CLS] and [SEP] tokens
    tokens1 = tokenizer.tokenize(text1)
    tokens2 = tokenizer.tokenize(text2)

    # 2. Encoding texts: convert tokens to input IDs
    input_id1 = torch.tensor(tokenizer.convert_tokens_to_ids(tokens1)).unsqueeze(0)  # Batch size 1
    input_id2 = torch.tensor(tokenizer.convert_tokens_to_ids(tokens2)).unsqueeze(0)  # Batch size 1

    # 3. Get the embeddings: obtain the BERT embeddings
    with torch.no_grad():
        outputs1 = model(input_id1)
        embeddings1 = outputs1.last_hidden_state[:, 0, :]  # [CLS] token
        outputs2 = model(input_id2)
        embeddings2 = outputs2.last_hidden_state[:, 0, :]  # [CLS] token

    # 4. Calculating Sentence Similarity using BERT Transformer
    similarity = cosine_similarity(embeddings1, embeddings2)

    return similarity

### pre-defined privacy sensitive data category
def load_privacy_data_criterias(privacy_sensitive_data_path):
    # Load the data from the PKL file
    with open(privacy_sensitive_data_path, "r") as f:
            data = json.load(f)
    return data

def compare_textList_similarity(list, text):
    res = []
    for l in list:
        sim = texts_senmatic_similarity(get_tokens(l), text)
        if sim > 0.65:
            res.append({l: sim})
    return res

def get_textList_contains(list, text):
    res = []
    for l in list:
        l = [t.lower() for t in l]
        if text[0] in l and text[1] in l:
            res.append(l)

    return res


### Step 2: compare privacy sensitive data using senmatic similarity
# ❌ directly use model and code here: https://github.com/iotprofiler/IoTProfiler-Public/blob/main/apk-analysis/sootconfig/IoT-Privacy/ .The model is not suitable for the current project, but s-bert is a good choice.
# input: text changes in the UI for each snapshot
# output: data additions, deletions, and changes only related to privacy
def get_privacy_diff_for_one_snapshot(before_conf_UI_path, after_conf_UI_path, output_path):
    path = os.path.dirname(os.path.abspath(__file__)) + "/criterias.json"
    data = load_privacy_data_criterias(path)

    ui_add_texts, ui_delete_texts, ui_change_texts = get_snapshot_diff(before_conf_UI_path, after_conf_UI_path, output_path)

    privacy_additions, privacy_deletions, privacy_changes = [], [], []
    shared_additions, shared_deletions, shared_changes = [], [], []
    privacy_diff = [privacy_additions, privacy_deletions, privacy_changes]
    shared_diff = [shared_additions, shared_deletions, shared_changes]
    
    # update structure of data
    for data_type in data:
        if data_type == "privacy_sensitive_data":
            for pri_data in data[data_type]:
                privacy_additions = [*privacy_additions, *compare_textList_similarity(ui_add_texts, pri_data)]
                privacy_deletions = [*privacy_deletions, *compare_textList_similarity(ui_delete_texts, pri_data)]
                privacy_changes = [*privacy_changes, *compare_textList_similarity(ui_change_texts, pri_data)]

        elif data_type == "Shared Data":
            for shared_data in data[data_type]:
                match shared_data:
                    case "user list":
                        shared_additions = [*shared_additions, *get_textList_contains(ui_add_texts, data[data_type][shared_data])]
                        shared_deletions = [*shared_deletions, *get_textList_contains(ui_delete_texts, data[data_type][shared_data])]
                        shared_changes = [*shared_changes, *get_textList_contains(ui_change_texts, data[data_type][shared_data])]
                    case "control ways" | "activity logs":
                        for s_d in data[data_type][shared_data]:
                            shared_additions = [*shared_additions, *compare_textList_similarity(ui_add_texts, s_d)]
                            shared_deletions = [*shared_deletions, *compare_textList_similarity(ui_delete_texts, s_d)]
                            shared_changes = [*shared_changes, *compare_textList_similarity(ui_change_texts, s_d)]

    # bug: can not recognize the privacy sensitive data as a category
    # for example: +1 800-xxx-xxxx is a phone number, but the model can not recognize it as a phone number

    # algorithm: too simple and slow, need to improve

    return [privacy_diff, shared_diff]

def get_privacy_diff_for_one_device(device_path):
    data = dict() # key: configuration, value: effects(add, delete, change)
    conf_UI_path = device_path + "guest/Confiot/UI"
    conf_dirs = get_dirs(conf_UI_path)
    for conf_dir in conf_dirs:
        before_conf_UI_path = conf_UI_path + "/" + conf_dir
        after_conf_UI_path = conf_UI_path + "/" + conf_dirs[conf_dirs.index(conf_dir) + 1]
        output_path = device_path + "guest/Confiot/Comparation/UIHierarchy/" + conf_dir + "_to_" + conf_dirs[conf_dirs.index(conf_dir) + 1]

        data[conf_dir] = get_privacy_diff_for_one_snapshot(before_conf_UI_path, after_conf_UI_path, output_path)

    return data

### Step 3: detect privacy sensitive data ownership
def privacy_data_ownership(ui_add_texts, ui_delete_texts, ui_change_texts):
    pass

### Step 4: compare changed configuration with configuration list (guest side)
def compare_configuration_senmatics():
    pass

### Step 5: detect privacy sensitive problem & configuration problem
### text-based privacy data & shared data detection
### input: device mode (with device path) or all devices mode
### output: violations 
def confiot_detector(mode, path):
    if mode == "device":
        data = get_privacy_diff_for_one_device(path)
        for conf_dir in data:
            if len(data[conf_dir]) == 2:
                [privacy_diff, shared_diff] = data[conf_dir]
                if len(privacy_diff) == 3:
                    [privacy_additions, privacy_deletions, privacy_changes] = privacy_diff
                else:
                    raise Exception("The data structure is not correct.")
                if len(shared_diff) == 3:
                    [shared_additions, shared_deletions, shared_changes] = shared_diff
                else:
                    raise Exception("The data structure is not correct.")
                # violations
                if shared_deletions:
                    Warning("Insecure configuration: should view shared data! ", conf_dir, shared_additions)
                if shared_additions:
                    print("Secure configuration: can view shared data. ", conf_dir, shared_additions)
                # if privacy_deletions: # consider ownership
                #     Warning("Privacy sensitive data is deleted! ", conf_dir, privacy_deletions)

            else:
                raise Exception("The data structure is not correct.")
            
    elif mode == "all":
        get_all_devices_effects(path)
    else:
        raise Exception("Please specify the mode: 'device' for one specific device, 'all' for all devices")

def arg_parser():
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('-m', '--mode', dest='mode',
                    help='please specify the mode: "device" for one specific device, "all" for all devices')
    parser.add_argument('-p', '--path', dest='path',
                    help='if use mode "device", provide the device folder path, if use mode "all", provide the output folder path')
    args = parser.parse_args()
    return args


if __name__ == "__main__":
    args = arg_parser()
    if args.mode == "device":
        confiot_detector("device", args.path)
    elif args.mode == "all":
        confiot_detector("all", args.path)