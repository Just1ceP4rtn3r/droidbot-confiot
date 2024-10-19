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
                if(len(self.state_contents[state]))
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
                import hashlib
                page_name = hashlib.md5(pstr.encode('utf-8')).hexdigest()
                self.pages[page_name] = {}
                self.pages[page_name][state] = state_content_free_signature
            else:
                # 将state加入最相似的page
                self.pages[max_similar_page][state] = state_content_free_signature

    def extract_navigations(self):
        self.uiTree = UITree()

        # {state_str: [Node,]} 存储当前state下所有config Node
        config_nodes = {}
        # {event_str: Node} event与config一一对应
        event_config = {}

        if (self.utg_graph is None):
            return

    def parse_UITree(self):
        self.uiTree = UITree()

        # {state_str: [Node,]} 存储当前state下所有config Node
        config_nodes = {}
        # {event_str: Node} event与config一一对应
        event_config = {}

        if (self.utg_graph is None):
            return

        # for e in self.events:
        #     if(hasattr(e, 'view')):
        #         config_id = str(e['view']['temp_id'])
        #         config_description = ''

        #         if(hasattr(e['view'], "content_description") and e['view']["content_description"] and e['view']["content_description"] != ''):
        #             config_description = config_description + ";e['view']['content_description']"
        #         if(hasattr(e['view'], "text") and e['view']["text"] and e['view']["text"] != ''):
        #             config_description = config_description + ";e['view']['text']"
        #         self.uiTree.add_node(Node(config_id,description=config_description))

        # 获取每个state中存在的config Node
        for src_state in self.utg_graph.edges_dict:
            for target_state in self.utg_graph.edges_dict[src_state]:
                for event_str in self.utg_graph.edges_dict[src_state][target_state]:
                    if (event_str not in self.events):
                        continue
                    e = self.events[event_str]

                    # 不包括返回的边
                    if ("name=BACK" in event_str):
                        continue

                    if ('view' in e):
                        config_id = str(e['view']['temp_id'])
                        parent = str(e['view']['parent'])
                        view_str = e['view']["view_str"]
                        bounds = e['view']["bounds"]
                        config_node, config_description = self.get_related_descrition(src_state, int(e['view']['temp_id']),
                                                                                      view_str, bounds)
                        if (config_node):
                            cap = self.get_config_cap(config_node)
                            config_description = cap + config_description

                        if (src_state not in config_nodes):
                            config_nodes[src_state] = []

                        config_id = config_id + "-" + parent + "-" + src_state[:5]
                        if (config_id not in self.uiTree.nodes_dict):
                            n = Node(config_id, description=config_description, state=src_state)
                            self.uiTree.nodes_dict[config_id] = n
                            event_config[event_str] = n
                            config_nodes[src_state].append(n)
                            self.uiTree.add_node(n)
                        else:
                            event_config[event_str] = self.uiTree.nodes_dict[config_id]
                            config_nodes[src_state].append(self.uiTree.nodes_dict[config_id])
                    elif ('intent' in e and 'am start' in e['intent']):
                        config_id = "000"
                        if (config_id not in self.uiTree.nodes_dict):
                            n = Node(config_id, description="STARTAPP", state=src_state)
                            self.uiTree.nodes_dict[config_id] = n
                            event_config[event_str] = n
                            self.uiTree.add_node(n)
                            self.uiTree.start_node = config_id
                        else:
                            event_config[event_str] = self.uiTree.nodes_dict[config_id]

        indegree = {}
        for n in self.uiTree.nodes:
            indegree[n] = 0
        for utg_edge in self.utg_graph.utg_edges:
            if utg_edge['to'] not in config_nodes:
                continue
            for config in config_nodes[utg_edge['to']]:
                if (utg_edge['events'] == []):
                    continue
                event_str = utg_edge['events'][0]['event_str']
                if event_str not in event_config:
                    continue

                if (indegree[config] > 2):
                    continue
                e = Edge(event_config[event_str], config, event_str)
                indegree[config] += 1
                self.uiTree.add_edge(e)

        # start_node = Node("000", description="STARTAPP", state='')
        # self.uiTree.nodes_dict["000"] = start_node
        # self.uiTree.add_node(start_node)

        start_nodes = []
        for n in indegree:
            if (indegree[n] == 0):
                start_nodes.append(n)

        # print("[DBG]: UITree start node:", start_node)
        UITree.draw(self.uiTree, settings.Confiot_output)

        config_paths = []
        for s in start_nodes:
            for n in self.uiTree.nodes:
                p = self.uiTree.find_shortest_path(s.name, n.name)
                if (not p or p == []):
                    continue
                # p = [i.description for i in p]
                config_paths.append(p)

        return config_paths
