import os, sys
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.Confiot import *


class PageExplorer():

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

    def jaccard_similarity(self, list1, list2):
        set1, set2 = set(list1), set(list2)
        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        # print(intersection / union)
        return intersection / union

    def calc_state_similarity(self, state1, state2):
        state1_sig = []
        state2_sig = []
        for view in self.Agent.state_contents[state1]:
            if (not view["visible"]):
                continue
            content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[bounds]{str(view['bounds'])}[text]{str(view['text'])}"
            state1_sig.append(content_free_signature)
        for view in self.Agent.state_contents[state2]:
            if (not view["visible"]):
                continue
            content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[bounds]{str(view['bounds'])}[text]{str(view['text'])}"
            state2_sig.append(content_free_signature)

        return self.jaccard_similarity(state1_sig, state2_sig)

    # 计算一个UTG state content_free_signature，与一个page中所有state signature的最大相似度
    def calc_state_similarity_with_page(self, state_content_free_signature, page_signatures):
        similarities = []
        for state in page_signatures:
            page_signature = page_signatures[state]
            sim = self.jaccard_similarity(state_content_free_signature, page_signature)
            similarities.append(sim)

        if (similarities):
            return max(similarities)
        else:
            return -1

    # step-1: 识别pages
    def parse_struture_unique_pages(self):
        for state in self.Agent.state_contents:
            state_content_free_signature = []
            for view in self.Agent.state_contents[state]:
                if (not view["visible"]):
                    continue
                # # [TODO]: droidot bug，当页面包含一个diagram，diagram后的views没有被记录
                # if (len(self.Agent.state_contents[state]) < 20):
                #     content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[text]{str(view['text'])}"
                #     state_content_free_signature.append(content_free_signature)
                # else:
                content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[bounds]{str(view['bounds'])}[text]{str(view['text'])}"
                state_content_free_signature.append(content_free_signature)
            page_similarities = {}
            max_similar_page = ""
            for page in self.pages:
                page_similarities[page] = self.calc_state_similarity_with_page(state_content_free_signature, self.pages[page])

            if (page_similarities):
                max_similar_page = max(page_similarities, key=page_similarities.get)

                # if (page_similarities[max_similar_page] > 0.8 and page_similarities[max_similar_page] < 0.9):
                #     print(state, self.pages[max_similar_page])

            if (not max_similar_page or page_similarities[max_similar_page] < 0.9):
                # 创建一个新page
                pstr = "%s" % (",".join(sorted(state_content_free_signature)))
                page_name = f"Page-{len(self.pages)}"
                self.pages[page_name] = {}
                self.pages[page_name][state] = state_content_free_signature
                self.state_in_which_page[state] = page_name
            else:
                # 将state加入最相似的page
                self.pages[max_similar_page][state] = state_content_free_signature
                self.state_in_which_page[state] = max_similar_page

    # step-2: 解析pages的navigation关系，生成page_navigation_graph
    def extract_navigations(self):

        # {event_str: Node} event与config一一对应
        event_config = {}

        if (self.Agent.utg_graph is None):
            return

        for page in self.pages:
            desc = [s for s in self.pages[page]]
            n = Node(page, description='\n'.join(desc), state=None)
            self.page_navigation_graph.nodes_dict[page] = n
            self.page_navigation_graph.add_node(n)

        for src_state in self.Agent.utg_graph.edges_dict:
            for target_state in self.Agent.utg_graph.edges_dict[src_state]:
                for event_str in self.Agent.utg_graph.edges_dict[src_state][target_state]:
                    if (event_str not in self.Agent.events):
                        continue
                    e = self.Agent.events[event_str]

                    # 不包括返回的边
                    if ("name=BACK" in event_str):
                        continue

                    src_page = self.state_in_which_page[src_state]
                    target_page = self.state_in_which_page[target_state]

                    if ('view' in e):
                        config_id = str(e['view']['temp_id'])
                        parent = str(e['view']['parent'])
                        view_str = e['view']["view_str"]
                        bounds = e['view']["bounds"]

                        edge = Edge(self.page_navigation_graph.nodes_dict[src_page],
                                    self.page_navigation_graph.nodes_dict[target_page],
                                    event_str,
                                    view=e['view'])
                        self.page_navigation_graph.add_edge(edge)

                    elif ('intent' in e and 'am start' in e['intent']):
                        start_page = "000"
                        n = Node(start_page, description=start_page, state=None)
                        self.page_navigation_graph.nodes_dict[start_page] = n
                        self.page_navigation_graph.add_node(n)

                        edge = Edge(self.page_navigation_graph.nodes_dict[start_page],
                                    self.page_navigation_graph.nodes_dict[target_page], event_str)
                        self.page_navigation_graph.add_edge(edge)
                        self.page_navigation_graph.start_node = start_page
        UITree.draw(self.page_navigation_graph, settings.Confiot_output)

    # step-3: 遍历所有page，并获取snapshot
    def device_page_replay(self, dir):
        for page in self.pages:
            steps = self.find_path_to_page(page)

            if (page == self.page_navigation_graph.start_node or not steps):
                continue

            self.to_page(page, steps)
            self.Agent.device_get_UIElement(store_path=dir,store_file=f"{page}.xml")

    def to_page(self, page, steps):

        self.Agent.device_stop_app()
        self.Agent.device.start_app(self.Agent.app)
        time.sleep(3)

        # 在当前page，需要做的操作
        for page in steps:
            candidate_operations = steps[page]
            # [TODO]: 结合find_view_in_page，修改这里
            chosen_operation = candidate_operations[0]

            view = chosen_operation[0]
            event_str = chosen_operation[1]

            event_dict = self.Agent.events[event_str]
            event = InputEvent.from_dict(event_dict)
            print("[DBG]: Action: " + event_str)
            event.send(self.Agent.device)
            time.sleep(2)

        print("[DBG]: Done")
        return True

    # 分析到某一个page的路径
    def find_path_to_page(self, page):
        steps = {}
        pages_in_path = self.page_navigation_graph.find_shortest_path(self.page_navigation_graph.start_node, page)

        if (pages_in_path):
            current_node = pages_in_path[0]
            for node in pages_in_path[1:]:
                edges = self.page_navigation_graph.edges_dict[current_node.name][node.name]
                steps[current_node.name] = [(e.view, e.event_str) for e in edges]
                current_node = node

        # print(steps)
        return steps

    def identify_current_page(self, state_views):
        state_sig = []
        for view in state_views:
            if (not view["visible"]):
                continue
            content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[bounds]{str(view['bounds'])}[text]{str(view['text'])}"
            state_sig.append(content_free_signature)

        page_similarities = {}
        max_similar_page = ""
        for page in self.pages:
            page_similarities[page] = self.calc_state_similarity_with_page(state_sig, self.pages[page])

        if (page_similarities):
            max_similar_page = max(page_similarities, key=page_similarities.get)

            # if (page_similarities[max_similar_page] > 0.8 and page_similarities[max_similar_page] < 0.9):
            #     print(state, self.pages[max_similar_page])

        if (not max_similar_page or page_similarities[max_similar_page] < 0.8):
            # 创建一个新page
            print("[DBG]: Found a new page!")
            # input()
            return None
        else:
            # 将state加入最相似的page
            return max_similar_page

    # [TODO]: 某些view可能由于页面变动，仍然存在但是位置变了
    def find_view_in_page(self, view, page):
        pass
