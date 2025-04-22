from collections import deque
import warnings
from PIL import Image, ImageDraw
from base64 import b64encode
import os
import re
import json


def jaccard_similarity(list1, list2):
    set1, set2 = set(list1), set(list2)
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    # print(intersection / union)
    return intersection / union


def deprecated(func):

    def wrapper(*args, **kwargs):
        warnings.warn(
            f"Function {func.__name__} is deprecated.", category=DeprecationWarning
        )
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


def is_blank_or_empty(s: str):
    if not s.strip():
        return True

    if not bool(re.search(r"\b[a-zA-Z\u4e00-\u9fff]+\b", s)):
        return True

    return False


def decode_bytes(byte_data):
    try:
        # 尝试用UTF-8解码
        decoded_str = byte_data.decode("utf-8")

        if bool(re.search(r"\\[uU]{1}[0-9a-fA-F]+", decoded_str)):
            decoded_str = decoded_str.encode("utf-8").decode("unicode_escape")

        return decoded_str
    except UnicodeDecodeError:
        try:
            # 尝试用Unicode转义序列解码
            unicode_str = byte_data.decode("unicode_escape")
            return unicode_str
        except UnicodeDecodeError:
            print("无法解码字节数据")


class Node:

    def __init__(self, name, description="", state="", screenshot=None):
        self.name = name
        self.description = description
        self.state = state
        self.screenshot = screenshot
        self.level = -1

    def __str__(self):
        return self.name


class Edge:

    def __init__(self, start_node, end_node, event_str, description=None, view=None):
        self.start_node = start_node
        self.end_node = end_node
        self.event_str = event_str
        self.description = description
        self.view = view


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
        if edge.start_node.name not in self.edges_dict:
            self.edges_dict[edge.start_node.name] = {}

        if edge.end_node.name not in self.edges_dict[edge.start_node.name]:
            self.edges_dict[edge.start_node.name][edge.end_node.name] = []

        if edge.event_str:
            self.edges_dict[edge.start_node.name][edge.end_node.name].append(
                edge.event_str
            )

        if edge.description:
            self.edges_dict[edge.start_node.name][edge.end_node.name].append(
                edge.description
            )

    def set_node_level(self):
        for idx, node in enumerate(self.nodes):
            steps = self.find_shortest_path(self.start_node, node.name)
            if not steps:
                self.nodes[idx].level = 0
            else:
                self.nodes[idx].level = len(steps) - 1

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
            if edge.description:
                edge_str = f'  "{edge.start_node.name}" -> "{edge.end_node.name}" [label="{edge.description}"]'
            else:
                edge_str = f'  "{edge.start_node.name}" -> "{edge.end_node.name}"'
            if edge_str not in added_edges:
                dot_content += edge_str + "\n"
                added_edges.add(edge_str)
        for node in graph.nodes:
            dot_content += f'  "{node.name}" [label="{node.name}, level = {node.level}\\n{node.description}"]\n'

        dot_content += "}"

        with open(f"{output_dir}/UIPages.dot", "w") as dot_file:
            dot_file.write(dot_content)


class UITree(DirectedGraph):

    def __init__(self):
        # config-tempid
        self.nodes = []
        # {"name": Node}
        self.nodes_dict = {}

        # event (represent the current value of the configuration)
        self.edges = []
        # {"src_node": {"dst_node": [e,]}}
        self.edges_dict = {}
        # name of the start node
        self.start_node = None

        # 有向图

    def add_edge(self, edge: Edge):
        self.edges.append(edge)
        if edge.start_node.name not in self.edges_dict:
            self.edges_dict[edge.start_node.name] = {}

        if edge.end_node.name not in self.edges_dict[edge.start_node.name]:
            self.edges_dict[edge.start_node.name][edge.end_node.name] = []

        self.edges_dict[edge.start_node.name][edge.end_node.name].append(edge)

        if edge.description:
            self.edges_dict[edge.start_node.name][edge.end_node.name].append(
                edge.description
            )

    #


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
        if key in task.lower():
            if key == "name":
                result = result + ", with the name `TESTName`"
            else:
                result = (
                    result
                    + ", with the user name `guest`, age 18, gender `male`, weight `100`, height `150`"
                )
            break

    for i in log:
        if i in task.lower():
            result = result + ", and remove it."

    for i in automation:
        if i in task.lower():
            result = (
                result
                + ", with the name `TESTAutomation` and the task: Activate it in 1 minute."
            )

    for key in testdata:
        if key in task.lower():
            result = result + f", {testdata[key]}"

    return result


