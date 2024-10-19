import os, sys
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")
from Confiot_main.Confiot import *


class ConfigurationParser(Confiot):

    def __init__(self) -> None:
        self.hashable_views = {}
        # {"state": {hash(str(operation)): [(text_view, distance_vector),...]}}
        self.operation_to_text = {}
        self.text_to_operation = {}

        # {
        #     "page": {
        #         "state": ["sig", ...],
        #     },
        # }
        self.pages = {}
        self.state_in_pages = {}

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
        for view in self.state_contents[state1]:
            if (not view["visible"]):
                continue
            content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[bounds]{str(view['bounds'])}"
            state1_sig.append(content_free_signature)
        for view in self.state_contents[state2]:
            if (not view["visible"]):
                continue
            content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[bounds]{str(view['bounds'])}"
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

    def parse_struture_unique_pages(self):
        for state in self.state_contents:
            state_content_free_signature = []
            for view in self.state_contents[state]:
                if (not view["visible"]):
                    continue
                # [TODO]: droidot bug，当页面包含一个diagram，diagram后的views没有被记录
                if (len(self.state_contents[state]) < 20):
                    content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[text]{str(view['text'])}"
                    state_content_free_signature.append(content_free_signature)
                else:
                    content_free_signature = f"[class]{view['class']}[resource_id]{view['resource_id']}[bounds]{str(view['bounds'])}"
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
                self.state_in_pages[state] = page_name
            else:
                # 将state加入最相似的page
                self.pages[max_similar_page][state] = state_content_free_signature
                self.state_in_pages[state] = max_similar_page

    def extract_navigations(self):
        self.UIPages = UITree()

        # {event_str: Node} event与config一一对应
        event_config = {}

        if (self.utg_graph is None):
            return

        for page in self.pages:
            desc = [s for s in self.pages[page]]
            n = Node(page, description='\n'.join(desc), state=None)
            self.UIPages.nodes_dict[page] = n
            self.UIPages.add_node(n)

        for src_state in self.utg_graph.edges_dict:
            for target_state in self.utg_graph.edges_dict[src_state]:
                for event_str in self.utg_graph.edges_dict[src_state][target_state]:
                    if (event_str not in self.events):
                        continue
                    e = self.events[event_str]

                    # 不包括返回的边
                    if ("name=BACK" in event_str):
                        continue

                    src_page = self.state_in_pages[src_state]
                    target_page = self.state_in_pages[target_state]

                    if ('view' in e):
                        config_id = str(e['view']['temp_id'])
                        parent = str(e['view']['parent'])
                        view_str = e['view']["view_str"]
                        bounds = e['view']["bounds"]

                        e = Edge(self.UIPages.nodes_dict[src_page], self.UIPages.nodes_dict[target_page], event_str)
                        self.UIPages.add_edge(e)

                    elif ('intent' in e and 'am start' in e['intent']):
                        start_page = "000"
                        n = Node(start_page, description=start_page, state=None)
                        self.UIPages.nodes_dict[start_page] = n
                        self.UIPages.add_node(n)

                        e = Edge(self.UIPages.nodes_dict[start_page], self.UIPages.nodes_dict[target_page], event_str)
                        self.UIPages.add_edge(e)
        UITree.draw(self.UIPages, settings.Confiot_output)
