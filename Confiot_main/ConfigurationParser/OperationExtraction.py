import os, sys
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.utils.XMLParser import XMLParser
import cleantext
from Confiot_main.utils.LabelResolution import Rectangle, Vector, calc_collision_vector, Coordinate


class OperationExtractor():

    def __init__(self, page_xml_file) -> None:
        self.page = XMLParser(page_xml_file)
        self.views = self.page.views

        self.hashable_views = {}
        # {"state": {hash(str(operation)): [(text_view, distance_vector),...]}}
        self.operations = {}
        self.labels = {}

    def get_view_text(self, view):
        d = ''
        # if ("content_description" in view and view["content_description"] and
        #         view["content_description"] != ''):
        #     d = f"{view['content_description']}"

        if ("text" in view and view["text"] and view["text"] != ''):
            d = f"{view['text']}"

        if (d == '' or not d):
            return ''
        d = cleantext.clean(d, extra_spaces=True, numbers=True, punct=True)

        return d

    def extract_operations(self):
        # 包含文本的views
        Textual_views = []
        Textual_views_hash = []
        # clickable,checkable,long_clickable的operation views
        operation_views = []
        checkable_views = []
        clickable_views = []

        for view in self.views:
            if (not view["visible"]):
                continue
            d = self.get_view_text(view)
            if (d != ''):
                # 更新view的文本描述
                view["text"] = d

                Textual_views.append(view)
                Textual_views_hash.append(hash(str(view)))
            else:
                view["text"] = ''

            view_hash = hash(str(view))
            self.hashable_views[view_hash] = view

            if (view["checkable"] == True):
                # if (view["checkable"] == True or view["selectable"] == True):
                checkable_views.append(view)
                operation_views.append(view)
                continue

            if (view["clickable"] == True):
                # if ("group" in view["class"].lower()):
                #     continue
                clickable_views.append(view)
                operation_views.append(view)

                # if("button" not in view["class"].lower() and "image" not in view["class"].lower() and "text" not in view["class"].lower() ):
                #     print(view["class"])

        # 1. 根据不同的layout绑定label与operation_views
        # TODO: 更多种类的可交互的配置layout
        # Layout-1：弹窗：确定、取消、输入
        is_diagram = False
        diagram_view = []
        title_view = []
        for tview in Textual_views:
            lowertext = tview["text"].lower()
            if ("cancel" in lowertext or "apply" in lowertext or "yes" in lowertext or "confirm" in lowertext or
                    "ok" in lowertext or "确定" in lowertext or "取消" in lowertext):
                diagram_view.append(tview)
                is_diagram = True
            elif (is_diagram):
                title_view.append(title_view)

        if (is_diagram):
            view = diagram_view[0]
            if (hash(str(view)) not in self.operations):
                self.operations[hash(str(view))] = []
            for title in title_view:
                self.operations[hash(str(view))].append((title, Vector(Coordinate(0, 0), Coordinate(0, 0), 0).get_magnitude()))

        # Layout-2：上下左右的文本，根据距离判断，将文本与最近的clickable view建立联系
        if (not is_diagram):
            complete_operation_views = []
            for view in operation_views:
                if (hash(str(view)) in complete_operation_views):
                    continue

                if (hash(str(view)) in Textual_views_hash):
                    if (hash(str(view)) not in self.operations):
                        self.operations[hash(str(view))] = []
                    self.operations[hash(str(view))].append((view, Vector(Coordinate(0, 0), Coordinate(0, 0),
                                                                          0).get_magnitude()))
                    if (hash(str(view)) not in complete_operation_views):
                        complete_operation_views.append(hash(str(view)))
                    continue
                o_rec = Rectangle(view["bounds"][0][0], view["bounds"][0][1], view["bounds"][1][0], view["bounds"][1][1])
                # 三种情况
                # 1. distance 直接相关
                # 2. in the box，设置为相关，并直接赋值distance vector：Vector(Coordinate(0, 0), Coordinate(0, 0), 0)
                # 3. label在operation左边，但是由于distance可能不相关（距离太远），因此比较operation的parent与label的distance，赋值为Vector，注意0.5:(Coordinate(0, 0.5), Coordinate(0, 0), 0)
                for tview in Textual_views:
                    t_rec = Rectangle(tview["bounds"][0][0], tview["bounds"][0][1], tview["bounds"][1][0],
                                      tview["bounds"][1][1])
                    is_related = calc_collision_vector(o_rec, t_rec)

                    if (is_related == "PotentialLeftLabel"):
                        parent = self.page.viewsId[view['parent']]
                        parent_rec = Rectangle(parent["bounds"][0][0], parent["bounds"][0][1], parent["bounds"][1][0],
                                               parent["bounds"][1][1])
                        is_related = calc_collision_vector(parent_rec, t_rec)
                        if (is_related == "PotentialLeftLabel" or not is_related):
                            continue

                        if (is_related.get_magnitude() == -1):
                            is_related = Vector(Coordinate(0, 0.5), Coordinate(0, 0), 0)

                    if (is_related):
                        if (hash(str(view)) not in self.operations):
                            self.operations[hash(str(view))] = []
                        self.operations[hash(str(view))].append((tview, is_related.get_magnitude()))

                        if (hash(str(view)) not in complete_operation_views):
                            complete_operation_views.append(hash(str(view)))
                        # if (hash(str(view)) == hash(str(tview)) and tview["clickable"] and hash(str(tview)) not in complete_operation_views):
                        #     complete_operation_views.append(hash(str(tview)))

        # 2. 无人认领的label进行额外处理

        # 3. 一个label被对应多个operation_views的情况，根据距离判断?
        for view_hash in self.operations:
            op = self.hashable_views[view_hash]
            op_center = [(op['bounds'][1][0] - op['bounds'][0][0]) / 2, (op['bounds'][1][1] - op['bounds'][0][1]) / 2]
            for label in self.operations[view_hash]:
                tview = label[0]
                magnitude = label[1]

                tview_center = [(tview['bounds'][1][0] - tview['bounds'][0][0]) / 2,
                                (tview['bounds'][1][1] - tview['bounds'][0][1]) / 2]
                if (hash(str(tview)) not in self.labels):
                    self.labels[hash(str(tview))] = {}
                # viewgroup可能会包含多个text

                if (magnitude == -1 and len(self.operations[view_hash]) > 1):
                    self.labels[hash(str(tview))][view_hash] = math.sqrt((op_center[0] - tview_center[0])**2 +
                                                                         (op_center[1] - tview_center[1])**2)
                else:
                    self.labels[hash(str(tview))][view_hash] = magnitude

        self.operations = {}
        for label in self.labels:
            potential_operations = self.labels[label]
            potential_operations = dict(sorted(potential_operations.items(), key=lambda item: item[1]))
            most_related_operation_hash = list(potential_operations.keys())[0]

            if (most_related_operation_hash not in self.operations):
                self.operations[most_related_operation_hash] = []
            self.operations[most_related_operation_hash].append(
                (self.hashable_views[label], potential_operations[most_related_operation_hash]))

        # [DEBUG] print label resolution
        for view_hash in self.operations:
            print("    + View: ", self.hashable_views[view_hash]["bounds"])
            for label in self.operations[view_hash]:
                view = label[0]
                magnitude = label[1]
                print("        - Text: ", view["text"], magnitude)
        return self.operations, self.hashable_views
