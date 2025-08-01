import os, sys
import json
import re


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.Confiot import Confiot
from Confiot_main.settings import settings
from Confiot_main.ConfigurationParser.OperationExtraction import OperationExtractor
from Confiot_main.utils.util import jaccard_similarity


class SpecificUIChange:
    DELETE = 0
    ADD = 1

    def __init__(self):
        self.__str__ = "SpecificUIChange"


class OperationChange(SpecificUIChange):
    def __init__(self, add_or_delete, operation):
        self.add_or_delete = add_or_delete
        self.operation = operation


class UIChangeParser:
    def __init__(self, page, xml_old, xml_new):
        self.page = page
        self.xml_old = xml_old
        self.xml_new = xml_new

        # {
        #     "op_id": 1,
        #     "op_text": '["Mi Home",]',
        #     "op_view": {},
        # }
        # 初始送给GPT的operations
        self.operations_init = []
        # 当前测试前的operations
        self.operations_old = []
        # 当前测试后的operations
        self.operations_new = []

        self.load_operations()

    # [TODO]: UI change应该能够处理新增的view，而不是仅仅在最初的operations中找
    def load_operations(self):
        page_operations_file = settings.Confiot_output + f"/Operations/{self.page}.json"
        if not os.path.exists(page_operations_file):
            print(f"[ERR]: missing file {page_operations_file}")

        # parse the operations file
        with open(page_operations_file) as f:
            operations_init = json.loads(f.read())["OPERATIONS"]
            for hash in operations_init:
                o = operations_init[hash]
                op = {
                    "op_id": o["op_id"],
                    "op_text": [tview["text"] for tview in o["op_text"]],
                    "op_view": o["op_view"],
                    "op_str": o["op_str"],
                }
                self.operations_init.append(op)

        self.operations_old = self.parse_op_from_xml(self.xml_old)
        self.operations_new = self.parse_op_from_xml(self.xml_new)

    # [TODO]: 增加更多的change type识别
    def identify_change_type(self):
        semantic_changes = []

        for target_op in self.operations_init:
            exist_in_old = self.find_op(target_op, self.operations_old)
            exist_in_new = self.find_op(target_op, self.operations_new)

            if exist_in_old is None and exist_in_new is not None:
                semantic_changes.append(
                    OperationChange(SpecificUIChange.ADD, target_op)
                )
            elif exist_in_old is not None and exist_in_new is None:
                semantic_changes.append(
                    OperationChange(SpecificUIChange.DELETE, target_op)
                )

        for new_op in self.operations_new:
            exist_in_old = self.find_op(new_op, self.operations_old)
            if exist_in_old is None:
                semantic_changes.append(
                    OperationChange(SpecificUIChange.ADD, new_op)
                )

        return semantic_changes

    # 1. 比较op_text
    # 2. 比较op_view
    def find_op(self, target_op, operation_LIST):
        Similarities = {}

        target_op_view = target_op["op_view"]
        for idx, op in enumerate(operation_LIST):
            op_view = op["op_view"]
            jaccard = jaccard_similarity(op["op_text"], target_op["op_text"])

            if (
                op_view["resource_id"] == target_op_view["resource_id"]
                and op_view["class"] == target_op_view["class"]
                and op_view["content_description"]
                == target_op_view["content_description"]
                and op_view["text"] == target_op_view["text"]
                and op_view["size"] == target_op_view["size"]
            ):
                Similarities[idx] = jaccard * 0.4 + 1 * 0.6
            else:
                Similarities[idx] = jaccard * 0.4

        # 选择最大的相似度的op
        sorted_similarities = sorted(
            Similarities.items(), key=lambda x: x[1], reverse=True
        )
        if sorted_similarities[0][1] > 0.8:
            return operation_LIST[sorted_similarities[0][0]]
        return None

    def parse_op_from_xml(self, xml):
        operations, _, hashable_views = OperationExtractor(
            page_xml_file=xml
        ).extract_operations()

        result = []
        for op in operations:
            op_view = hashable_views[op]
            op_type = op_view["class"]
            op_text = ",".join([tview[0]["text"] for tview in operations[op]])
            op_action = None
            if "select" in op_type.lower():
                op_action = "Select"
            elif "check" in op_type.lower():
                op_action = "check"
            elif "input" in op_type.lower():
                op_action = "Input"
            else:
                op_action = "Click"

            lowertext = op_text.lower()
            # popup dialog
            if (
                "cancel" in lowertext
                or "apply" in lowertext
                or "yes" in lowertext
                or "confirm" in lowertext
                or "ok" == lowertext
                or "确定" in lowertext
                or "取消" in lowertext
            ):
                op_str = f'<Confirm, Popup dialog, "{op_text}">'
            else:
                op_str = f'<{op_action}, {op_type}, "{op_text}">'

            result.append(
                {
                    "op_id": -1,
                    "op_text": [tview[0]["text"] for tview in operations[op]],
                    "op_view": op_view,
                }
            )

        return result

    # def ConfioT_sort_events(self, possible_events: [InputEvent]) -> [InputEvent]:
    #     sorted_events = []
    #     # {temp_id : (event, weight: 0-10)}
    #     weighted_events = {}

    #     views = self.current_state.views
    #     # 初始化weighted_events
    #     no_view_event_id = 888
    #     for e in possible_events:
    #         # 如果e.view存在
    #         if hasattr(e, "view"):
    #             id = e.view["temp_id"]
    #             if "ScrollView" in e.view["class"]:
    #                 sorted_events.append(e)
    #                 continue
    #             # size = e.view["size"]
    #             # length,width = size.split("*")
    #             weighted_events[id] = (e, 10)
    #         else:
    #             weighted_events[no_view_event_id] = (e, 10)
    #             no_view_event_id += 1

    #     # 记录events相关的view、parent view、grandparent view
    #     event_views = {}
    #     for id in weighted_events:
    #         e = weighted_events[id][0]
    #         if hasattr(e, "view"):
    #             id = e.view["temp_id"]
    #             current_view = e.view
    #             parent_view = None
    #             grandpa_view = None
    #             if current_view["parent"] != -1:
    #                 parent_view = views[current_view["parent"]]
    #                 # assert (parent_view["temp_id"] == current_view["parent"])
    #             if (
    #                 parent_view is not None
    #                 and parent_view["parent"] != -1
    #                 and "group" in parent_view["class"].lower()
    #             ):
    #                 grandpa_view = views[parent_view["parent"]]

    #             event_views[id] = {
    #                 "view": current_view,
    #                 "parent_view": parent_view,
    #                 "grandpa_view": grandpa_view,
    #             }

    #     ###############################
    #     # LIST Layout分析
    #     ###############################
    #     def calc_size_repeat(view_list):
    #         # key: "63*63_class.button"
    #         potential_LIST = {}
    #         for v in view_list:
    #             size = v["size"]
    #             cl = v["class"]
    #             length, width = size.split("*")
    #             length = int(length) // 10 * 10
    #             width = int(width) // 10 * 10

    #             key = f"{length}*{width}" + "_" + cl
    #             if key in potential_LIST:
    #                 if v["temp_id"] not in potential_LIST[key]:
    #                     potential_LIST[key].append(v["temp_id"])
    #             else:
    #                 potential_LIST[key] = [v["temp_id"]]
    #         return potential_LIST

    #     completed_views = set()
    #     # 当前view的LIST分析
    #     LIST_1 = calc_size_repeat([event_views[id]["view"] for id in event_views])

    #     for k in LIST_1:
    #         L = LIST_1[k]
    #         L_size = len(L)
    #         if L_size >= 6:
    #             clicked = False
    #             for id in L:
    #                 weighted_events[id] = (weighted_events[id][0], -1)
    #                 if self.utg.is_event_explored(
    #                     event=weighted_events[id][0], state=self.current_state
    #                 ):
    #                     clicked = True
    #                 completed_views.add(id)
    #             if not clicked:
    #                 weighted_events[L[0]] = (weighted_events[L[0]][0], 1)

    #         # 可能并非重复的项，例如：Home, profile, store等nav bar...
    #         elif L_size >= 2:
    #             for id in L:
    #                 weighted_events[id] = (weighted_events[id][0], 10 - (L_size))
    #                 completed_views.add(id)

    #     parent_views = []
    #     parent_ids = []
    #     for id in event_views:
    #         if id in completed_views:
    #             continue
    #         parent = event_views[id]["parent_view"]
    #         if parent is not None and parent["temp_id"] not in parent_ids:
    #             parent_views.append(parent)
    #             parent_ids.append(parent["temp_id"])
    #     # parent view的LIST分析
    #     LIST_2 = calc_size_repeat(parent_views)
    #     for k in LIST_2:
    #         L = LIST_2[k]
    #         L_size = len(L)
    #         if L_size >= 6:
    #             child_ids = {}
    #             for id in L:
    #                 child_ids[id] = []
    #                 for child_id in event_views:
    #                     if child_id in completed_views:
    #                         continue
    #                     if event_views[child_id]["parent_view"]["temp_id"] == id:
    #                         child_ids[id].append(child_id)

    #             lens = {}
    #             for id in L:
    #                 length = len(child_ids[id])
    #                 if length not in lens:
    #                     lens[length] = []
    #                 lens[length].append(id)
    #             # 以key的大小排序
    #             lens = sorted(lens.items(), key=lambda x: x[0], reverse=True)
    #             if lens[0] >= 6:
    #                 parent_ids = lens[0][1]
    #                 for id in parent_ids:
    #                     for cid in child_ids[id]:
    #                         weighted_events[cid] = (weighted_events[cid][0], -1)
    #                         completed_views.add(id)
    #                 for cid in child_ids[parent_ids[0]]:
    #                     weighted_events[cid] = (weighted_events[cid][0], 1)

    #     # 将weighted_events按照weight排序, 如果weight =-1， 则删除
    #     tmp_events = sorted(
    #         weighted_events.items(), key=lambda x: x[1][1], reverse=True
    #     )
    #     sorted_events = [x[1][0] for x in tmp_events if x[1][1] != -1] + sorted_events
    #     return sorted_events
