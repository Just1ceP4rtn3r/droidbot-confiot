import os, sys
import json

import os, re, difflib, json, pickle, argparse  # clean_text
from bs4 import BeautifulSoup
import xml.dom.minidom
from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.ConfiotHunter.UIComparator import UIComparator
from Confiot_main.ConfigurationParser.ConfigurationParser import ConfigurationParser
from Confiot_main.settings import settings
from Confiot_main.ConfiotHunter.TestingPhase import Phase
from Confiot_main.ConfiotHunter.UIChanges import *
from Confiot_main.utils.util import query_Confiot_identification

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import requests
from transformers import pipeline


class ConfiotOracle:

    def __init__(self) -> None:
        self.stage = Phase.Initilization
        # {"page-0": (File_dir, UIchanges)}
        self.UIChanges = None

    def LoadCriterias(self, privacy_sensitive_data_path):
        # Load the data from the PKL file
        with open(privacy_sensitive_data_path, "r") as f:
            data = json.load(f)
        return data

    def ParseUIChanges(self, xml_old: str, xml_new: str, output: str):
        comparator = UIComparator()
        if not os.path.exists(xml_old) or not os.path.exists(xml_new):
            print("[DBG]: Do not found files:", xml_old, xml_new)
            return None
        comparator.compare_xml_files(xml_old, xml_new, output)

        UI_old = xml_old
        UI_new = xml_new
        hierachy_compare_result = output

        # if (not UI_old and UI_new):
        #     # 如果没UI_old is None，代表UI_new为刚刚delegation后的UI

        if not UI_old or not UI_new:
            print("[ERR]: Do not found files:", UI_old, UI_new)
            return None
        if not os.path.exists(UI_old) or not os.path.exists(UI_new):
            print("[ERR]: Do not found files:", UI_old, UI_new)
            return None

        comparator.compare_xml_files(UI_old, UI_new, hierachy_compare_result)

        UI_add = comparator.get_UI_add(hierachy_compare_result)
        UI_delete = comparator.get_UI_delete(hierachy_compare_result)

        # todo: add UI_changes
        print(UI_add, UI_delete)
        return UI_add, UI_delete

    def ParseSnapshotChanges(self, snapshot_old: str, snapshot_new: str):
        """After doing a configuration, we need to compare the snapshot (contains all xml files) changes."""
        # todo: consider xml files align to get aligned xml paris (xml old and xml new)
        # snapshot_old: /Users/tracy/workspace/projects/ConfioT/usenix-output/mihome/guest/Confiot/Comparation/UIHierarchy/000
        # output: /Users/tracy/workspace/projects/ConfioT/usenix-output/mihome/guest/Confiot/Comparation/UIHierarchy/Comparation/000_to_001
        for root, dirs, files in os.walk(snapshot_old):
            xml_pairs = []
            for file in files:
                if file.endswith(".xml"):
                    xml_pairs.append(
                        (
                            os.path.join(snapshot_old, file),
                            os.path.join(snapshot_new, file),
                        )
                    )
        snapshot_add, snapshot_delete = [], []
        for file in xml_pairs:
            output = os.path.join(
                settings.Static_comparation_output,
                os.path.basename(snapshot_old)
                + "_to_"
                + os.path.basename(snapshot_new)
                + ".html",
            )

            if not os.path.exists(
                settings.Static_comparation_output
            ):
                os.mkdir(
                    settings.Static_comparation_output
                )

            result = self.ParseUIChanges(file[0], file[1], output)
            if result:
                UI_add, UI_delete = result
                snapshot_add.append(UI_add)
                snapshot_delete.append(UI_delete)

        return snapshot_add, snapshot_delete

    # Return Type: [Configuration List, "str", ...]
    def ParseCapabilities(self, configurationparser: ConfigurationParser):
        # Load capablities criteria from the file
        # with open("criterias.json") as f:
        #     capab = json.load(f)
        #     pass

        # 解析UI changes为capablities
        Add_capabilities = []
        Delete_capabilities = []

        operation_configuration_mapping = (
            configurationparser.operation_configuration_mapping
        )
        if self.stage == Phase.AfterDelegation:
            for page in operation_configuration_mapping:
                for caps in operation_configuration_mapping[page]:
                    Add_capabilities.append(caps)

        else:
            for page in self.UIChanges:
                pass
        # 比较criteria 与changed capablities
        pass

    def compare_similarity(self, text1, text2):
        """Compare the similarity between two texts"""
        # 1. Tokenization: load the BERT tokenizer
        tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
        model = BertModel.from_pretrained("bert-base-uncased")

        # Tokenize the texts
        # Done: consider adding [CLS] and [SEP] tokens
        tokens1 = tokenizer.tokenize(text1)
        tokens2 = tokenizer.tokenize(text2)

        # 2. Encoding texts: convert tokens to input IDs
        input_id1 = torch.tensor(tokenizer.convert_tokens_to_ids(tokens1)).unsqueeze(
            0
        )  # Batch size 1
        input_id2 = torch.tensor(tokenizer.convert_tokens_to_ids(tokens2)).unsqueeze(
            0
        )  # Batch size 1

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

    def compare_textList_similarity(self, list, text):
        res = []
        for l in list:
            sim = self.compare_similarity(l, text)
            if sim > 0.5:
                res.append({l: [sim, text]})
        return res

    # def get_textList_contains(self, list, text):
    #     res = []
    #     for l in list:
    #         l = [t.lower() for t in l]
    #         if text[0] in l and text[1] in l:
    #             res.append([l, text])

    #     return res

    def get_clean_text(self, text):
        if type(text) == str:
            return text.replace("\xa0", " ")
        else:
            return str(text).replace("\xa0", " ")

    def GetTexts(self, snapshot_change):
        texts = []
        for page in snapshot_change:
            if page == []:
                continue
            for item in page:
                element = item["element"]
                if "<text>" in element:
                    try:
                        text = re.findall(r"<text>(.*?)</text>", element)[0]
                        texts.append(self.get_clean_text(text))
                    except:
                        continue
        return texts

    def GetValueGPT(self, snapshot_change, privacy_texts, llm="xxx"):
        from pydantic import BaseModel
        from openai import OpenAI
        # api_key = os.environ.get("OPENAI_API_KEY")
        # headers = {
        #     "Content-Type": "application/json",
        #     "Authorization": f"Bearer {api_key}",
        # }

        if(llm == "deepseek"):
            client = OpenAI(
                # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
                api_key=os.getenv("DEEPSEEK_API_KEY"),  # 如何获取API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
                base_url="https://api.deepseek.com"
            )


            completion = client.chat.completions.create(
                model="deepseek-chat",  # 此处以 deepseek-r1 为例，可按需更换模型名称。
                messages=[
                    {
                        "role": "system",
                        "content": "You are an privacy assistant tasked with parsing texts that extracted from IoT companion mobile apps. For provided privacy related texts, please identify corresponding privacy data in given list of texts. Notably, if you think the provided privacy text is not related to privacy, please ignore it, You will be provided with several examples containing data types and related values. Then given some texts containing data types, please identify related values. If you do not find any privacy data, return 'contains_privacy_data: 0, privacy_data: \"\"'. Else, return 'contains_privacy_data: 1, privacy_data: \"some data\"'.",
                    },
                    {
                        "role": "user",
                        "content": f"Here are some possible inputs. Evaluate the following texts:  ['my phone number is +1-123-456-7890', 'guest\'s email is abc@test.com', 'user home address: 1234 Main St, Springfield, IL 62701'm 'time for bed is 12:00 AM']. The privacy words in the texts are: ['phone number', 'email', 'address', 'time'].",
                    },
                    {   "role": "assistant",
                        "content": "contains_privacy_data: 1, privacy_data: [\"+1-123-456-7890\", \"abc@test.com\", \"1234 Main St, Springfield, IL 62701\", \"12:00 AM\"]",
                    },
                    {
                        "role": "user",
                        "content": f"Evaluate the following texts: {snapshot_change}. The privacy words in the texts are: {privacy_texts}.",
                    },
                ],
            )

            print("[RESULT]: ", completion.choices[0].message.content)

        elif(llm == "qwen"):
            client = OpenAI(
                # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
                api_key=os.getenv("QWEN_API_KEY"),  # 如何获取API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
                base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
            )


            completion = client.chat.completions.create(
                model="qwen2.5-vl-32b-instruct",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an privacy assistant tasked with parsing texts that extracted from IoT companion mobile apps. For provided privacy related texts, please identify corresponding privacy data in given list of texts. Notably, if you think the provided privacy text is not related to privacy, please ignore it, You will be provided with several examples containing data types and related values. Then given some texts containing data types, please identify related values. If you do not find any privacy data, return 'contains_privacy_data: 0, privacy_data: \"\"'. Else, return 'contains_privacy_data: 1, privacy_data: \"some data\"'.",
                    },
                    {
                        "role": "user",
                        "content": f"Here are some possible inputs. Evaluate the following texts:  ['my phone number is +1-123-456-7890', 'guest\'s email is abc@test.com', 'user home address: 1234 Main St, Springfield, IL 62701'm 'time for bed is 12:00 AM']. The privacy words in the texts are: ['phone number', 'email', 'address', 'time'].",
                    },
                    {   "role": "assistant",
                        "content": "contains_privacy_data: 1, privacy_data: [\"+1-123-456-7890\", \"abc@test.com\", \"1234 Main St, Springfield, IL 62701\", \"12:00 AM\"]",
                    },
                    {
                        "role": "user",
                        "content": f"Evaluate the following texts: {snapshot_change}. The privacy words in the texts are: {privacy_texts}.",
                    },
                ],
            )

            print("[RESULT]: ", completion.choices[0].message.content)

        else:


            class privacyFormat(BaseModel):
                contains_privacy_data: bool
                privacy_data: list[str]

            class response(BaseModel):
                privacy: privacyFormat

            client = OpenAI()
            # client.api_key = api_key
            completion = client.beta.chat.completions.parse(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an privacy assistant tasked with parsing texts that extracted from IoT companion mobile apps. For provided privacy related texts, please identify corresponding privacy data in given list of texts. Notably, if you think the provided privacy text is not related to privacy, please ignore it, You will be provided with several examples containing data types and related values. Then given some texts containing data types, please identify related values. If you do not find any privacy data, return 'contains_privacy_data: 0, privacy_data: \"\"'. Else, return 'contains_privacy_data: 1, privacy_data: \"some data\"'.",
                    },
                    {
                        "role": "user",
                        "content": f"Here are some possible inputs. Evaluate the following texts:  ['my phone number is +1-123-456-7890', 'guest\'s email is abc@test.com', 'user home address: 1234 Main St, Springfield, IL 62701'm 'time for bed is 12:00 AM']. The privacy words in the texts are: ['phone number', 'email', 'address', 'time'].",
                    },
                    {   "role": "assistant",
                        "content": "contains_privacy_data: 1, privacy_data: [\"+1-123-456-7890\", \"abc@test.com\", \"1234 Main St, Springfield, IL 62701\", \"12:00 AM\"]",
                    },
                    {
                        "role": "user",
                        "content": f"Evaluate the following texts: {snapshot_change}. The privacy words in the texts are: {privacy_texts}.",
                    },
                ],
                response_format=response,
                # max_tokens=500,
            )

            # response = requests.post(
            #     "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
            # )

            result = completion.choices[0].message.parsed
            # response.json().get("choices")[0].get("message").get("content")
            # print(type(result.privacy))
            if result.privacy.contains_privacy_data:
                return result.privacy.privacy_data
            else:
                return ""
        api_key = os.environ.get("OPENAI_API_KEY")
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        }

        payload = {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You are an privacy assistant tasked with parsing texts that extracted from IoT companion mobile apps. For provided privacy related texts, please identify corresponding privacy data in given list of texts. You will be provided with several examples containing data types and related values. Then given some texts containing data types, please identify related values. If you do not find any privacy data, do not contain the texts. ",
                },
                {
                    "role": "user",
                    "content": f"Here are some examples. The value to 'phone number' can be '+1-123-456-7890', '(555) 555-1234', '456-7890'. The value to 'email' can be 'john@businessname.com', 'abc@test.com'. The value to 'address' can be '1234 Main St, Springfield, IL 62701', '1234 Main St, Springfield, IL'. The value to 'time' can be '12:30 PM', '3:00 AM'.",
                },
                {
                    "role": "user",
                    "content": f"Evaluate the following texts: {snapshot_change}.",
                },
            ],
            "max_tokens": 500,
        }
        response = requests.post(
            "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
        )

        result = response.json().get("choices")[0].get("message").get("content")
        print(result)
        return result

    def GetBelonging(
        self, privacy_data, snapshot_change, related_pages, current_user_id
    ):
        api_key = os.environ.get("OPENAI_API_KEY")
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        }

        payload = {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You are an privacy assistant tasked with parsing texts that extracted from IoT companion mobile apps. For provided privacy related texts, please identify corresponding privacy data in given list of texts. You will be provided with several examples containing data types and related values. Then given some texts containing data types, please identify related values. If you do not find any privacy data, do not contain the texts. ",
                },
                {
                    "role": "user",
                    "content": f"Here are some examples. The value to 'phone number' can be '+1-123-456-7890', '(555) 555-1234', '456-7890'. The value to 'email' can be 'john@businessname.com', 'abc@test.com'. The value to 'address' can be '1234 Main St, Springfield, IL 62701', '1234 Main St, Springfield, IL'. The value to 'time' can be '12:30 PM', '3:00 AM'.",
                },
                {
                    "role": "user",
                    "content": f"Evaluate the following texts: {snapshot_change}.",
                },
            ],
            "max_tokens": 500,
        }
        response = requests.post(
            "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
        )

        result = response.json().get("choices")[0].get("message").get("content")
        print(result)
        return result

    def GetBelongingGPT(
        self, privacy_data, snapshot_change, related_pages, current_user_id
    ):
        from pydantic import BaseModel
        from openai import OpenAI
        # api_key = os.environ.get("OPENAI_API_KEY")
        # headers = {
        #     "Content-Type": "application/json",
        #     "Authorization": f"Bearer {api_key}",
        # }
        class privacyFormat(BaseModel):
            contains_privacy_belonging: bool
            privacy_belonging: str

        class response(BaseModel):
            privacy: privacyFormat

        client = OpenAI()
        completion = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are an privacy assistant tasked with parsing texts that extracted from IoT companion mobile apps. For provided privacy data, please identify corresponding privacy data belongings. You will be provided with some texts examples that contains possible privacy data belonging patterns. If you do not find any belongings to the given privacy data, return 'contains_privacy_belonging: 0, privacy_belonging: \"\"'. ",
                },
                {
                    "role": "user",
                    "content": f"Here are some examples. 'UserA's phone number' means that 'phone number' belongs to 'userA'. ",
                },
                {
                    "role": "user",
                    "content": f"Please find the belongings to data: {privacy_data} in the following texts: {snapshot_change}. You may also find some clues in the current page or the previous page texts: {related_pages}. The current other user IDs are: {current_user_id}.",
                }
            ],
            response_format=response,
            max_tokens=500,
        )

        # response = requests.post(
        #     "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
        # )

        result = completion.choices[0].message.parsed
        # response.json().get("choices")[0].get("message").get("content")
        if result.privacy.contains_privacy_belonging:
            return result.privacy.privacy_belonging
        else:
            return ""

    # Return Type: [Data List]
    def ParsePrivacyData(self, snapshot_old, snapshot_new, id):
        """1. Parse the data (texts) from the snapshot UI add and delete
        2. compare with crateria table to get the similarities, get sensitive added and deleted data
        3. todo: consider the data ownership"""

        # 1. get texts from snapshot changes
        snapshot_add, snapshot_delete = self.ParseSnapshotChanges(
            snapshot_old, snapshot_new
        )
        snapshot_add_texts = self.GetTexts(snapshot_add)
        snapshot_delete_texts = self.GetTexts(snapshot_delete)

        privacy_additions, privacy_deletions, privacy_changes = [], [], []
        privacy_diff = [privacy_additions, privacy_deletions]

        # 2. Given each texts add/delete/change, use 3 solutions to justify whether it is a privacy sensitive data
        # solution 1: compare similarity between the data and the criteria table
        # for data_type in criteria:
        #     if data_type == "Privacy Data":
        #         for pri_data in criteria[data_type]:
        #             privacy_additions = [
        #                 *privacy_additions,
        #                 *self.compare_textList_similarity(snapshot_add_texts, pri_data),
        #             ]
        #             privacy_deletions = [
        #                 *privacy_deletions,
        #                 *self.compare_textList_similarity(
        #                     snapshot_delete_texts, pri_data
        #                 ),
        #             ]
        # privacy_changes = [*privacy_changes, *compare_textList_similarity(ui_change_texts, pri_data)]

        # solution 2: use the fine-tuned BERT model to classify the data
        # for t in snapshot_add_texts:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_dir = os.path.join(current_dir, "model/fine_tuned_bert")
        model = AutoModelForSequenceClassification.from_pretrained(model_dir)
        tokenizer = AutoTokenizer.from_pretrained(model_dir)
        device = (
            torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
        )
        model.to(device)

        if snapshot_add_texts + snapshot_delete_texts == []:
            return [], []
        encodings = tokenizer(
            snapshot_add_texts + snapshot_delete_texts,
            truncation=True,
            max_length=10,
            padding=True,
            return_tensors="pt",
        )  # map to IDs and tensors
        encodings = {
            key: val.to(device) for key, val in encodings.items()
        }  # map to device format tensors

        model.eval()  # use the model in evaluation mode (rather than training mode)

        # Perform inference
        with torch.no_grad():  # no need to calculate gradients, make it faster
            outputs = model(**encodings)
            logits = outputs.logits  # raw scores
        predictions = torch.argmax(
            logits, dim=-1
        )  # convert raw scores to predicted class label

        # Print the predictions
        snapshot_privacy_add = []
        snapshot_privacy_delete = []
        privacy_texts = []
        for text, pred in zip(snapshot_add_texts + snapshot_delete_texts, predictions):
            if pred.item() == 1:
                label = "Privacy-related"
                if text not in privacy_texts:
                    privacy_texts.append(text)
                if text in snapshot_add_texts:
                    snapshot_privacy_add.append(text)
                else:
                    snapshot_privacy_delete.append(text)
            else:
                label = "Non-privacy-related"
            print(f"UI text changes: '{text}' => Prediction: {label}")

            print("Privacy-related texts: ", privacy_texts)

        # test data -> need to be replaced by the real data
        # snapshot_privacy_add = [
        #     "host's sleeping time is 10:00 PM",
        #     "phone number is +1-123-456-7890",
        # ]
        # privacy_texts.append("phone number")
        # privacy_texts.append("sleeping time")

        # 3. Given each snapshot change, if there are privacy changes, get the privacy data
        # e.g., phone number, email, address, time, etc. +1 800-xxx-xxxx is a phone number
        # e.g., age, heart rate, blood pressure, etc. 25 is an age
        privacy_data = self.GetValueGPT(snapshot_privacy_add + snapshot_privacy_delete, privacy_texts)

        # 4. Given the privacy data, find the belonging
        belongings = None
        # belongings = self.GetBelongingGPT(
        #     privacy_data, snapshot_privacy_add + snapshot_privacy_delete, [], id
        # )

        return privacy_data, belongings

    def ParseSharedData(self, snapshot_old: str, snapshot_new: str):
        # elif data_type == "Shared Data":
        #     for shared_data in data[data_type]:
        #         match shared_data:
        #             case "user list":
        #                 shared_additions = [*shared_additions,  *self.get_textList_contains(snapshot_add, data[data_type][shared_data])]
        #                 shared_deletions = [*shared_deletions,  *self.get_textList_contains(snapshot_delete, data[data_type][shared_data])]
        #                 # shared_changes = [*shared_changes,  *get_textList_contains(ui_change_texts, data[data_type]  [shared_data])]
        #             case "control ways" | "activity logs":
        #                 for s_d in data[data_type][shared_data]:
        #                     shared_additions = [*shared_additions,  *self.compare_textList_similarity(snapshot_add, s_d)]
        #                     shared_deletions = [*shared_deletions,  *self.compare_textList_similarity(snapshot_delete, s_d)]
        #                     # shared_changes = [*shared_changes,  *compare_textList_similarity(ui_change_texts, s_d)]
        pass

    def ParseDeviceSnapshots(self, droidbot_output):
        data = dict()  # key: configuration, value: effects(add, delete, change)
        conf_UI_path = droidbot_output + "/Confiot/UI"
        conf_dirs = self.get_dirs(conf_UI_path)
        for conf_dir in conf_dirs:
            before_conf_UI_path = conf_UI_path + "/" + conf_dir
            after_conf_UI_path = (
                conf_UI_path + "/" + conf_dirs[conf_dirs.index(conf_dir) + 1]
            )
            output_path = (
                droidbot_output
                + "guest/Confiot/Comparation/UIHierarchy/"
                + conf_dir
                + "_to_"
                + conf_dirs[conf_dirs.index(conf_dir) + 1]
            )

            data[conf_dir] = self.ParseData(
                before_conf_UI_path, after_conf_UI_path, output_path
            )

        return data

    def GetSnapshotPair(self, confiot_output):
        snapshot_dir = os.path.join(confiot_output, "Comparation/UIHierarchy")
        dirs = sorted(
            [
                d
                for d in os.listdir(snapshot_dir)
                if os.path.isdir(os.path.join(snapshot_dir, d))
            ]
        )
        pairs = [(dirs[i], dirs[i + 1]) for i in range(len(dirs) - 1)]

        return pairs

    # Report the Confiot Chaoses
    def IdnetifyConfiot(self, confiot_output, id):
        # Rules for excessive capablities
        # pass

        # Rules for different data
        # Data = {
        #     "Privacy": {},
        #     "User-entitled": {}
        # }

        # 1. Load the criteria table
        path = os.path.dirname(os.path.abspath(__file__)) + "/criterias.json"
        criteria = self.LoadCriterias(path)

        confiot_pairs = self.GetSnapshotPair(confiot_output)

        for old, new in confiot_pairs:
            snapshot_old = os.path.join(confiot_output, "Comparation/UIHierarchy", old)
            snapshot_new = os.path.join(confiot_output, "Comparation/UIHierarchy", new)

            # 2. Parse the data (texts) from the snapshot UI add and delete
            # ui_add_texts, ui_delete_texts, todo: ui_change_texts
            # snapshot_old, snapshot_new = self.ParseDeviceSnapshots(droidbot_output) # todo
            # snapshot_add, snapshot_delete = self.ParseSnapshotChanges(snapshot_old, snapshot_new)
            privacy_data, belongings = self.ParsePrivacyData(
                snapshot_old, snapshot_new, id
            )
            privacy_warning = []

            for items in criteria:
                if "privacy" in items["Capabilities"]:
                    if "Should not view" in items["Capabilities"]:
                        if privacy_data:
                            privacy_warning.append(
                                f"Privacy data violation - {privacy_data} "
                            )
                            print(
                                f"Privacy data violation - {privacy_data} "
                            )
                        if belongings:
                            privacy_warning.append(
                                f"Privacy belonging violation - {belongings}! "
                            )
                            print(
                                f"Privacy belonging - {belongings}! "
                            )
                    else:
                        pass
            if not os.path.isdir(os.path.join(confiot_output, "privacy_violation")):
                os.makedirs(os.path.join(confiot_output, "privacy_violation"))
            with open(
                os.path.join(
                    confiot_output,
                    "privacy_violation",
                    f"privacy_violation_{old}_to_{new}.txt",
                ),
                "w",
            ) as f:
                f.write(str(privacy_warning))

        # for conf_dir in data:
        #     if len(data[conf_dir]) == 2:
        #         [privacy_diff, shared_diff] = data[conf_dir]
        #         if len(privacy_diff) == 3:
        #             [privacy_additions, privacy_deletions, privacy_changes] = (
        #                 privacy_diff
        #             )
        #         else:
        #             raise Exception("The data structure is not correct.")
        #         if len(shared_diff) == 3:
        #             [shared_additions, shared_deletions, shared_changes] = shared_diff
        #         else:
        #             raise Exception("The data structure is not correct.")
        #         # violations
        #         if shared_deletions:
        #             Warning(
        #                 "Insecure configuration: should view shared data! ",
        #                 conf_dir,
        #                 shared_additions,
        #             )
        #         if shared_additions:
        #             print(
        #                 "Secure configuration: can view shared data. ",
        #                 conf_dir,
        #                 shared_additions,
        #             )
        # if privacy_deletions: # consider ownership
        #     Warning("Privacy sensitive data is deleted! ", conf_dir, privacy_deletions)


