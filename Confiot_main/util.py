from collections import deque
import warnings
from PIL import Image, ImageDraw


def deprecated(func):

    def wrapper(*args, **kwargs):
        warnings.warn(f"Function {func.__name__} is deprecated.", category=DeprecationWarning)
        return func(*args, **kwargs)

    return wrapper


def draw_rect_with_bounds(file, bounds):
    # 打开图像文件
    image = Image.open(file)

    # 创建一个可绘制对象
    draw = ImageDraw.Draw(image)

    # 定义框的坐标
    x1, y1 = bounds[0]
    x2, y2 = bounds[1]

    # 绘制红色框
    draw.line([(x1, y1), (x2, y1)], fill="red", width=2)  # 上边
    draw.line([(x2, y1), (x2, y2)], fill="red", width=2)  # 右边
    draw.line([(x2, y2), (x1, y2)], fill="red", width=2)  # 下边
    draw.line([(x1, y2), (x1, y1)], fill="red", width=2)  # 左边

    # 保存修改后的图像
    image.save(file)


class Node:

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name


class Edge:

    def __init__(self, start_node, end_node, event_strs: list):
        self.start_node = start_node
        self.end_node = end_node
        self.event_strs = event_strs


class DirectedGraph:

    def __init__(self):
        # utg.js中原始的nodes以及edges
        self.utg_nodes = []
        self.utg_edges = []

        # DirectedGraph中的nodes以及edges
        self.nodes = []
        # {"state_str": Node}
        self.nodes_dict = {}

        self.edges = []
        # {"src_node": {"dst_node": ["e1", "e2"]}}
        self.edges_dict = {}
        self.start_node = None

    def add_node(self, node: Node):
        self.nodes.append(node)
        self.nodes_dict[node.name] = node

    def add_edge(self, edge: Edge):
        self.edges.append(edge)
        if (edge.start_node.name not in self.edges_dict):
            self.edges_dict[edge.start_node.name] = {}

        if (edge.end_node.name not in self.edges_dict[edge.start_node.name]):
            self.edges_dict[edge.start_node.name][edge.end_node.name] = []

        for event in edge.event_strs:
            self.edges_dict[edge.start_node.name][edge.end_node.name].append(event)

    def find_shortest_path(self, node_1: str, node_2: str):

        if node_1 not in self.nodes_dict or node_2 not in self.nodes_dict:
            print("[ERR]: Cannot find node")
            return None

        node_1 = self.nodes_dict[node_1]
        node_2 = self.nodes_dict[node_2]
        # 使用广度优先搜索算法寻找最短路径
        visited = set()
        queue = deque([(node_1, [])])

        while queue:
            current_node, path = queue.popleft()
            if current_node == node_2:
                return path + [current_node]

            if current_node not in visited:
                visited.add(current_node)
                neighbors = self.get_neighbors(current_node)
                for neighbor in neighbors:
                    queue.append((neighbor, path + [current_node]))

        return None

    def get_neighbors(self, node):
        neighbors = []
        for edge in self.edges:
            if edge.start_node == node:
                neighbors.append(edge.end_node)
        return neighbors


if __name__ == "__main__":
    # 创建有向图
    graph = DirectedGraph()

    # 创建节点
    node_1 = Node("Node 1")
    node_2 = Node("Node 2")
    node_3 = Node("Node 3")
    node_4 = Node("Node 4")
    node_5 = Node("Node 5")

    # 添加节点到图中
    graph.add_node(node_1)
    graph.add_node(node_2)
    graph.add_node(node_3)
    graph.add_node(node_4)
    graph.add_node(node_5)

    # 创建边
    edge_1 = Edge(node_1, node_2)
    edge_2 = Edge(node_1, node_3)
    edge_3 = Edge(node_2, node_3)
    edge_4 = Edge(node_3, node_4)
    edge_5 = Edge(node_4, node_5)
    edge_6 = Edge(node_1, node_5)

    # 添加边到图中
    graph.add_edge(edge_1)
    graph.add_edge(edge_2)
    graph.add_edge(edge_3)
    graph.add_edge(edge_4)
    graph.add_edge(edge_5)
    graph.add_edge(edge_6)

    # 寻找从node_1到node_5的最短路径
    shortest_path = graph.find_shortest_path("Node 1", "Node 5")
    for node in shortest_path:
        print(node)
