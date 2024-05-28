from collections import deque
import warnings
from PIL import Image, ImageDraw
from openai import OpenAI
from base64 import b64encode
import os
import re
import json


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


def png_resize(file, resol_x, resol_y):
    from PIL import Image

    try:
        # 打开图片
        image = Image.open(file)

        # 设置新的分辨率
        new_resolution = (resol_x, resol_y)

        # 改变分辨率
        resized_image = image.resize(new_resolution)

        # 保存图片
        resized_image.save(f"{file}.resize.png")

        return f"{file}.resize"
    except Exception as e:
        print("[ERR]: Failed to resize the image " + file, e)
        return -1


def decode_bytes(byte_data):
    try:
        # 尝试用UTF-8解码
        decoded_str = byte_data.decode('utf-8')
        return decoded_str
    except UnicodeDecodeError:
        try:
            # 尝试用Unicode转义序列解码
            unicode_str = byte_data.decode('unicode_escape')
            return unicode_str
        except UnicodeDecodeError:
            print("无法解码字节数据")


class Node:

    def __init__(self, name, description='', state=''):
        self.name = name
        self.description = description
        self.state = state

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

        if (edge.event_strs):
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

    @staticmethod
    def draw(graph, output_dir):
        dot_content = "digraph G {\n"

        added_edges = set()

        for edge in graph.edges:
            edge_str = f'  "{edge.start_node.name}" -> "{edge.end_node.name}"'
            if edge_str not in added_edges:
                dot_content += edge_str + "\n"
                added_edges.add(edge_str)
        for node in graph.nodes:
            dot_content += f'  "{node.name}" [label="{node.name}\\n{node.description}"]\n'

        dot_content += "}"

        with open(f"{output_dir}/UITree.dot", "w") as dot_file:
            dot_file.write(dot_content)


class UITree(DirectedGraph):

    def __init__(self):
        # config-tempid
        self.nodes = []

        self.nodes_dict = {}

        # event (represent the current value of the configuration)
        self.edges = []
        # {"src_node": {"dst_node": ["e1"]}}
        self.edges_dict = {}
        self.start_node = None


def get_longest_task(tasks):
    longest_string = max(tasks, key=len)
    return longest_string


def add_testdata_for_task(task):
    username = ["visitor", "user", "remove", "guest", "name"]

    testdata = {
        "age": "with the age 18",
        "gender": "with the gender `male`",
        "weight": "with the weight 100",
        "height": "with the weight 150",
    }

    log = ["records", "log"]

    automation = ["automation", "timer"]

    result = task
    for key in username:
        if (key in task.lower()):
            if (key == "name"):
                result = result + ", with the name `TESTName`"
            else:
                result = result + ", with the user name `guest`, age 18, gender `male`, weight `100`, height `150`"
            break

    for i in log:
        if (i in task.lower()):
            result = result + ", and remove it."

    for i in automation:
        if (i in task.lower()):
            result = result + ", with the name `TESTAutomation` and the task: Activate it in 1 minute."

    for key in testdata:
        if (key in task.lower()):
            result = result + f", {testdata[key]}"

    return result


# 解析GPT返回的mapping
def parse_config_resource_mapping(text):
    ConfigResourceMapper = []

    pattern = re.compile(r'Action path id: (.*?)\n.*?Action path: (.*?)\n.*?Tasks: (.*?)\n.*?Related resources: (.*?)\n',
                         re.DOTALL)
    matches = pattern.findall(text)

    # print(matches)

    for match in matches:
        try:
            config_id = eval(match[0].replace('<', '').replace('>', ''))
            config_path = match[1].replace('<', '').replace('>', '')  # 使用 eval 将字符串转为列表
            if ("<" in match[2] and ">" in match[2]):
                task = match[2].split(">,")
            elif ("\n" in match[2]):
                task = match[2].split("\n")
            else:
                task = match[2].split(",")
            related_resources = match[3].split(',')
            related_resources = [r.strip() for r in related_resources]

            for i in range(len(task)):
                task[i] = task[i].replace('<', '').replace('>', '')
                task[i] = add_testdata_for_task(task[i])

            ConfigResourceMapper.append({"Id": config_id, "Path": config_path, "Tasks": task, "Resources": related_resources})

            print("Configuration Id:", config_id)
            print("Configuration Path:", config_path)
            print("Task:", task)
            print("Related Resources:", related_resources)
        except Exception as e:
            print(e)

    print(
        "----------------------------------------------------------------------------------------------------------------------------------------------"
    )
    return ConfigResourceMapper


