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
                if ("group" in view["class"].lower()):
                    continue
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
                self.operations[hash(str(view))].append((title, Vector(Coordinate(0, 0), Coordinate(0, 0), 0)))

        # Layout-2：上下左右的文本，根据距离判断，将文本与最近的clickable view建立联系
        if (not is_diagram):
            complete_operation_views = []
            for view in operation_views:
                if (hash(str(view)) in complete_operation_views):
                    continue

                if (hash(str(view)) in Textual_views_hash):
                    if (hash(str(view)) not in self.operations):
                        self.operations[hash(str(view))] = []
                    self.operations[hash(str(view))].append((view, None))
                    if (hash(str(view)) not in complete_operation_views):
                        complete_operation_views.append(hash(str(view)))
                    continue
                o_rec = Rectangle(view["bounds"][0][0], view["bounds"][0][1], view["bounds"][1][0], view["bounds"][1][1])
                for tview in Textual_views:
                    t_rec = Rectangle(tview["bounds"][0][0], tview["bounds"][0][1], tview["bounds"][1][0],
                                      tview["bounds"][1][1])
                    is_related = calc_collision_vector(o_rec, t_rec)

                    if (is_related == "PotentialLeftLabel"):
                        parent = self.state_contents[view['parent']]
                        o_rec = Rectangle(parent["bounds"][0][0], parent["bounds"][0][1], parent["bounds"][1][0],
                                          parent["bounds"][1][1])
                        is_related = calc_collision_vector(o_rec, t_rec)
                        if (is_related == "PotentialLeftLabel" or not is_related):
                            continue

                    if (is_related):
                        if (hash(str(view)) not in self.operations):
                            self.operations[hash(str(view))] = []
                        self.operations[hash(str(view))].append((tview, is_related))

                        if (hash(str(view)) not in complete_operation_views):
                            complete_operation_views.append(hash(str(view)))
                        if (tview["clickable"] and hash(str(tview)) not in complete_operation_views):
                            complete_operation_views.append(hash(str(tview)))

        # 2. 无人认领的label进行额外处理

        # 3. 一个label被对应多个operation_views的情况，根据距离判断?

        # [DEBUG] print label resolution
        for view_hash in self.operations:
            print("    + View: ", self.hashable_views[view_hash]["view_str"])
            for label in self.operations[view_hash]:
                view = label[0]
                vector = label[1]
                print("        - Text: ", view["text"], vector.get_magnitude() if vector else 0)
        return
