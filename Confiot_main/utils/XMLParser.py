# 1. get graph from the xml file
# 2. get the path
# 3. get the controllability and text of each path
# 4. get text of each node

from xml.dom.minidom import parse
import ast


class XMLParser():

    def __init__(self, xml_path):
        self.xml_path = xml_path
        self.dom_tree = self.get_dom_tree()
        self.root = self.get_root()
        self.nodes = self.get_nodes()
        self.graph = self.get_node_tree()

        # parse views from nodes

        self.views = []
        for n in self.nodes:
            view = {}
            view["checkable"] = eval(self.get_elements_by_tag_name(n, "checkable"))
            view["selected"] = eval(self.get_elements_by_tag_name(n, "selected"))
            view["scrollable"] = eval(self.get_elements_by_tag_name(n, "scrollable"))
            view["long_clickable"] = eval(self.get_elements_by_tag_name(n, "long_clickable"))
            view["resource_id"] = None if self.get_elements_by_tag_name(
                n, "resource_id") == "None" else self.get_elements_by_tag_name(n, "resource_id")
            view["visible"] = eval(self.get_elements_by_tag_name(n, "visible"))
            view["enabled"] = eval(self.get_elements_by_tag_name(n, "enabled"))
            view["clickable"] = eval(self.get_elements_by_tag_name(n, "clickable"))
            view["is_password"] = eval(self.get_elements_by_tag_name(n, "is_password"))
            view["checked"] = eval(self.get_elements_by_tag_name(n, "checked"))
            view["content_description"] = None if self.get_elements_by_tag_name(
                n, "content_description") == "None" else self.get_elements_by_tag_name(n, "content_description")
            view["focused"] = eval(self.get_elements_by_tag_name(n, "focused"))
            view["class"] = None if self.get_elements_by_tag_name(n, "class") == "None" else self.get_elements_by_tag_name(
                n, "class")
            view["children"] = eval(self.get_elements_by_tag_name(n, "children"))
            view["child_count"] = eval(self.get_elements_by_tag_name(n, "child_count"))
            view["package"] = None if self.get_elements_by_tag_name(n, "package") == "None" else self.get_elements_by_tag_name(
                n, "package")
            view["text"] = None if self.get_elements_by_tag_name(n, "text") == "None" else self.get_elements_by_tag_name(
                n, "text")
            view["bounds"] = eval(self.get_elements_by_tag_name(n, "bounds"))
            view["editable"] = eval(self.get_elements_by_tag_name(n, "editable"))
            view["focusable"] = eval(self.get_elements_by_tag_name(n, "focusable"))
            view["parent"] = eval(self.get_elements_by_tag_name(n, "parent"))
            view["temp_id"] = eval(self.get_elements_by_tag_name(n, "temp_id"))
            view["size"] = self.get_elements_by_tag_name(n, "size")
            self.views.append(view)

        # self.all_paths = self.get_all_paths(self.graph, 0)
        # self.paths_dict = self.get_paths_dict()
        # self.paths_controllability = self.get_path_controllability()
        # self.paths_text = self.get_path_text()

    def get_dom_tree(self):
        return parse(self.xml_path)

    def get_root(self):
        return self.dom_tree.documentElement

    def get_nodes(self):
        nodes = []
        for node in self.dom_tree.getElementsByTagName("Node"):
            nodes.append(node)
        return nodes

    def get_text(self, nodelist):
        rc = []
        for node in nodelist:
            if node.nodeType == node.TEXT_NODE:
                rc.append(node.data)
        return ''.join(rc)

    def get_elements_by_tag_name(self, node, tag_name):
        return self.get_text(node.getElementsByTagName(tag_name)[0].childNodes)

    def get_node_tree(self):
        graph = {}

        for node in self.nodes:
            try:
                node_id = ast.literal_eval(self.get_elements_by_tag_name(node, "temp_id"))
                children_id = ast.literal_eval(self.get_elements_by_tag_name(node, "children"))
            except:
                Warning("node_id is not a number or children is not a list")

            if node_id not in graph.keys():
                graph[node_id] = children_id

        return graph

    def get_all_paths(self, graph, start, path=[]):
        # Node graph: {0: [1, 24, 25], 1: [2], 2: [3], 3: [4], 4: [5], 5: [6], 6: [7, 12, 16], 7: [8], 8: [9, 10, 11], 9: [], 10: [], 11: [], 12: [13, 15], 13: [14], 14: [], 15: [], 16: [17, 18, 19, 20, 21, 22, 23], 17: [], 18: [], 19: [], 20: [], 21: [], 22: [], 23: [], 24: [], 25: []}
        path = path + [start]

        # If the current node is a leaf, return the path
        if not graph[start]:
            return [path]

        paths = []
        for neighbor in graph[start]:
            new_paths = self.get_all_paths(graph, neighbor, path)
            paths.extend(new_paths)

        return paths

    def get_paths_dict(self):
        return {i: value for i, value in enumerate(self.all_paths)}

    def get_path_controllability(self):
        paths_controllability = {}
        for path in self.paths_dict:
            paths_controllability[path] = False
            for node_id in self.paths_dict[path]:
                for node in self.nodes:
                    nid = ast.literal_eval(self.get_elements_by_tag_name(node, "temp_id"))
                    if node_id == nid:
                        if self.get_elements_by_tag_name(node, "clickable") == "True" or self.get_elements_by_tag_name(
                                node, "checked") == "True":
                            paths_controllability[path] = True
        return paths_controllability

    def get_path_text(self):
        # <content_description>, <text>, <resource_id>
        paths_text = {}
        for path in self.paths_dict:
            paths_text[path] = []
            for node_id in self.paths_dict[path]:
                for node in self.nodes:
                    nid = ast.literal_eval(self.get_elements_by_tag_name(node, "temp_id"))
                    if node_id == nid:
                        paths_text[path].append({
                            "content_description": self.get_elements_by_tag_name(node, "content_description"),
                            "text": self.get_elements_by_tag_name(node, "text"),
                            "resource_id": self.get_elements_by_tag_name(node, "resource_id")
                        })
        return paths_text


if __name__ == "__main__":
    xml_file_path = "/root/documents/Output/mihome/mihome-smartscale/guest/result/Confiot/UI/000/guest:view_1d4feb9d2f14f7caa67cbbf3edb9ee2a.jpg16/before.xml"

    parser = XMLParser(xml_file_path)

    # test graph
    print(f"Node graph: {parser.graph}")

    # test paths
    for path in parser.all_paths:
        print(path)

    # test controllability
    print(parser.paths_controllability)

    # test text
    print(parser.paths_text)
