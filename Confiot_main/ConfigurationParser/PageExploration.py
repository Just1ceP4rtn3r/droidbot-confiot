import os, sys
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.Confiot import *
from Confiot_main.utils.XMLParser import XMLParser
from zss import simple_distance
from zss import Node as zss_node


class PageExplorer:

    def __init__(self, Agent: Confiot) -> None:
        # {
        #     "page-1": {
        #         "state": ["sig", ...],
        #     },
        # }
        self.Agent = Agent
        self.pages = {}
        self.page_navigation_graph = UITree()
        self.state_in_which_page = {}

        super().__init__()

    def get_zss_tree(self, views):
        nodes = {}
        root_node = None
        size = 0
        for view in views:
            if not view["visible"]:
                continue
            nodes[view["temp_id"]] = zss_node(view["resource_id"])
            if view["parent"] == -1:
                root_node = nodes[view["temp_id"]]
            size += 1

        for view in views:
            if not view["visible"]:
                continue
            temp_id = view["temp_id"]
            children = view["children"]
            for child in children:
                if child in nodes:
                    nodes[temp_id].addkid(nodes[child])
        return root_node, size

    def zss_similarity(self, tree1, tree1_size, tree2, tree2_size):
        return 1 - (simple_distance(tree1, tree2) / max(tree1_size, tree2_size))

    def jaccard_similarity(self, list1, list2):
        set1, set2 = set(list1), set(list2)
        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        if union == 0:
            return 1
        # print(intersection / union)
        return intersection / union

    def get_state_signature(self, state_views):
        state1_signature = {"resourceid": [], "bound": [], "text": []}
        for view in state_views:
            if not view["visible"]:
                continue
            state1_signature["resourceid"].append(
                f"[class]{view['class']}[resource_id]{view['resource_id']}"
            )
            state1_signature["bound"].append(f"[bounds]{view['bounds']}")
            if view["text"]:
                state1_signature["text"].append(f"[text]{view['text']}")
        return state1_signature

    def calc_state_jaccard_similarity(self, state1, state2):
        resourceid_similarity = 0
        bound_similarity = 0
        text_similarity = 0

        state1_info = {"resourceid": [], "bound": [], "text": []}
        state2_info = {"resourceid": [], "bound": [], "text": []}
        for view in self.Agent.state_contents[state1]:
            if not view["visible"]:
                continue
            state1_info["resourceid"].append(
                f"[class]{view['class']}[resource_id]{view['resource_id']}"
            )
            state1_info["bound"].append(f"[bounds]{view['bounds']}")
            if view["text"]:
                state1_info["text"].append(f"[text]{view['text']}")
        for view in self.Agent.state_contents[state2]:
            if not view["visible"]:
                continue
            state2_info["resourceid"].append(
                f"[class]{view['class']}[resource_id]{view['resource_id']}"
            )
            state2_info["bound"].append(f"[bounds]{view['bounds']}")
            if view["text"]:
                state2_info["text"].append(f"[text]{view['text']}")

        resourceid_similarity = self.jaccard_similarity(
            state1_info["resourceid"], state2_info["resourceid"]
        )
        bound_similarity = self.jaccard_similarity(
            state1_info["bound"], state2_info["bound"]
        )
        text_similarity = self.jaccard_similarity(
            state1_info["text"], state2_info["text"]
        )

        return (
            resourceid_similarity * 0.7 + bound_similarity * 0.2 + text_similarity * 0.1
        )

    def calc_state_zss_similarity(self, state1, state2):

        tree1, tree1_size = self.get_zss_tree(self.Agent.state_contents[state1])
        tree2, tree2_size = self.get_zss_tree(self.Agent.state_contents[state2])

        return self.zss_similarity(tree1, tree1_size, tree2, tree2_size)

    # 计算一个UTG state content_free_signature，与一个page中所有state signature的最大相似度
    def calc_state_similarity_with_page(
        self, state_content_free_signature, state_layout, page_info
    ):

        cursory_similarity = 0
        similarities = []
        for state in page_info:
            page_signature = page_info[state]

            resourceid_similarity = self.jaccard_similarity(
                state_content_free_signature["resourceid"], page_signature["resourceid"]
            )
            bound_similarity = self.jaccard_similarity(
                state_content_free_signature["bound"], page_signature["bound"]
            )
            text_similarity = self.jaccard_similarity(
                state_content_free_signature["text"], page_signature["text"]
            )

            sim = (
                resourceid_similarity * 0.7
                + bound_similarity * 0.2
                + text_similarity * 0.1
            )
            similarities.append(sim)

        if similarities:
            cursory_similarity = max(similarities)
            return cursory_similarity
        else:
            return -1

        # if (cursory_similarity < 0.8):
        #     return cursory_similarity

        # similarities = []
        # for state in page_info:
        #     page_signature, page_layout = page_info[state]
        #     if (self.jaccard_similarity(state_content_free_signature, page_signature) < 0.8):
        #         continue
        #     sim = self.zss_similarity(state_layout[0], state_layout[1], page_layout[0], page_layout[1])
        #     similarities.append(sim)

        # if (similarities):
        #     return max(similarities)
        # else:
        #     return -1

    # step-1: 识别pages
    def parse_struture_unique_pages(self):
        for state in self.Agent.state_contents:
            # signature用于预先粗略比较，两个state是否相似
            state_content_free_signature = self.get_state_signature(
                self.Agent.state_contents[state]
            )
            # for view in self.Agent.state_contents[state]:
            #     if (not view["visible"]):
            #         continue
            #     # # [TODO]: droidot bug，当页面包含一个diagram，diagram后的views没有被记录
            #     # if (len(self.Agent.state_contents[state]) < 20):
            #     #     content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[text]{str(view['text'])}"
            #     #     state_content_free_signature.append(content_free_signature)
            #     # else:
            #     content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}"
            #     state_content_free_signature.append(content_free_signature)

            # state_layout用于执行zss distance计算，比较耗时
            tree, tree_size = self.get_zss_tree(self.Agent.state_contents[state])
            state_layout = (tree, tree_size)
            page_similarities = {}
            max_similar_page = ""
            for page in self.pages:
                page_similarities[page] = self.calc_state_similarity_with_page(
                    state_content_free_signature, state_layout, self.pages[page]
                )

            if page_similarities:
                max_similar_page = max(page_similarities, key=page_similarities.get)

                # if (page_similarities[max_similar_page] > 0.8 and page_similarities[max_similar_page] < 0.9):
                #     print(state, self.pages[max_similar_page])

            if not max_similar_page or page_similarities[max_similar_page] < 0.8:
                # 创建一个新page
                page_name = f"Page-{len(self.pages)}"
                self.pages[page_name] = {}
                self.pages[page_name][state] = state_content_free_signature
                self.state_in_which_page[state] = page_name

                screenshot = self.Agent.utg_graph.nodes_dict[state].screenshot
                if screenshot and os.path.exists(screenshot):
                    import shutil

                    shutil.copy(screenshot, settings.Pages + f"/{page_name}.jpg")

            else:
                # 将state加入最相似的page
                self.pages[max_similar_page][state] = state_content_free_signature
                self.state_in_which_page[state] = max_similar_page

    # step-2: 解析pages的navigation关系，生成page_navigation_graph
    def extract_navigations(self):

        if self.Agent.utg_graph is None:
            return

        for page in self.pages:
            desc = [s for s in self.pages[page]]
            n = Node(page, description="\n".join(desc), state=None)
            self.page_navigation_graph.nodes_dict[page] = n
            self.page_navigation_graph.add_node(n)

        for src_state in self.Agent.utg_graph.edges_dict:
            for target_state in self.Agent.utg_graph.edges_dict[src_state]:
                for event_str in self.Agent.utg_graph.edges_dict[src_state][
                    target_state
                ]:
                    if event_str not in self.Agent.events:
                        continue
                    e = self.Agent.events[event_str]

                    # 不包括返回的边
                    if "name=BACK" in event_str:
                        continue

                    src_page = self.state_in_which_page[src_state]
                    target_page = self.state_in_which_page[target_state]

                    if "view" in e:
                        config_id = str(e["view"]["temp_id"])
                        parent = str(e["view"]["parent"])
                        view_str = e["view"]["view_str"]
                        bounds = e["view"]["bounds"]

                        edge = Edge(
                            self.page_navigation_graph.nodes_dict[src_page],
                            self.page_navigation_graph.nodes_dict[target_page],
                            event_str,
                            view=e["view"],
                        )
                        self.page_navigation_graph.add_edge(edge)

                    elif "intent" in e and "am start" in e["intent"]:
                        start_page = "000"
                        n = Node(start_page, description=start_page, state=None)
                        self.page_navigation_graph.nodes_dict[start_page] = n
                        self.page_navigation_graph.add_node(n)

                        edge = Edge(
                            self.page_navigation_graph.nodes_dict[start_page],
                            self.page_navigation_graph.nodes_dict[target_page],
                            event_str,
                        )
                        self.page_navigation_graph.add_edge(edge)
                        self.page_navigation_graph.start_node = start_page

        self.page_navigation_graph.set_node_level()
        UITree.draw(self.page_navigation_graph, settings.Confiot_output)

    # step-3: 遍历所有page，并获取snapshot
    # 贪心
    def device_page_replay(self, outputdir):
        self.Agent.device_stop_app()
        self.Agent.device.start_app(self.Agent.app)
        time.sleep(5)

        reachable_pages = list(self.page_navigation_graph.edges_dict.keys())
        unreachable_pages = []
        for page in self.pages:
            for from_node in self.page_navigation_graph.edges_dict.keys():
                if page in self.page_navigation_graph.edges_dict[from_node]:
                    if page not in reachable_pages:
                        reachable_pages.append(page)

        unreachable_pages = list(set(self.pages.keys()) - set(reachable_pages))

        home_page = list(
            self.page_navigation_graph.edges_dict[
                self.page_navigation_graph.start_node
            ].keys()
        )[0]
        current_page = home_page
        cannot_reach_pages = []
        # 如果按照路径，3次都没有到达指定page，则认为无法到达
        failed_navigate_page = {}
        last_event_str = ""
        PAGES = list(self.pages.keys())
        is_new_page = False
        while PAGES:
            worklist = {}
            self.Agent.device_get_UIElement(store_path=outputdir, store_file="tmp.xml")

            tmp_xml = outputdir + "/tmp.xml"
            tmp_views = XMLParser(tmp_xml).views
            _page = self.identify_current_page(tmp_views)

            # if _page in unreachable_pages:
            #     break

            is_new_page = False
            if _page:
                if _page not in PAGES or not os.path.exists(
                    outputdir + f"/{_page}.xml"
                ):
                    self.Agent.device_get_UIElement(
                        store_path=outputdir, store_file=f"{_page}.xml"
                    )
                    if _page in PAGES:
                        PAGES.remove(_page)

                # print(f"[DBG]: Last action is : {last_event_str}, Current page is: {_page}")
                # back无法跳转出此页面
                if last_event_str == "BACK" and _page == current_page:
                    self.Agent.device_stop_app()
                    self.Agent.device.start_app(self.Agent.app)
                    time.sleep(5)
                    last_event_str = "RESTART"
                    continue

                if last_event_str == "RESTART" and _page == current_page:
                    cannot_reach_pages = PAGES
                    print(cannot_reach_pages)
                    break

                if _page != current_page:
                    if last_event_str != "BACK":
                        if current_page not in failed_navigate_page:
                            failed_navigate_page[current_page] = 0
                        failed_navigate_page[current_page] += 1
                        if failed_navigate_page[current_page] >= 3:
                            PAGES.remove(current_page)
                    current_page = _page

                # if last_event_str == "BACK":
                #     last_pages = []
                #     while page_reach_stack and page_reach_stack[-1] == current_page:
                #         last_pages.append(page_reach_stack.pop())

                #     # 可能到了一个不认识的page，重新来过
                #     if not page_reach_stack:
                #         current_page = home_page
                #         page_reach_stack = []
                #         last_event_str = ""
                #         self.Agent.device_stop_app()
                #         self.Agent.device.start_app(self.Agent.app)
                #         time.sleep(5)
                #         continue
                #     else:
                #         for p in last_pages:
                #             PAGES.append(p)
                # else:
                #     page_reach_stack.append(current_page)

            else:
                # [TODO]: 如果是一个新的page
                print("[ERR]: NEW Page !")
                # input()
                is_new_page = True
                if PAGES:
                    worklist["Back2LastPage"] = "BACK"

            if not is_new_page:
                if current_page in self.page_navigation_graph.edges_dict:
                    child_pages = list(
                        self.page_navigation_graph.edges_dict[current_page].keys()
                    )
                    # 过滤已经遍历过
                    for page in child_pages:
                        if page in PAGES and page != current_page:
                            worklist[page] = self.page_navigation_graph.edges_dict[
                                current_page
                            ][page]

                # 如果back到start_node, 并且所有child page都遍历完了，那么剩余的page大概率没有路径到达
                if current_page == home_page and len(worklist) == 0:
                    cannot_reach_pages = PAGES
                    print(cannot_reach_pages)
                    break

                current_packetname = self.Agent.device.get_current_activity_stack()[0].split("/")[0]
                print(current_packetname, self.Agent.app.get_package_name())
                if self.Agent.app.get_package_name() != current_packetname:
                    # PAGES.remove(_page)
                    cannot_reach_pages = PAGES
                    print(cannot_reach_pages)
                    break

                worklist["Back2LastPage"] = "BACK"

            print(f"[DBG]: worklist in current page {current_page}: ", worklist.keys())
            target = list(worklist.keys())[0]
            edges = worklist[target]

            view = None
            event = None
            event_str = ""
            if edges == "BACK":
                event = KeyEvent(name="BACK")
                event_str = "BACK"
            else:
                view = edges[0].view
                event_str = edges[0].event_str
                if "TouchEvent" in event_str:
                    # 某些view位置变化
                    real_view = self.find_view_in_page(view)
                    if real_view:
                        view = real_view
                        self.Agent.events[event_str]["view"] = view

                event_dict = self.Agent.events[event_str]
                event = InputEvent.from_dict(event_dict)

            last_event_str = event_str
            wait_time = 3
            self.device_send_event(event, event_str, wait_time)
            if edges != "BACK":
                current_page = target

        for page in cannot_reach_pages:
            if not os.path.exists(
                outputdir + f"/{page}.xml"
            ):
                self.test_device_page_replay(outputdir, page)

    def device_send_event(self, event, event_str, sleep_time):
        print("[DBG]: Action: " + event_str)
        event.send(self.Agent.device)
        time.sleep(sleep_time)

    @deprecated
    def test_device_page_replay(self, outputdir, test_page, autodroid=False):
        replay_paths = {}
        event_steps = None
        for page in self.pages:
            steps = self.find_path_to_page(page)

            if page == self.page_navigation_graph.start_node or not steps:
                continue

            replay_paths[page] = steps

        replay_paths = dict(
            sorted(replay_paths.items(), key=lambda item: len(item[1]), reverse=True)
        )

        complete_pages = []
        print("[DBG]: Start go to page: " + test_page)
        if test_page not in replay_paths:
            print("[ERR]: No path to page ", test_page)
        else:
            event_steps = self.to_page(
                test_page, replay_paths[test_page], complete_pages, outputdir, autodroid
            )

        return event_steps

    @deprecated
    def to_page(
        self, target_page, steps, complete_pages, outputdir=None, autodroid=False
    ):
        event_steps = []
        self.Agent.device_stop_app(autodroid=autodroid)
        # self.Agent.device.start_app(self.Agent.app)
        time.sleep(2)

        # 在当前page，需要做的操作
        for page in steps:
            if page != self.page_navigation_graph.start_node:
                self.Agent.device_get_UIElement(
                    store_path=outputdir, store_file="tmp.xml"
                )

                tmp_xml = outputdir + "/tmp.xml"
                tmp_views = XMLParser(tmp_xml).views
                current_page = self.identify_current_page(tmp_views)
                if current_page and current_page == page:
                    self.Agent.device_get_UIElement(
                        store_path=outputdir, store_file=f"{page}.xml"
                    )
                    complete_pages.append(page)
                else:
                    # [TODO]: 如果是一个新的page，或跳转到别的page了（page navigation存在问题）
                    print("[ERR]: Failed to navigate to page ", page)
                    self.Agent.device_get_UIElement(
                        store_path=outputdir, store_file=f"{page}.xml"
                    )
                    complete_pages.append(page)

            candidate_operations = steps[page]
            chosen_operation = candidate_operations[0]

            view = chosen_operation[0]
            event_str = chosen_operation[1]

            if "TouchEvent" in event_str:
                # 某些view位置变化
                real_view = self.find_view_in_page(view)
                if real_view:
                    view = real_view
                    self.Agent.events[event_str]["view"] = view

            event_dict = self.Agent.events[event_str]
            event = InputEvent.from_dict(event_dict)
            print("[DBG]: Action: " + event_str)
            event_steps.append(event_dict)
            event.send(self.Agent.device)
            time.sleep(3)

        if target_page != self.page_navigation_graph.start_node:
            self.Agent.device_get_UIElement(store_path=outputdir, store_file="tmp.xml")

            tmp_xml = outputdir + "/tmp.xml"
            tmp_views = XMLParser(tmp_xml).views
            current_page = self.identify_current_page(tmp_views)
            if current_page and current_page == target_page:
                self.Agent.device_get_UIElement(
                    store_path=outputdir, store_file=f"{target_page}.xml"
                )
                complete_pages.append(target_page)
            else:
                # [TODO]: 如果是一个新的page，或跳转到别的page了（page navigation存在问题）
                print("[ERR]: Failed: ", target_page)
                # input()
                return None

        print("[DBG]: Finished: ", target_page)
        return event_steps

    # 分析到某一个page的路径
    def find_path_to_page(self, page):
        steps = {}
        pages_in_path = self.page_navigation_graph.find_shortest_path(
            self.page_navigation_graph.start_node, page
        )

        if pages_in_path:
            current_node = pages_in_path[0]
            for node in pages_in_path[1:]:
                edges = self.page_navigation_graph.edges_dict[current_node.name][
                    node.name
                ]
                steps[current_node.name] = [(e.view, e.event_str) for e in edges]
                current_node = node

        # print(steps)
        return steps

    def identify_current_page(self, state_views):
        state_sig = self.get_state_signature(state_views)

        tree, tree_size = self.get_zss_tree(state_views)
        state_layout = (tree, tree_size)
        page_similarities = {}
        max_similar_page = ""
        for page in self.pages:
            page_similarities[page] = self.calc_state_similarity_with_page(
                state_sig, state_layout, self.pages[page]
            )

        if page_similarities:
            max_similar_page = max(page_similarities, key=page_similarities.get)

        if not max_similar_page or page_similarities[max_similar_page] < 0.6:
            # 创建一个新page
            print("[DBG]: Found a new page!")
            return None
        else:
            # 将state加入最相似的page
            return max_similar_page

    # 某些view可能由于页面变动，仍然存在但是位置变了
    def find_view_in_page(self, view):
        found_view = None

        if not view:
            return None

        current_state = self.Agent.device.get_current_state()
        if current_state is None:
            return None

        views_in_state = current_state.views
        if view["temp_id"] < len(views_in_state):
            v = views_in_state[view["temp_id"]]
            if (
                v["resource_id"] == view["resource_id"]
                and v["class"] == view["class"]
                and v["content_description"] == view["content_description"]
                and v["text"] == view["text"]
                and v["size"] == view["size"]
                and v["bounds"] == view["bounds"]
            ):
                found_view = v
                return found_view

        candidates = []
        for v in views_in_state:
            if (
                v["resource_id"] == view["resource_id"]
                and v["class"] == view["class"]
                and v["content_description"] == view["content_description"]
                and v["text"] == view["text"]
                and v["size"] == view["size"]
            ):
                candidates.append(v)
                if v["bounds"] == view["bounds"]:
                    found_view = v
                    return found_view

        # 按照直线距离排序
        view_center = [
            (view["bounds"][1][0] - view["bounds"][0][0]) / 2,
            (view["bounds"][1][1] - view["bounds"][0][1]) / 2,
        ]
        min_dist = 9999999
        for v in candidates:
            v_center = [
                (v["bounds"][1][0] - v["bounds"][0][0]) / 2,
                (v["bounds"][1][1] - v["bounds"][0][1]) / 2,
            ]
            dist = math.sqrt(
                (view_center[0] - v_center[0]) ** 2
                + (view_center[1] - v_center[1]) ** 2
            )

            if dist < min_dist:
                min_dist = dist
                found_view = v

        if not found_view:
            return None
        if found_view["bounds"] != view["bounds"]:
            print("[DBG]: The position of the view changed!")
        return found_view