# 解析GPT返回的mapping
def parse_config_resource_mapping(text):
    ConfigResourceMapper = []

    pattern = re.compile(
        r"Action path id: (.*?)\n.*?Action path: (.*?)\n.*?Tasks: (.*?)\n.*?Related resources: (.*?)\n",
        re.DOTALL,
    )
    matches = pattern.findall(text)

    # print(matches)

    for match in matches:
        try:
            config_id = eval(match[0].replace("<", "").replace(">", ""))
            config_path = (
                match[1].replace("<", "").replace(">", "")
            )  # 使用 eval 将字符串转为列表
            if "<" in match[2] and ">" in match[2]:
                task = match[2].split(">,")
            elif "\n" in match[2]:
                task = match[2].split("\n")
            else:
                task = match[2].split(",")
            related_resources = match[3].split(",")
            related_resources = [r.strip() for r in related_resources]

            for i in range(len(task)):
                task[i] = task[i].replace("<", "").replace(">", "")
                # task[i] = add_testdata_for_task(task[i])

            ConfigResourceMapper.append(
                {
                    "Id": config_id,
                    "Path": config_path,
                    "Tasks": task,
                    "Resources": related_resources,
                }
            )

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


# 解析GPT返回的mapping
def Plugin_parse_config_resource_mapping(text):
    ConfigResourceMapper = []

    pattern = re.compile(
        r"Action path id: (.*?)\n.*?Action path: (.*?)\n.*?Tasks: (.*?)\n.*?Related resources: (.*?)\n",
        re.DOTALL,
    )
    matches = pattern.findall(text)

    # print(matches)

    for match in matches:
        try:
            config_id = eval(match[0].replace("<", "").replace(">", ""))
            config_path = (
                match[1].replace("<", "").replace(">", "")
            )  # 使用 eval 将字符串转为列表
            if "<" in match[2] and ">" in match[2]:
                task = match[2].split(">,")
            elif "\n" in match[2]:
                task = match[2].split("\n")
            else:
                task = match[2].split(",")
            _resources = re.findall("<(.*?)>", match[3])
            related_resources = []

            for r in _resources:
                if "," not in r:
                    continue
                op_index = r.index(",")
                related_resources.append(
                    [r[:op_index].strip(), r[op_index + 1 :].strip()]
                )

            for i in range(len(task)):
                task[i] = task[i].replace("<", "").replace(">", "")
                task[i] = add_testdata_for_task(task[i])

            ConfigResourceMapper.append(
                {
                    "Id": config_id,
                    "Path": config_path,
                    "Tasks": task,
                    "Resources": related_resources,
                }
            )

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


def parse_config_resource_mapping_v2_0(text):
    ConfigResourceMapper = []

    matches = re.findall(
        r"\{(.|\n)*?\"Page ID\":(.*?)\n.*?\"Configuration tasks\":(.*?)\n.*?\"Related operations\":(.*?)\n.*?\"Dependencies\":(.*?)\n.*?\"Reason\"",
        text,
    )

    # print(matches)

    task_id = 0
    for match in matches:
        task_id += 1
        try:
            page = match[1].replace('",', "").replace('"', "").strip()
            task = match[2].replace('",', "")
            realted_operations = []
            dependencies = match[4].replace("],", "]").strip()

            _operations = (
                match[3]
                .replace("],", "]")
                .replace('"', "")
                .replace("(", "")
                .replace(")", "")
                .replace("{", "")
                .replace("}", "")
                .replace("`", "")
                .replace("'", "")
                .replace("<", "")
                .replace(">", "")
                .replace("[", "")
                .replace("]", "")
                .split(",")
            )

            for o in _operations:
                digits = re.findall(r"\d", o)
                realted_operations.append(int("".join(digits)))

            if "none" in task.lower() or len(realted_operations) == 0:
                continue

            ConfigResourceMapper.append(
                {
                    "Task ID": task_id,
                    "Page ID": page,
                    "Tasks": [
                        task,
                    ],
                    "Related operations": realted_operations,
                    "Dependencies": dependencies,
                }
            )

            print("Configuration operations:", realted_operations)
            print("Task:", task)
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
    payload = {"model": "gpt-4o", "messages": [{"role": "user", "content": prompt}]}
    # payload = {"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": prompt}]}

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )

    # URL = os.environ['OPENAI_API_KEY']  # NOTE: replace with your own GPT API
    # body = {"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": prompt}], "stream": True}
    # headers = {'Content-Type': 'application/json', 'path': 'v1/chat/completions'}
    # r = requests.post(url=URL, json=body, headers=headers)
    # return response.content.decode()

    try:
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        print("[GPT ERROR]: ", e, response.content)
        return response.text