def query_config_resource_mapping(prompt):
    import requests
    api_key = os.environ.get("OPENAI_API_KEY")
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}

    # syncxxx: use gpt-4 new model
    payload = {"model": "gpt-4-1106-preview", "messages": [{"role": "user", "content": prompt}]}
    # payload = {"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": prompt}]}

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    # URL = os.environ['OPENAI_API_KEY']  # NOTE: replace with your own GPT API
    # body = {"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": prompt}], "stream": True}
    # headers = {'Content-Type': 'application/json', 'path': 'v1/chat/completions'}
    # r = requests.post(url=URL, json=body, headers=headers)
    #return response.content.decode()

    try:
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        print("[GPT ERROR]: ", e, response.content)
        return response.text


def filter_configurations(ConfigResourceMapper):
    FilteredConfigResourceMapper = []

    resources = [
        "Device sensor status", "Device actuator status", "Device metadata", "Device usage log",
        "Personally Identifiable Information", "User list", "User's role", "Device list", "Automation list",
        "Third-party services"
    ]
    access = ['view', 'access', 'retrieve', 'open', 'obtain', 'read', 'inspect']
    adds = ['add ', 'include', 'append', 'insert', 'attach', 'incorporate', 'integrate', 'augment', 'expand', 'combine']
    removes = [
        "initiate", "set ", "edit", "modify", "change", "configure", "remove", "erase", "delete", "eliminate", "replace",
        "clear"
    ]

    norepeat_mapper = []
    norepeat_tasks = []
    for c in ConfigResourceMapper[::-1]:
        if (c["Tasks"] not in norepeat_tasks):
            norepeat_mapper.append(c)
            norepeat_tasks.append(c["Tasks"])

    for c in norepeat_mapper:
        tasks = c["Tasks"]

        if (len(tasks) < 1):
            continue
        else:
            access_tasks = []
            add_tasks = []
            remove_tasks = []
            for task in tasks:
                task = task.lower()
                for v_1 in access:
                    if (v_1 in task):
                        access_tasks.append(task)
                for v_2 in adds:
                    if (v_2 in task):
                        add_tasks.append(task)
                for v_3 in removes:
                    if (v_3 in task):
                        remove_tasks.append(task)
            # 如果resource只有N/A或是空的
            if (len(c["Resources"]) == 0):
                continue
            elif (len(c["Resources"]) == 1):
                if (c["Resources"][0].strip().replace("'", '').replace('"', '') == '' or
                        'N/A'.lower() in c["Resources"][0].lower()):
                    continue
            if (len(tasks) == 1):
                if (tasks[0].strip() == '' or "lack of information" in tasks[0] or "unable to" in tasks[0]):
                    continue
                if (len(add_tasks) == 0 and len(remove_tasks) == 0):
                    continue
                FilteredConfigResourceMapper.append(c)
                continue

            # 如果同时有remove和add，则保留remove
            if (len(add_tasks) > 0 and len(remove_tasks) > 0):
                c["Tasks"] = [
                    get_longest_task(remove_tasks),
                ]
                FilteredConfigResourceMapper.append(c)
            elif (len(add_tasks) > 0):
                c["Tasks"] = [
                    get_longest_task(add_tasks),
                ]
                FilteredConfigResourceMapper.append(c)
            elif (len(remove_tasks) > 0):
                c["Tasks"] = [
                    get_longest_task(remove_tasks),
                ]
                FilteredConfigResourceMapper.append(c)
            elif (len(add_tasks) == 0 and len(remove_tasks) == 0):
                continue
            else:
                c["Tasks"] = [
                    get_longest_task(tasks),
                ]
                FilteredConfigResourceMapper.append(c)
    return FilteredConfigResourceMapper


def get_ConfigResourceMapper_from_file(file, dir=None):
    content = ''
    with open(file, 'r') as f:
        content = f.read()

    ConfigResourceMapper = json.loads(content)
    filtered_mapping_path = ''
    if (dir):
        filtered_mapping_path = dir + "/FilteredConfigResourceMapping.txt"
    if ("FilteredConfigResourceMapping" not in file and filtered_mapping_path != '' and
            not os.path.exists(filtered_mapping_path)):
        FilteredConfigResourceMapper = filter_configurations(ConfigResourceMapper)
        with open(dir + "/FilteredConfigResourceMapping.txt", 'w') as f:
            f.write(json.dumps(FilteredConfigResourceMapper))
    return ConfigResourceMapper


def progress(percent, width=50):
    if percent >= 100:
        percent = 100

    show_str = ('[%%-%ds]' % width) % (int(width * percent / 100) * "#")
    print('\r%s %d%%' % (show_str, percent), end='')


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
