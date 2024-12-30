import os, sys
import json

import os, re, difflib, json, pickle, argparse # clean_text
from bs4 import BeautifulSoup
import xml.dom.minidom
from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
import util

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.ConfiotHunter.UIComparator import UIComparator
from Confiot_main.ConfigurationParser.ConfigurationParser import ConfigurationParser
from TestingPhase import Phase


class ConfiotOracle():

    def __init__(self) -> None:
        self.stage = Phase.Initilization
        # {"page-0": (File_dir, UIchanges)}
        self.UIChanges = None
        pass

    def LoadCriterias(self, privacy_sensitive_data_path):
        # Load the data from the PKL file
        with open(privacy_sensitive_data_path, "r") as f:
            data = json.load(f)
        return data

    def ParseUIChanges(self, xml_old: str, xml_new: str, output: str):
        comparator = UIComparator()
        comparator.compare_xml_files(xml_old, xml_new, output)

        UI_old = xml_old
        UI_new = xml_new
        hierachy_compare_result = output

        # if (not UI_old and UI_new):
        #     # 如果没UI_old is None，代表UI_new为刚刚delegation后的UI


        if (not UI_old or not UI_new):
            print("[ERR]: Do not found files:", UI_old, UI_new)
            return None
        if (not os.path.exists(UI_old) or not os.path.exists(UI_new)):
            print("[ERR]: Do not found files:", UI_old, UI_new)
            return None

        comparator.compare_xml_files(UI_old, UI_new, hierachy_compare_result)

        UI_add = comparator.get_UI_add(hierachy_compare_result)
        UI_delete = comparator.get_UI_delete(hierachy_compare_result)

        print(UI_add, UI_delete)
        return UI_add, UI_delete

    def ParseSnapshotChanges(self, snapshot_old: str, snapshot_new: str):
        '''After doing a configuration, we need to compare the snapshot (contains all xml files) changes.'''
        # todo: consider xml files align to get aligned xml paris (xml old and xml new)
        # snapshot_old: /Users/tracy/workspace/projects/ConfioT/usenix-output/mihome/guest/Confiot/Comparation/UIHierarchy/000
        # output: /Users/tracy/workspace/projects/ConfioT/usenix-output/mihome/guest/Confiot/Comparation/UIHierarchy/Comparation/000_to_001
        for root, dirs, files in os.walk(snapshot_old):
            xml_pairs = []
            for file in files:
                if file.endswith(".xml"):
                    xml_pairs.append((os.path.join(snapshot_old, file), os.path.join(snapshot_new, file)))
        snapshot_add, snapshot_delete = [], []
        for file in xml_pairs:
            output = os.path.join(os.path.dirname(snapshot_old), "Comparation", os.path.basename(snapshot_old) + "_to_" + os.path.basename(snapshot_new), ".html")
            UI_add, UI_delete = self.ParseUIChanges(file[0], file[1], output)
            snapshot_add.append(UI_add)
            snapshot_delete.append(UI_delete)

        return snapshot_add, snapshot_delete

    # Return Type: [Configuration List, "str", ...]
    def ParseCapabilities(self, configurationparser:ConfigurationParser):
        # Load capablities criteria from the file
        # with open("criterias.json") as f:
        #     capab = json.load(f)
        #     pass

        # 解析UI changes为capablities
        Add_capabilities = []
        Delete_capabilities = []

        operation_configuration_mapping = configurationparser.operation_configuration_mapping
        if (self.stage == Phase.AfterDelegation):
            for page in operation_configuration_mapping:
                for caps in operation_configuration_mapping[page]:
                    Add_capabilities.append(caps)

        else:
            for page in self.UIChanges:
                pass


        # 比较criteria 与changed capablities

        pass

    def compare_similarity(self, text1, text2):
        '''Compare the similarity between two texts'''
        # 1. Tokenization: load the BERT tokenizer
        tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        model = BertModel.from_pretrained('bert-base-uncased')

        # Tokenize the texts
        # Done: consider adding [CLS] and [SEP] tokens
        tokens1 = tokenizer.tokenize(text1)
        tokens2 = tokenizer.tokenize(text2)

        # 2. Encoding texts: convert tokens to input IDs
        input_id1 = torch.tensor(tokenizer.convert_tokens_to_ids(tokens1)).unsqueeze    (0)  # Batch size 1
        input_id2 = torch.tensor(tokenizer.convert_tokens_to_ids(tokens2)).unsqueeze    (0)  # Batch size 1

        # 3. Get the embeddings: obtain the BERT embeddings
        with torch.no_grad():
            outputs1 = model(input_id1)
            embeddings1 = outputs1.last_hidden_state[:, 0, :]  # [CLS] token
            outputs2 = model(input_id2)
            embeddings2 = outputs2.last_hidden_state[:, 0, :]  # [CLS] token

        # 4. Calculating Sentence Similarity using BERT Transformer
        similarity = cosine_similarity(embeddings1, embeddings2)

        return similarity
    
    def get_dirs(self, path):
        dirs = []
        if not os.path.isdir(path):
            raise Exception("The path is not a dir.")
        for dir in os.listdir(path):
            if os.path.isdir(path + "/" + dir):
                dirs.append(dir)
        return dirs
    
    def get_tokens(self, text_list):
        token = '[CLS]'
        for text in text_list:
            token += text.lower() + '[SEP]'

        return token
    
    def compare_textList_similarity(self, list, text):
        res = []
        for l in list:
            sim = self.compare_similarity(self.get_tokens(l), text)
            if sim > 0.65:
                res.append({l: sim})
        return res
    
    def get_textList_contains(self, list, text):
        res = []
        for l in list:
            l = [t.lower() for t in l]
            if text[0] in l and text[1] in l:
                res.append(l)
    
        return res

    # Return Type: [Data List]
    def ParseData(self, before_conf_UI_path, after_conf_UI_path):
        '''1. Parse the data (texts) from the snapshot UI add and delete
        2. compare with crateria table to get the similarities, get sensitive added and deleted data
        3. todo: consider the data ownership'''
        path = os.path.dirname(os.path.abspath(__file__)) + "/criterias.json"
        data = self.LoadCriterias(path)

        # ui_add_texts, ui_delete_texts, ui_change_texts
        snapshot_add, snapshot_delete = self.ParseSnapshotChanges(before_conf_UI_path, after_conf_UI_path) # todo

        privacy_additions, privacy_deletions, privacy_changes = [], [], []
        shared_additions, shared_deletions, shared_changes = [], [], []
        privacy_diff = [privacy_additions, privacy_deletions, privacy_changes]
        shared_diff = [shared_additions, shared_deletions, shared_changes]

        # update structure of data
        for data_type in data:
            if data_type == "privacy_sensitive_data":
                for pri_data in data[data_type]:
                    privacy_additions = [*privacy_additions, *self.compare_textList_similarity(snapshot_add, pri_data)]
                    privacy_deletions = [*privacy_deletions, *self.compare_textList_similarity(snapshot_delete, pri_data)]
                    # privacy_changes = [*privacy_changes, *compare_textList_similarity(ui_change_texts, pri_data)]

            elif data_type == "Shared Data":
                for shared_data in data[data_type]:
                    match shared_data:
                        case "user list":
                            shared_additions = [*shared_additions,  *self.get_textList_contains(snapshot_add, data[data_type][shared_data])]
                            shared_deletions = [*shared_deletions,  *self.get_textList_contains(snapshot_delete, data[data_type][shared_data])]
                            # shared_changes = [*shared_changes,  *get_textList_contains(ui_change_texts, data[data_type]  [shared_data])]
                        case "control ways" | "activity logs":
                            for s_d in data[data_type][shared_data]:
                                shared_additions = [*shared_additions,  *self.compare_textList_similarity(snapshot_add, s_d)]
                                shared_deletions = [*shared_deletions,  *self.compare_textList_similarity(snapshot_delete, s_d)]
                                # shared_changes = [*shared_changes,  *compare_textList_similarity(ui_change_texts, s_d)]

        # bug: can not recognize the privacy sensitive data as a category
        # for example: +1 800-xxx-xxxx is a phone number, but the model can not     recognize it as a phone number

        # algorithm: too simple and slow, need to improve

        return [privacy_diff, shared_diff]
    
    def ParseDevice(self, device_path):
        data = dict() # key: configuration, value: effects(add, delete, change)
        conf_UI_path = device_path + "guest/Confiot/UI"
        conf_dirs = self.get_dirs(conf_UI_path)
        for conf_dir in conf_dirs:
            before_conf_UI_path = conf_UI_path + "/" + conf_dir
            after_conf_UI_path = conf_UI_path + "/" + conf_dirs[conf_dirs.index(conf_dir) + 1]
            output_path = device_path + "guest/Confiot/Comparation/UIHierarchy/" + conf_dir + "_to_" + conf_dirs[conf_dirs.index(conf_dir) + 1]

            data[conf_dir] = self.ParseData(before_conf_UI_path, after_conf_UI_path, output_path)

        return data

    # Report the Confiot Chaoses
    def IdnetifyConfiot(self, device_output, criteria_table, capablity_list, data_list):

        # Rules for excessive capablities
        pass

        # Rules for different data
        # Data = {
        #     "Privacy": {},
        #     "User-entitled": {}
        # }
        # if mode == "device":
        data = self.ParseDevice(device_output)
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