def query_config_operation_mapping_with_structured_output(system_prompt, user_prompt, llm="xxx"):
    if (llm == "deepseek"):
        return query_config_operation_mapping_deepseek_v3(system_prompt, user_prompt)

    if (llm == "gemini-2.5"):
        return query_config_operation_mapping_gemini_2_5(system_prompt, user_prompt)

    if (llm == "claude-3.7"):
        return query_config_operation_mapping_claude_3_7(system_prompt, user_prompt)

    elif (llm == "qwen"):
        return query_config_operation_mapping_qwen(system_prompt, user_prompt)

    from pydantic import BaseModel
    from openai import OpenAI

    class ConfigurationFormat(BaseModel):
        task_id: str
        page_id: str
        task_content: str
        related_operations: list[str]
        dependencies: list[str]
        reason: str

    class response(BaseModel):
        configuration_tasks: list[ConfigurationFormat]

    client = OpenAI()
    completion = client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
        response_format=response,
    )

    event = completion.choices[0].message.parsed
    Configurations = []

    for r in event.configuration_tasks:
        task = {
            "Task ID": r.task_id,
            "Page ID": r.page_id,
            "Tasks": r.task_content,
            "Related operations": r.related_operations,
            "Dependencies": r.dependencies,
            "Reason": r.reason,
        }
        Configurations.append(task)


    return Configurations

def query_config_operation_mapping_gemini_2_5(system_prompt, user_prompt):
    from google import genai
    import os

    GEMINI_api_key=os.getenv("GEMINI_API_KEY")
    client = genai.Client(api_key=GEMINI_api_key)

    example_format = json.dumps([{'Task ID': 'Task-1', 'Page ID': 'Page-7', 'Tasks': 'Add Aqara or Mi Zigbee device', 'Related operations': ['operation_0',], 'Dependencies': ['Task-1'], 'Reason': 'The operations on Page-7 involve selecting different Zigbee devices to add them to the control hub. This task depends on navigating to Page-7 from Page-0, where users prepare to manage child devices.'}, {'Task ID': 'Task-2', 'Page ID': 'Page-7', 'Tasks': '', 'Related operations': ['operation_0',], 'Dependencies': ['Task-1'], 'Reason': ''},], ensure_ascii=False)

    full_prompt = (
        system_prompt + "\n\n\n"
        "EXAMPLE JSON OUTPUT:\n"
        f"{example_format}\n\n"
        f"{user_prompt}"
    )

    response = client.models.generate_content(
            model="gemini-2.5-pro-exp-03-25",
            config={
                'response_mime_type': 'application/json'
            },
            contents=full_prompt
        )

    Configurations = json.loads(response.text)

    return Configurations
    # print(Configurations)

def query_config_operation_mapping_claude_3_7(system_prompt, user_prompt):
    import anthropic, os, json
    Claude_api_key=os.getenv("CLAUDE_API_KEY")

    example_format = json.dumps([{'Task ID': 'Task-1', 'Page ID': 'Page-7', 'Tasks': 'Add Aqara or Mi Zigbee device', 'Related operations': ['operation_0',], 'Dependencies': ['Task-1'], 'Reason': 'The operations on Page-7 involve selecting different Zigbee devices to add them to the control hub. This task depends on navigating to Page-7 from Page-0, where users prepare to manage child devices.'}, {'Task ID': 'Task-2', 'Page ID': 'Page-7', 'Tasks': '', 'Related operations': ['operation_0',], 'Dependencies': ['Task-1'], 'Reason': ''},], ensure_ascii=False)


    full_user_prompt = (
        "EXAMPLE JSON OUTPUT:\n"
        f"{example_format}\n\n"
        f"{user_prompt}"
        "Only return a valid JSON array. Do not include any markdown, explanations, or text outside the JSON."
    )

    client = anthropic.Anthropic(
        # defaults to os.environ.get("ANTHROPIC_API_KEY")
        api_key=Claude_api_key,
    )
    message = client.messages.create(
        model="claude-3-7-sonnet-20250219",
        max_tokens=1024,
        system=system_prompt,
        messages=[
            {"role": "user", "content": full_user_prompt}
        ]
    )

    # print(message.content[0].text)

    Configurations = json.loads(message.content[0].text)
    # print(Configurations)
    return Configurations