class ConfigurationConfiotOracle(ConfiotOracle):

    def __init__(self, Agent) -> None:
        super().__init__()

        self.Agent = Agent
        self.CP = ConfigurationParser(self.Agent)
        self.proceed_configuration = ""

    def LoadCriterias(
        self,
        role="all",
        Configuration_criteria=os.path.dirname(os.path.abspath(__file__))
        + "/ConfigurationCriteria.json",
    ):
        # Load the data from the PKL file
        criteria = {"Criteria":[]}
        _cri = {}
        with open(Configuration_criteria, "r") as f:
            _cri = json.load(f)

        if(role != "all"):
            for c in _cri["Criteria"]:
                if role in c["Role"]:
                    criteria["Criteria"].append(c)
        else:
            criteria = _cri

        return criteria

    def LoadUIChanges(self, last_task, task):
        self.proceed_configuration = task
        # 表示当前是after delegation的阶段
        if last_task is None or task == "000":
            return -1

        xml_old_dir = settings.UIHierarchy_comparation_output + f"/{last_task}/"
        xml_new_dir = settings.UIHierarchy_comparation_output + f"/{task}/"

        pages_in_old_dir = [
            f.replace(".xml", "")
            for f in os.listdir(xml_old_dir)
            if "Page" in f and f.endswith(".xml")
        ]
        pages_in_new_dir = [
            f.replace(".xml", "")
            for f in os.listdir(xml_new_dir)
            if "Page" in f and f.endswith(".xml")
        ]

        # 取交集
        pages = list(set(pages_in_old_dir).intersection(set(pages_in_new_dir)))
        UIChanges = {}

        for page in pages:
            xml_old = xml_old_dir + page + ".xml"
            xml_new = xml_new_dir + page + ".xml"
            output = (
                settings.UIHierarchy_comparation_output + f"/{last_task}_to_{task}/"
            )

            UIChanges[page] = UIChangeParser(
                page, xml_old, xml_new
            ).identify_change_type()

        _tmp = UIChanges.copy()
        for page in _tmp:
            if UIChanges[page] == []:
                UIChanges.pop(page)
        return UIChanges

    # [TODO]: 添加对于LLM configuration种Dependency的解析
    def LoadConfigurations(self, LLMResult_dir):
        # 得到Configuration, related_operations

        # "Task...": [op_id, ..]
        configurations = {}

        page_worklist = {}

        for node in ConfigurationParser(self.Agent).page_navigation_graph.nodes:
            page_worklist[node.name] = node.level

        # 根据node.level，从小到大排序
        page_worklist = dict(
            sorted(page_worklist.items(), key=lambda item: item[1], reverse=False)
        )

        completed_pages = set()
        for page in page_worklist:
            if not os.path.exists(LLMResult_dir + f"/{page}/Configurations.json"):
                continue
            if page in completed_pages:
                continue
            with open(LLMResult_dir + f"/{page}/Configurations.json") as f:
                tasks = json.load(f)
                # 可能包含来自child pages的tasks
                for t in tasks:
                    try:
                        page_id = t["Page ID"]
                        task_content = t["Tasks"]
                        related_operations = []

                        page_id = "Page-" + "".join(re.findall(r"\d", page_id))

                        for o in t["Related operations"]:
                            digits = re.findall(r"\d", o)
                            related_operations.append(int("".join(digits)))
                        if page_id not in configurations:
                            configurations[page_id] = {}
                        if (
                            task_content == "None"
                            or task_content == ""
                            or not task_content
                            or not related_operations
                        ):
                            continue
                        configurations[page_id][task_content] = related_operations
                        completed_pages.add(page_id)
                    except:
                        print(
                            "[ERR]: wrong structure of the configuration file ",
                            LLMResult_dir + f"{page}/Configurations.json",
                        )
                        continue
        return configurations

    # Criteria: JSON
    # Configurations: {"Page-0": {"Task Content": [op_id, ...]}}
    # UIChanges: {"Page-0": [ConfiotHunter.SpecificUIChange, ...]}
    def IdentifyConfiot(
        self, TestingPhase, Criteria, Configurations, UIChanges, Role, outputdir
    ):
        if not os.path.exists(outputdir):
            os.makedirs(outputdir)

        AfterDelegation_system_template = ""
        AfterDelegation_user_template = ""
        DuringUsage_system_template = ""
        DuringUsage_user_template = ""
        AfterRevocation_system_template = ""
        AfterRevocation_user_template = ""
        PageUIChange_template = ""
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        with open(
            BASE_DIR + "/../prompt/IdentifyCapabilityConfiot/AfterDelegation_system.txt"
        ) as f:
            AfterDelegation_system_template = f.read()
        with open(
            BASE_DIR + "/../prompt/IdentifyCapabilityConfiot/AfterDelegation_user.txt"
        ) as f:
            AfterDelegation_user_template = f.read()

        with open(
            BASE_DIR + "/../prompt/IdentifyCapabilityConfiot/AfterRevocation_system.txt"
        ) as f:
            AfterRevocation_system_template = f.read()
        with open(
            BASE_DIR + "/../prompt/IdentifyCapabilityConfiot/AfterRevocation_user.txt"
        ) as f:
            AfterRevocation_user_template = f.read()


        with open(
            BASE_DIR + "/../prompt/IdentifyCapabilityConfiot/DuringUsage_system.txt"
        ) as f:
            DuringUsage_system_template = f.read()
        with open(
            BASE_DIR + "/../prompt/IdentifyCapabilityConfiot/DuringUsage_user.txt"
        ) as f:
            DuringUsage_user_template = f.read()
        with open(
            BASE_DIR + "/../prompt/IdentifyCapabilityConfiot/PageUIChange.txt"
        ) as f:
            PageUIChange_template = f.read()

        system_prompt = ""
        user_prompt = ""
        # After Delegation
        if TestingPhase == Phase.AfterDelegation and UIChanges == -1:
            system_prompt = AfterDelegation_system_template

            config_strs = []
            cid = 0
            for page in Configurations:
                for c in Configurations[page]:
                    if c != "" and c != "None":
                        config_strs.append(f"({cid}) " + c)
                        cid += 1

            user_prompt = AfterDelegation_user_template.replace(
                "{{CONFIG}}", "\n".join(config_strs)
            )
            user_prompt = user_prompt.replace("{{ROLE}}", Role)

            user_prompt = user_prompt.replace("{{CRITERIA}}", str(Criteria))
        elif TestingPhase == Phase.DuringUsage:
            if len(UIChanges) == 0:
                print("[DBG]: Skip because no UI changes")
                return
            system_prompt = DuringUsage_system_template
            user_prompt = DuringUsage_user_template.replace("{{ROLE}}", Role)
            user_prompt = user_prompt.replace("{{CRITERIA}}", str(Criteria))
            page_ui_changes_str = []

            for changed_page in UIChanges:
                _prompt = PageUIChange_template

                if not os.path.exists(
                    settings.LLMConfiguration_output + f"/{changed_page}"
                ):
                    continue
                with open(
                    settings.LLMConfiguration_output + f"/{changed_page}/PageInfo.txt",
                    "r",
                ) as f:
                    page_info = f.read()

                _prompt = _prompt.replace("{{PAGEINFO}}", page_info)

                operation_changes = {
                    "Add": [],
                    "Delete": [],
                    "Add_str": [],
                    "Delete_str": [],
                }

                for uichange in UIChanges[changed_page]:
                    if isinstance(uichange, OperationChange):
                        if uichange.add_or_delete == SpecificUIChange.ADD:
                            operation_changes["Add"].append(uichange.operation)
                            operation_changes["Add_str"].append(
                                uichange.operation["op_str"] if "op_str" in uichange.operation else str(uichange.operation["op_text"])
                            )
                        else:
                            operation_changes["Delete"].append(uichange.operation)
                            operation_changes["Delete_str"].append(
                                uichange.operation["op_str"] if "op_str" in uichange.operation else str(uichange.operation["op_text"])
                            )

                _change_details_str = ""
                if operation_changes["Add"]:
                    _change_details_str += (
                        "* Add text/Operations:\n"
                        + "\n".join(operation_changes["Add_str"])
                        + "\n"
                    )
                if operation_changes["Delete"]:
                    _change_details_str += (
                        "* Delete text/Operations:\n"
                        + "\n".join(operation_changes["Delete_str"])
                        + "\n"
                    )

                _prompt = _prompt.replace("{{PAGEUICHANGE}}", _change_details_str)
                page_ui_changes_str.append(_prompt)

            user_prompt = user_prompt.replace(
                "{{UICHANGE}}", "\n".join(page_ui_changes_str)
            )

        elif TestingPhase == Phase.AfterRevocation:
            system_prompt = AfterRevocation_system_template
            user_prompt = AfterRevocation_user_template
            page_ui_changes_str = []

            if len(UIChanges) == 0:
                user_prompt = user_prompt.replace(
                    "{{UICHANGE}}", "No UI changes!\n"
                )
            else:
                for changed_page in UIChanges:
                    _prompt = PageUIChange_template

                    if not os.path.exists(
                        settings.LLMConfiguration_output + f"/{changed_page}"
                    ):
                        continue
                    with open(
                        settings.LLMConfiguration_output + f"/{changed_page}/PageInfo.txt",
                        "r",
                    ) as f:
                        page_info = f.read()

                    _prompt = _prompt.replace("{{PAGEINFO}}", page_info)

                    operation_changes = {
                        "Add": [],
                        "Delete": [],
                        "Add_str": [],
                        "Delete_str": [],
                    }

                    for uichange in UIChanges[changed_page]:
                        if isinstance(uichange, OperationChange):
                            if uichange.add_or_delete == SpecificUIChange.ADD:
                                operation_changes["Add"].append(uichange.operation)
                                operation_changes["Add_str"].append(
                                    uichange.operation["op_str"] if "op_str" in uichange.operation else str(uichange.operation["op_text"])
                                )
                            else:
                                operation_changes["Delete"].append(uichange.operation)
                                operation_changes["Delete_str"].append(
                                    uichange.operation["op_str"] if "op_str" in uichange.operation else str(uichange.operation["op_text"])
                                )

                    _change_details_str = ""
                    if operation_changes["Add"]:
                        _change_details_str += (
                            "* Add text/Operations:\n"
                            + "\n".join(operation_changes["Add_str"])
                            + "\n"
                        )
                    if operation_changes["Delete"]:
                        _change_details_str += (
                            "* Delete text/Operations:\n"
                            + "\n".join(operation_changes["Delete_str"])
                            + "\n"
                        )

                    _prompt = _prompt.replace("{{PAGEUICHANGE}}", _change_details_str)
                    page_ui_changes_str.append(_prompt)

                user_prompt = user_prompt.replace(
                    "{{UICHANGE}}", "\n".join(page_ui_changes_str)
                )

            activiy = ""
            if os.path.exists(settings.violation_output + "/Activities.txt"):
                with open(settings.violation_output + "/Activities.txt", "r") as f:
                    activiy = f.read()

            user_prompt = user_prompt.replace(
                "{{ACTIVITY}}", activiy
            )



        res = query_Confiot_identification(
            system_prompt=system_prompt, user_prompt=user_prompt
        )

        #  gpt-4o
        try:
            violations = []
            for r in res.violations:
                violation = {
                    "Violated criterion id": r.violated_criterion_id,
                    "configuration_resource": r.configuration_resource,
                    "Reason": r.reason,
                    "Confidence_score": r.Confidence_score,
                    "Guess_steps": r.Guess_steps
                }
                violations.append(violation)

            with open(outputdir + "/raw.txt", "w") as f:
                f.write(system_prompt + user_prompt + "\n\n\n" + str(violations) + "\n")


            if not os.path.exists(settings.violation_output + "/Activities.txt"):
                with open(settings.violation_output + "/Activities.txt", "w") as f:
                    for v in res.resource_update:
                        f.write(v + "\n")
            else:
                with open(settings.violation_output + "/Activities.txt", "a") as f:
                    for v in res.resource_update:
                        f.write(v + "\n")
        except:
            # deepseek or qwen
            with open(outputdir + "/raw.txt", "w") as f:
                f.write(system_prompt + user_prompt + "\n\n\n" + res + "\n")


            if not os.path.exists(settings.violation_output + "/Activities.txt"):
                with open(settings.violation_output + "/Activities.txt", "w") as f:
                    f.write(res)
            else:
                with open(settings.violation_output + "/Activities.txt", "a") as f:
                    f.write(res)

