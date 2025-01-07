import os, sys
import math
import hashlib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.utils.XMLParser import XMLParser
import cleantext
from Confiot_main.utils.LabelResolution import (
    Rectangle,
    Vector,
    calc_collision_vector,
    Coordinate,
    is_in_box,
)


class OperationExtractor:

    def __init__(self, page_xml_file) -> None:
        print("[DBG]: OperationExtractor, ", page_xml_file)
        self.page = XMLParser(page_xml_file)
        self.views = self.page.views

        self.hashable_views = {}
        # {"state": {hashlib.sha256(str(operation).encode("utf-8")).hexdigest(): [(text_view, distance_vector),...]}}
        self.operations = {}
        self.labels = {}

    def get_view_text(self, view):
        d = ""
        # if ("content_description" in view and view["content_description"] and
        #         view["content_description"] != ''):
        #     d = f"{view['content_description']}"

        if "text" in view and view["text"] and view["text"] != "":
            d = f"{view['text']}"

        if d == "" or not d:
            return ""
        d = cleantext.clean(d, extra_spaces=True, numbers=False, punct=True)

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
            if not view["visible"]:
                continue
            d = self.get_view_text(view)
            view["origin_text"] = view["text"]
            if d != "":
                # 更新view的文本描述
                view["text"] = d

                Textual_views.append(view)
                Textual_views_hash.append(
                    hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                )
            else:
                view["text"] = ""

            view_hash = hashlib.sha256(str(view).encode("utf-8")).hexdigest()
            self.hashable_views[view_hash] = view

            if view["checkable"] == True:
                # if (view["checkable"] == True or view["selectable"] == True):
                checkable_views.append(view)
                operation_views.append(view)
                continue

            if view["clickable"] == True:
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
            if (
                "cancel" in lowertext
                or "apply" in lowertext
                or "yes" in lowertext
                or "confirm" in lowertext
                or "ok" == lowertext
                or "确定" in lowertext
                or "取消" in lowertext
            ):
                diagram_view.append(tview)
                is_diagram = True
        if is_diagram:
            for tview in Textual_views:
                title_view.append(tview)

        if is_diagram:
            view = diagram_view[0]

            if (
                hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                not in self.operations
            ):
                self.operations[
                    hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                ] = []
            for title in title_view:
                self.operations[
                    hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                ].append(
                    (
                        title,
                        Vector(Coordinate(0, 0), Coordinate(0, 0), 0).get_magnitude(),
                    )
                )

        # Layout-2：上下左右的文本，根据距离判断，将文本与最近的clickable view建立联系
        if not is_diagram:
            complete_operation_views = []
            for view in operation_views:
                if (
                    hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                    in complete_operation_views
                ):
                    continue

                if (
                    hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                    in Textual_views_hash
                ):
                    if (
                        hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                        not in self.operations
                    ):
                        self.operations[
                            hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                        ] = []
                    self.operations[
                        hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                    ].append(
                        (
                            view,
                            Vector(
                                Coordinate(0, 0), Coordinate(0, 0), 0
                            ).get_magnitude(),
                        )
                    )
                    if (
                        hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                        not in complete_operation_views
                    ):
                        complete_operation_views.append(
                            hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                        )
                    continue
                o_rec = Rectangle(
                    view["bounds"][0][0],
                    view["bounds"][0][1],
                    view["bounds"][1][0],
                    view["bounds"][1][1],
                )
                # 三种情况
                # 1. distance 直接相关
                # 2. in the box，设置为相关，并直接赋值distance vector：Vector(Coordinate(0, 0), Coordinate(0, 0), 0)
                # 3. label在operation左边，但是由于distance可能不相关（距离太远），因此比较operation的parent与label的distance，赋值为Vector，注意0.5:(Coordinate(0, 0.5), Coordinate(0, 0), 0)
                for tview in Textual_views:
                    t_rec = Rectangle(
                        tview["bounds"][0][0],
                        tview["bounds"][0][1],
                        tview["bounds"][1][0],
                        tview["bounds"][1][1],
                    )
                    is_related = calc_collision_vector(o_rec, t_rec)

                    if is_related == "PotentialLeftLabel":
                        parent = self.page.viewsId[view["parent"]]
                        parent_rec = Rectangle(
                            parent["bounds"][0][0],
                            parent["bounds"][0][1],
                            parent["bounds"][1][0],
                            parent["bounds"][1][1],
                        )
                        is_related = calc_collision_vector(parent_rec, t_rec)
                        if is_related == "PotentialLeftLabel" or not is_related:
                            continue

                        if is_related.get_magnitude() == -1:
                            is_related = Vector(Coordinate(0, 0.5), Coordinate(0, 0), 0)

                    if is_related:
                        if (
                            hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                            not in self.operations
                        ):
                            self.operations[
                                hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                            ] = []
                        self.operations[
                            hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                        ].append((tview, is_related.get_magnitude()))

                        if (
                            hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                            not in complete_operation_views
                        ):
                            complete_operation_views.append(
                                hashlib.sha256(str(view).encode("utf-8")).hexdigest()
                            )
                        # if (hashlib.sha256(str(view).encode("utf-8")).hexdigest() == hashlib.sha256(str(tview).encode("utf-8")).hexdigest() and tview["clickable"] and hashlib.sha256(str(tview).encode("utf-8")).hexdigest() not in complete_operation_views):
                        #     complete_operation_views.append(hashlib.sha256(str(tview).encode("utf-8")).hexdigest())

        # 3. 一个label被对应多个operation_views的情况，根据距离判断?
        for view_hash in self.operations:
            op = self.hashable_views[view_hash]
            op_center = [
                (op["bounds"][1][0] - op["bounds"][0][0]) / 2,
                (op["bounds"][1][1] - op["bounds"][0][1]) / 2,
            ]
            for label in self.operations[view_hash]:
                tview = label[0]
                magnitude = label[1]

                if "bounds" not in tview:
                    continue

                tview_center = [
                    (tview["bounds"][1][0] - tview["bounds"][0][0]) / 2,
                    (tview["bounds"][1][1] - tview["bounds"][0][1]) / 2,
                ]
                if (
                    hashlib.sha256(str(tview).encode("utf-8")).hexdigest()
                    not in self.labels
                ):
                    self.labels[
                        hashlib.sha256(str(tview).encode("utf-8")).hexdigest()
                    ] = {}

                self.labels[hashlib.sha256(str(tview).encode("utf-8")).hexdigest()][
                    view_hash
                ] = magnitude

                # if (magnitude == -1 and len(self.operations[view_hash]) > 1):
                #     self.labels[hashlib.sha256(
                #         str(tview).encode("utf-8")).hexdigest()][view_hash] = math.sqrt((op_center[0] - tview_center[0])**2 +
                #                                                                         (op_center[1] - tview_center[1])**2)
                # else:
                #     self.labels[hashlib.sha256(str(tview).encode("utf-8")).hexdigest()][view_hash] = magnitude

        self.operations = {}
        for label in self.labels:
            potential_operations = self.labels[label]
            potential_operations = dict(
                sorted(potential_operations.items(), key=lambda item: item[1])
            )
            most_related_operation_hash = list(potential_operations.keys())[0]

            # 一个operationable viewgroup内会包含这个text view，并且viewgroup内部的另外一个operation，也与text view相关
            if potential_operations[most_related_operation_hash] == -1:
                viewgroup_view = self.hashable_views[most_related_operation_hash]
                viewgroup_rec = Rectangle(
                    viewgroup_view["bounds"][0][0],
                    viewgroup_view["bounds"][0][1],
                    viewgroup_view["bounds"][1][0],
                    viewgroup_view["bounds"][1][1],
                )
                for other_op_hash in potential_operations:
                    if other_op_hash == most_related_operation_hash:
                        continue
                    op_view = self.hashable_views[other_op_hash]
                    op_rec = Rectangle(
                        op_view["bounds"][0][0],
                        op_view["bounds"][0][1],
                        op_view["bounds"][1][0],
                        op_view["bounds"][1][1],
                    )
                    # 如果op_view 在 viewgroup_view内部，则保留op_view与当前label的绑定
                    if is_in_box(viewgroup_rec, op_rec):
                        if other_op_hash not in self.operations:
                            self.operations[other_op_hash] = []
                        self.operations[other_op_hash].append(
                            (
                                self.hashable_views[label],
                                potential_operations[other_op_hash],
                            )
                        )

            if most_related_operation_hash not in self.operations:
                self.operations[most_related_operation_hash] = []
            self.operations[most_related_operation_hash].append(
                (
                    self.hashable_views[label],
                    potential_operations[most_related_operation_hash],
                )
            )

        # 3. 无人认领的label进行额外处理
        self.plain_labels = []
        for label in Textual_views:
            if (
                hashlib.sha256(str(label).encode("utf-8")).hexdigest()
                not in self.labels
            ):
                # 判断当前label是否在screen center top
                from Confiot_main.settings import settings

                screen_center = (settings.screen_xy[0] // 2, settings.screen_xy[1] // 2)
                if (
                    abs(
                        (label["bounds"][0][0] + label["bounds"][1][0]) // 2
                        - settings.screen_xy[0] // 2
                    )
                    < settings.LabelResoluation_threshold
                ):
                    if (label["bounds"][0][1] + label["bounds"][1][1]) // 2 < (
                        settings.screen_xy[1] // 10
                    ):
                        label["is_title"] = True
                self.plain_labels.append(label)

        # 根据self.operations[view_hash]的magnitude进行排序
        for view_hash in self.operations:
            self.operations[view_hash] = sorted(
                self.operations[view_hash], key=lambda x: x[1]
            )
        # [DEBUG] print label resolution
        for view_hash in self.operations:
            print("    + View: ", self.hashable_views[view_hash]["bounds"])
            for label in self.operations[view_hash]:
                view = label[0]
                magnitude = label[1]
                print("        - Text: ", view["text"], magnitude)
        return self.operations, self.plain_labels, self.hashable_views