def query_config_operation_mapping_deepseek_v3(system_prompt, user_prompt):
    from openai import OpenAI
    import json

    example_format = json.dumps({'Task-1':{'page_id': 'Page-7', 'task_content': 'Add Aqara or Mi Zigbee device', 'related_operations': ['operation_0',], 'dependencies': ['Task-1'], 'reason': 'The operations on Page-7 involve selecting different Zigbee devices to add them to the control hub. This task depends on navigating to Page-7 from Page-0, where users prepare to manage child devices.'}, 'Task-2':{'page_id': 'Page-7', 'task_content': '', 'related_operations': ['operation_0',], 'dependencies': ['Task-1'], 'reason': ''}},
        ensure_ascii=False
    )




    client = OpenAI(
        # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
        api_key=os.getenv("DEEPSEEK_API_KEY"),  # 如何获取API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
        base_url="https://api.deepseek.com"
    )


    completion = client.chat.completions.create(
        model="deepseek-chat",  # 此处以 deepseek-r1 为例，可按需更换模型名称。
        messages=[
            {
                "role": "system",
                "content": system_prompt + "\n\n\n" + f'''
                    EXAMPLE JSON OUTPUT:
                    {example_format}
                    ''',
            },
            {'role': 'user', 'content': user_prompt}
        ],
        response_format={"type": "json_object"},
    )

    Configurations = []
    try:
        ret = json.loads(completion.choices[0].message.content)
        for task_id in ret:
            c =  {"Task ID": task_id, "Page ID": ret[task_id]["page_id"], "Tasks": ret[task_id]["task_content"], "Related operations": ret[task_id]["related_operations"], "Dependencies": ret[task_id]["dependencies"], "Reason": ret[task_id]["reason"] }
            Configurations.append(c)
    except:
        pass

    return Configurations


def query_config_operation_mapping_qwen(system_prompt, user_prompt):
    from openai import OpenAI
    import json

    example_format = json.dumps({'Task-1':{'page_id': 'Page-7', 'task_content': 'Add Aqara or Mi Zigbee device', 'related_operations': ['operation_0',], 'dependencies': ['Task-1'], 'reason': 'The operations on Page-7 involve selecting different Zigbee devices to add them to the control hub. This task depends on navigating to Page-7 from Page-0, where users prepare to manage child devices.'}, 'Task-2':{'page_id': 'Page-7', 'task_content': '', 'related_operations': ['operation_0',], 'dependencies': ['Task-1'], 'reason': ''}},
        ensure_ascii=False
    )



    client = OpenAI(
        # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
        api_key=os.getenv("QWEN_API_KEY"),  # 如何获取API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
    )


    completion = client.chat.completions.create(
        model="qwen2.5-vl-32b-instruct",
        messages=[
            {
                "role": "system",
                "content": system_prompt + "\n\n\n" + f'''
                    EXAMPLE JSON OUTPUT:
                    {example_format}
                    ''',
            },
            {'role': 'user', 'content': user_prompt}
        ],
        response_format={"type": "json_object"},
    )

    Configurations = []
    try:
        ret = json.loads(completion.choices[0].message.content)
        for task_id in ret:
            c =  {"Task ID": task_id, "Page ID": ret[task_id]["page_id"], "Tasks": ret[task_id]["task_content"], "Related operations": ret[task_id]["related_operations"], "Dependencies": ret[task_id]["dependencies"], "Reason": ret[task_id]["reason"] }
            Configurations.append(c)
    except:
        pass

    return Configurations




def query_Confiot_identification(system_prompt, user_prompt, llm="xxx"):
    from pydantic import BaseModel
    from openai import OpenAI

    if(llm == "deepseek"):
        client = OpenAI(
            # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
            api_key=os.getenv("DEEPSEEK_API_KEY"),  # 如何获取API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
            base_url="https://api.deepseek.com"
        )


        completion = client.chat.completions.create(
            model="deepseek-chat",  # 此处以 deepseek-r1 为例，可按需更换模型名称。
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {'role': 'user', 'content': user_prompt}
            ]
        )

        try:
            return completion.choices[0].message.content
        except:
            pass

    elif(llm == "qwen"):
        client = OpenAI(
            # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
            api_key=os.getenv("QWEN_API_KEY"),  # 如何获取API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
            base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
        )


        completion = client.chat.completions.create(
            model="qwen2.5-vl-32b-instruct",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {'role': 'user', 'content': user_prompt}
            ]
        )

        try:
            return completion.choices[0].message.content
        except:
            pass

    else:
        class ViolationFormat(BaseModel):
            violated_criterion_id: str
            configuration_resource: str
            reason: str
            Confidence_score: str
            Guess_steps: list[str]

        class response(BaseModel):
            violations: list[ViolationFormat]
            resource_update: list[str]

        client = OpenAI()
        completion = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
            response_format=response,
        )

        event = completion.choices[0].message.parsed

        return event


def filter_configurations(Configurations):
    FilteredConfigurations = []

    resources = [
        "Device sensor status",
        "Device actuator status",
        "Device metadata",
        "Device usage log",
        "Personally Identifiable Information",
        "User list",
        "User's role",
        "Device list",
        "Automation list",
        "Third-party services",
    ]
    access = ["view", "access", "retrieve", "open", "obtain", "read", "inspect"]
    adds = [
        "add ",
        "adding",
        "include",
        "append",
        "insert",
        "attach",
        "incorporate",
        "integrate",
        "augment",
        "expand",
        "combine",
        "select",
        "choose",
        "rename",
    ]
    removes = [
        "initiate",
        "set ",
        "edit",
        "modify",
        "change",
        "configure",
        "remove",
        "erase",
        "delete",
        "eliminate",
        "replace",
        "clear",
    ]

    access_tasks = []
    add_tasks = []
    remove_tasks = []
    for config in Configurations:
        task = config["Tasks"].lower()
        filtered = False
        for v_1 in access:
            if v_1 in task:
                access_tasks.append(config)
                filtered = True
                break
        if filtered:
            continue
        for v_2 in adds:
            if v_2 in task:
                add_tasks.append(config)
                filtered = True
                break
        if filtered:
            continue
        for v_3 in removes:
            if v_3 in task:
                remove_tasks.append(config)
                filtered = True
                break

    cid = 0
    for config in add_tasks + remove_tasks:
        config["Id"] = cid
        FilteredConfigurations.append(config)
        cid += 1

    return FilteredConfigurations


def get_ConfigResourceMapper_from_file(file, dir=None):
    content = ""
    with open(file, "r") as f:
        content = f.read()

    ConfigResourceMapper = json.loads(content)
    filtered_mapping_path = ""
    if dir:
        filtered_mapping_path = dir + "/FilteredConfigResourceMapping.txt"
    if (
        "FilteredConfigResourceMapping" not in file
        and filtered_mapping_path != ""
        and not os.path.exists(filtered_mapping_path)
    ):
        FilteredConfigResourceMapper = filter_configurations(ConfigResourceMapper)
        with open(dir + "/FilteredConfigResourceMapping.txt", "w") as f:
            f.write(json.dumps(FilteredConfigResourceMapper))
    return ConfigResourceMapper


def progress(percent, width=50):
    if percent >= 100:
        percent = 100

    show_str = ("[%%-%ds]" % width) % (int(width * percent / 100) * "#")
    print("\r%s %d%%" % (show_str, percent), end="")


def get_task_replay_steps(task_id, replay_step_records_dir):
    event_dict_steps = []
    with open(replay_step_records_dir + f"/Task-{str(task_id)}.json", "r") as f:
        records = json.load(f)
        for record in records:
            event_dict_steps.append(record)

    return event_dict_steps


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
