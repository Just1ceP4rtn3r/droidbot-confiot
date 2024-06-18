import re
import sys, os
import tree_sitter_javascript as tsjavascript
from tree_sitter import Language, Parser, Node
from xml.dom import minidom
from graphviz import Source
import copy
import csv
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

sys.path.append(BASE_DIR + "/../../")

from util import *


class ASTParser:
    # Challenges:
    # 1. 通过createStackNavigator提取的screens，如何映射到resource_id
    # 2. navigate("page") 函数参数可能是变量, 并且navigate也可能被其他函数调用
    # 3. Elements中的跳转的函数，也是变量，如何链接Elements与相应的跳转逻辑
    # 4. shared用户的UI 不同的问题

    def __init__(self, plugin_file):
        # {
        #     id: {
        #         "node": None,
        #         "raw": "",
        #         "dependencies": [id1, id2, id3, ...],
        #         "elements": {
        #             eid: {
        #                 "type": "",
        #                 "text": "",
        #             }
        #         },
        #         "navigations": {
        #             eid: {
        #                 "type": "",
        #                 "text": "",
        #             }
        #         },
        #     }
        # }
        self.resources = {}
        self.screens = None
        self.Elements = {}
        self.initialRouteName = None
        self.screen_in_resources = []
        self.strings = {}

        # Initialize parameters
        self.plugin_file = plugin_file
        self.raw_code = None
        self.root_node = None

        self.PY_LANGUAGE = Language(tsjavascript.language())
        self.parser = Parser(self.PY_LANGUAGE)

        code = None
        with open(self.plugin_file, "r", encoding="utf-8") as f:
            code = f.read().encode('utf-8')
        if (code):
            self.raw_code = code

        self.root_node = self.init_tree_sitter(self.raw_code)

    def start_parser(self):
        self.get_resources()
        for id in self.resources:
            self.resources[id]["node"] = self.init_tree_sitter(self.resources[id]["raw"])

    def init_tree_sitter(self, raw) -> Node:
        tree = self.parser.parse(raw.encode('utf-8') if isinstance(raw, str) else raw)
        return tree.root_node

    # Note: 部分resource_id 不存在，如_reactNative, 可能是import的库
    def get_resources(self):
        match = re.findall(r'__d\((.*?,[ ]?(\d+),[ ]?\[(.*?)\].*?)\);', self.raw_code.decode(), re.DOTALL)
        if match:
            for r in match:
                raw = r[0]
                id = int(r[1])
                dependencies = list(map(int, [i for i in r[2].split(',') if i.strip() != '']))
                self.resources[id] = {}
                self.resources[id]["raw"] = raw
                self.resources[id]["dependencies"] = dependencies

                if ("createStackNavigator" in raw or "LHInitPage" in raw):
                    self.screen_in_resources.append(id)

            return self.resources
        return None

    # def get_strings(self):
    #     query = """
    #     (pair
    #         key: (_) @key
    #         .
    #         value: (string) @val
    #     )
    #     """
    #     matches = self.query(query, self.root_node)
    #     for m in matches:
    #         if (m[1]):
    #             key = m[1]["key"]
    #             val = m[1]["val"]
    #             if()

    def query(self, query, node):
        try:
            q = self.PY_LANGUAGE.query(query)
            matches = q.matches(node)
            return matches
        except Exception as e:
            return []

    def elements_to_XML(self, elements, delete_elements=[]):
        dom = minidom.Document()
        root_node = dom.createElement('UIHierarchy')
        dom.appendChild(root_node)

        worklist = []
        for idx, e in enumerate(elements):
            if (not e["parent"] and e not in delete_elements):
                n = dom.createElement(decode_bytes(e['tag']))
                n.setAttribute("ID", str(e["ID"]))
                if (e["text"]):
                    n.setAttribute("text", str(e["text"]))
                if (e["onPress"]):
                    n.setAttribute("onPress", str(e["onPress"]))
                root_node.appendChild(n)
                worklist.append((e, n))

        while (worklist):
            e, father = worklist.pop()
            for child_id in e["childrens"]:
                child = elements[child_id]
                if (child in delete_elements):
                    continue
                n = dom.createElement(decode_bytes(child['tag']))
                n.setAttribute("ID", str(child["ID"]))
                if (child["text"]):
                    n.setAttribute("text", str(child["text"]))
                if (child["onPress"]):
                    n.setAttribute("onPress", str(child["onPress"]))
                father.appendChild(n)
                worklist.append((child, n))

        return dom

    def get_text_from_element(self, options, Paras):
        results = {}
        # 1. 通过options获取
        match = re.findall(r'(title|text|name|message):.*?([\'"])(.*?)\2', decode_bytes(options.text))
        for m in match:
            if (len(m) == 3):
                if (is_blank_or_empty(m[2]) or bool(re.search('(style|font|props|align)', m[0].lower()))):
                    continue
                if (m[0] in results):
                    results[m[0]] += ", " + m[2]
                else:
                    results[m[0]] = m[2]
        if (not match):
            my_query = """
            (pair
                key: ((property_identifier) @opt (#match? @opt "(title|text|name|message)"
                ))
                .
                value: ((_) @val)
            )
            """
            query_matches = self.query(my_query, options)

            title = None
            for m in query_matches:
                if (m[1]):
                    key = m[1]["opt"]
                    title = m[1]["val"]
                    if (is_blank_or_empty(decode_bytes(title.text)) or
                            bool(re.search('(style|font|props|align)',
                                           decode_bytes(key.text).lower()))):
                        continue
                    results[decode_bytes(key.text)] = decode_bytes(title.text)

        # 2. 通过Paras获取
        for p in Paras:
            p_text = decode_bytes(p.text.replace(b'"', b'').replace(b"'", b''))
            if (p.type == "string" and not is_blank_or_empty(p_text)):
                results["textElement"] = p_text

        return results

    def get_navigations_from_element(self, options):
        results = []

        # 1. 提取options中涉及到的navitate
        results += self.get_navigations_from_node(options)
        if (results):
            return results

        # 2. 提取onPress方法中调用的函数名
        query = """
        (pair
            key: ((property_identifier) @opt (#match? @opt ".*(onPress|onConfirm)"))
            .
            value: ((_) @val)
        )
        """
        matches = self.query(query, options)

        on_press = None
        for m in matches:
            if (m[1]):
                on_press = m[1]["val"]

                if (not on_press):
                    return results

                # 分析onPress中的函数调用信息
                query_call = """
                (call_expression
                    function: [
                        ((identifier) @function (#match? @function ".*open.*|.*goBack.*|.*exit.*"))
                        (member_expression property: ((property_identifier) @function (#match? @function ".*open.*|.*goBack.*|.*exit.*")))
                        (parenthesized_expression (sequence_expression (member_expression property: ((property_identifier) @function (#match? @function ".*open.*|.*goBack.*|.*exit.*")))))
                        ]
                )
                """
                matches = self.query(query_call, on_press)
                for m in matches:
                    if (m[1]):
                        func = m[1]["function"]
                        results.append(decode_bytes(func.text))

        # TODO: 2. 使用静态分析获取
        pass

        return results

    # 获取每个resource对应的elements（递归查询），以及相应的type、text
    def get_elements(self, node):
        query = """
        (call_expression
            function: [
                ((identifier) @function (#match? @function ".*createElement"))
                (member_expression property: ((property_identifier) @function (#match? @function ".*createElement")))
                ]
            .
            arguments: (arguments . (_) @element_type . (_) @element_options . _* @leftParas )@auguments
        )@CALL
            """

        elements = []
        elements_mapper = {}

        matches = self.query(query, node)

        for m in matches:
            if (m[1]):
                function = m[1]["function"]
                CALL = m[1]["CALL"]
                element_type = m[1]["element_type"].text
                element_options = m[1]["element_options"]
                leftParas = []
                if ("leftParas" in m[1]):
                    leftParas = m[1]["leftParas"]

                related_texts = self.get_text_from_element(element_options, leftParas)
                on_press = self.get_navigations_from_element(element_options)

                elements.append({
                    "ID": len(elements),
                    "identifier": CALL.start_point.row,
                    "tag": element_type,
                    "text": related_texts,
                    "onPress": on_press,
                    "childrens": [],
                    "parent": None,
                    "options": element_options,
                    "paras": leftParas
                })
                elements_mapper[CALL.byte_range] = len(elements) - 1

        # 获取elements的关系
        for idx, e in enumerate(elements):
            paras = e["paras"]
            for child in paras:
                # 寻找当前element e的childrens
                child_query = """
                (call_expression
                    function: [
                        ((identifier) @function (#match? @function ".*createElement"))
                        (member_expression property: ((property_identifier) @function (#match? @function ".*createElement")))
                        ]
                )@CALL
                    """
                child_matchs = self.query(child_query, child)

                min_byte_range = None
                for m in child_matchs:
                    if (m[1]):
                        byte_range = m[1]["CALL"].byte_range
                        if (not min_byte_range):
                            min_byte_range = byte_range
                        elif (min_byte_range[0] > byte_range[0]):
                            min_byte_range = byte_range

                if (min_byte_range):
                    target_element = elements_mapper[min_byte_range]
                    elements[idx]["childrens"].append(target_element)
                    elements[target_element]["parent"] = idx

        new_query = """
            (object
                (pair
                    key: ((string) @key (#match? @key "(title|text|name)"
                    ))
                    .
                    value: ((_) @key_val)
                )
                .
                (pair
                    key: ((string) @nav (#match? @nav "(func|onPress|press|Press|navigation)"
                    ))
                    .
                    value: ((_) @nav_val)
                )
            )
            """
        matches = self.query(new_query, node)

        for m in matches:
            if (m[1]):
                name = m[1]["key_val"]
                nav_val = m[1]["nav_val"]

                related_texts = {'title': decode_bytes(name.text)}
                on_press = self.get_navigations_from_element(nav_val)

                elements.append({
                    "ID": len(elements),
                    "identifier": name.start_point.row,
                    "tag": b"Text",
                    "text": related_texts,
                    "onPress": on_press,
                    "childrens": [],
                    "parent": 0,
                    "options": nav_val,
                    "paras": nav_val
                })
        return elements

        # print(elements)

    def get_Navigator(self):
        screens = {}
        initialRouteName = None

        query_getScreens = '''
        (call_expression
            function: [
                ((identifier) @function (#match? @function ".*createStackNavigator"))
                (member_expression property: ((property_identifier) @function_1 (#match? @function_1 ".*createStackNavigator")))
                (parenthesized_expression (sequence_expression (member_expression property: ((property_identifier) @function_2 (#match? @function_2 ".*(createStackNavigator|LHInitPage)")))))
                ]
            .
            arguments: (arguments . (_) @screens . (object . (pair key: (_) value: (_) @initialRouteName))? . (_)*)
        )
        '''

        # 获取screen变量的delcaration
        query_screenRelatedResource_screenvar = '''
        (variable_declaration
            (
                    variable_declarator
                    name:
                    (
                        identifier
                    ) @screenvar
                    value:
                    (_) @value
            )
        )
        '''
        # 根据screen delcaration的right value，获取arrayId
        query_screenRelatedResource_arrayId = '''
        (
            subscript_expression
            object:
            (
                identifier
            ) @identifier
            index:
            (
                number
            ) @arrayId
        )
        '''

        if (not self.screen_in_resources):
            return (None, None)

        screenvars = {}

        screenvars_declaration = self.query(query_screenRelatedResource_screenvar,
                                            self.resources[self.screen_in_resources[0]]["node"])
        for m in screenvars_declaration:
            if (m[1]):
                var_name = m[1]["screenvar"].text
                value = m[1]["value"]

                depend_resource_arrayId = self.query(query_screenRelatedResource_arrayId, value)
                arrayId = -1
                for n in depend_resource_arrayId:
                    if (n[1] and n[1]["identifier"].text == b'_dependencyMap'):
                        if (n[1]["arrayId"].type == "number"):
                            arrayId = int(n[1]["arrayId"].text)
                        break
                if (arrayId != -1):
                    screenvars[var_name] = self.resources[self.screen_in_resources[0]]["dependencies"][arrayId]
                else:
                    for v in screenvars:
                        if (v in value.text):
                            screenvars[var_name] = screenvars[v]
                            break

        navigator_stack = self.query(query_getScreens, self.root_node)

        for m in navigator_stack:
            if (m[1]):
                if ("function" in m[1]):
                    function = m[1]["function"]
                elif ("function_1" in m[1]):
                    function = m[1]["function_1"]
                elif ("function_2" in m[1]):
                    function = m[1]["function_2"]
                screens_node = m[1]["screens"]
                initialRouteName = None
                if ("initialRouteName" in m[1]):
                    initialRouteName = m[1]["initialRouteName"].text.replace(b'"', b'').replace(b"'", b'')

                query_pairs = '''
                (object (pair key: (_) @key value: (member_expression object:(identifier)@object property:(property_identifier)@property)))
                '''
                s = self.query(query_pairs, screens_node)
                for i in s:
                    if (i[1]):
                        key = i[1]["key"].text
                        object = i[1]["object"].text
                        property = i[1]["property"].text

                        target_resource_node = None
                        if (screenvars[object] in self.resources):
                            target_resource_node = self.resources[screenvars[object]]["node"]
                        else:
                            print("[DBG]: screen not in resources:", screenvars[object])
                            screens[key] = (screenvars[object], None)
                            continue
                        if (property == b'default'):
                            # screens[b"Home"] = (resource_id, Node)
                            screens[key] = (screenvars[object], target_resource_node)
                        # screenvar 相关的node为resource中的一个child node
                        else:
                            # 寻找component：名为property
                            query_property_var = f'(variable_declaration (variable_declarator name:(identifier) @var (#eq? @var "{property.decode()}") value:(_) @value))'
                            property_var = self.query(query_property_var, self.root_node)
                            for pv in property_var:
                                if (pv[1]):
                                    resource_id = -1
                                    raw = pv[1]["value"].text
                                    for r in self.resources:
                                        if (raw in self.resources[r]["raw"].encode()):
                                            resource_id = r
                                    screens[key] = (resource_id, pv[1]["value"])
                break

        self.screens = screens
        if (initialRouteName not in screens):
            print("[ERR]: initialRouteName not in screens", initialRouteName, screens)
            self.initialRouteName = "UNKNOWN"
        else:
            self.initialRouteName = initialRouteName
        return (screens, initialRouteName)

    def get_navigations(self, resource_id):
        if ("navigations" in self.resources[resource_id]):
            return self.resources[resource_id]["navigations"]

        node = self.resources[resource_id]["node"]
        # [byte, Node]
        navigations = self.get_navigations_from_node(node)

        for dep in self.resources[resource_id]["dependencies"]:
            if (dep not in self.resources or resource_id in self.resources[dep]["dependencies"]):
                continue
            if ("navigations" in self.resources[dep]):
                navigations.extend(self.resources[dep]["navigations"])
            else:
                dep_navigations = self.get_navigations(dep)
                navigations.extend(dep_navigations)

        self.resources[resource_id]["navigations"] = navigations
        return navigations

    # 由于缺乏静态分析，暂时直接获取resource中的navigation
    def get_navigations_from_node(self, node):
        navigations = []

        query = """
        (call_expression
            function: [
                ((identifier) @function (#match? @function ".*navigate"))
                (member_expression property: ((property_identifier) @function (#match? @function ".*navigate")))
                (parenthesized_expression (sequence_expression (member_expression property: ((property_identifier) @function (#match? @function ".*navigate")))))
                ]
            .
            arguments: (arguments . (_) @destination)
        )
            """

        matches = self.query(query, node)

        for m in matches:
            if (m[1]):
                dest = m[1]["destination"].text
                if (b'"' in dest or b"'" in dest):
                    dest = dest.replace(b'"', b'').replace(b"'", b'')
                    navigations.append(dest)
                else:
                    navigations.append(m[1]["destination"])
        return navigations

    ##########################################
    # UI Tree & UITree_paths
    ##########################################
    def construct_UITree(self, out_dir, UITree_file, shared_contents=None):
        self.uiTree = UITree()
        # {node_name: elements}
        self.Elements = {}

        delete_elements_map = {}

        delete_screens = []
        for screen in self.screens:
            delete_elements = []
            if (shared_contents and shared_contents["navigations"]):
                if (screen in shared_contents["navigations"]):
                    delete_screens.append(screen)
                    continue

            resource_id, node = self.screens[screen]
            if (node):
                elements = self.get_elements(node)
                self.Elements[screen] = elements
                if (shared_contents and shared_contents["elements"]):
                    for se in shared_contents["elements"]:
                        for e in elements:
                            if (se["tag"] == e["tag"] and se["onPress"] == e["onPress"] and
                                    se["options"].text == e["options"].text):
                                delete_elements.append(e)
                                if (decode_bytes(screen) not in delete_elements_map):
                                    delete_elements_map[decode_bytes(screen)] = []
                                json_e = {
                                    'tag': str(e['tag']),
                                    "ID": str(e["ID"]),
                                    "text": str(e["text"]),
                                    "onPress": str(e["onPress"])
                                }
                                delete_elements_map[decode_bytes(screen)].append(json_e)

                xml = self.elements_to_XML(elements, delete_elements)
                # self.screens[screen] = (resource_id, node, elements, xml)
                n = Node(screen, description=xml.toprettyxml().replace("\"", "`").replace("'", "`"))
                self.uiTree.add_node(n)
            else:
                n = Node(screen, description=screen)
                self.uiTree.add_node(n)

        tmp_nodes_dict = copy.deepcopy(self.uiTree.nodes_dict)
        for screen, start_node in tmp_nodes_dict.items():
            resource_id = self.screens[screen][0]
            if (resource_id not in self.resources):
                continue
            for nav in self.resources[resource_id]["navigations"]:
                if (isinstance(nav, bytes)):
                    if (nav not in self.uiTree.nodes_dict and nav not in delete_screens):
                        n = Node(nav, description=nav)
                        self.uiTree.add_node(n)

        indegree = {}
        for n in self.uiTree.nodes:
            indegree[n] = 0
        for start_node_name, start_node in self.uiTree.nodes_dict.items():
            if (start_node_name not in self.screens):
                continue
            resource_id = self.screens[start_node_name][0]
            if (resource_id not in self.resources):
                continue
            for dest_node_name in self.resources[resource_id]["navigations"]:
                if (isinstance(dest_node_name, bytes)):
                    if (dest_node_name in self.uiTree.nodes_dict and dest_node_name not in delete_screens):
                        description = None
                        for element in self.Elements[start_node_name]:
                            if (dest_node_name in element["onPress"]):
                                description = str(element['ID'])
                                break
                        e = Edge(start_node, self.uiTree.nodes_dict[dest_node_name], None, description=description)
                        self.uiTree.add_edge(e)
                        indegree[self.uiTree.nodes_dict[dest_node_name]] += 1

        # uiTree的head节点
        self.uiTree.start_node = []
        for n in indegree:
            if (indegree[n] == 0):
                self.uiTree.start_node.append(n)

        UITree.draw(self.uiTree, out_dir)
        with open(f'{out_dir}/UITree.dot', 'r') as file:
            dot_content = file.read()
        # 使用 Source 创建图对象
        dot = Source(dot_content)
        # 渲染图并保存为 PNG 文件
        dot.render(f'{out_dir}/{UITree_file}', format='png', view=False)

        return delete_elements_map

    # 获取由shared 角色区分的elements/navigations
    def construct_shared_UITree(self, static_analysis_results_csv, out_dir, UITree=None):
        # try:
        shared_contents = {"navigations": [], "elements": []}
        with open(static_analysis_results_csv, newline='', encoding='utf-8') as csvfile:
            csvreader = csv.reader(csvfile)
            # 读取并打印每一行
            for content in csvreader:
                start_line, start_column, end_line, end_column = int(content[5]), int(content[6]), int(content[7]), int(
                    content[8])
                shared_code_block = b"\n".join(self.raw_code.split(b"\n")[start_line - 1:end_line])
                root_node = self.parser.parse(shared_code_block).root_node

                shared_elements = self.get_elements(root_node)
                shared_navigations = self.get_navigations_from_node(root_node)

                shared_contents["elements"] += shared_elements
                shared_contents["navigations"] += shared_navigations

            delete_elements = self.construct_UITree(out_dir, UITree, shared_contents)
            with open(out_dir + "Role_comaparsion.txt", 'w', encoding="UTF-8") as json_file:
                json.dump(delete_elements, json_file)

    # except Exception as e:
    #     print("[ERR]: ", e)

    def device_map_config_resource(self, model, out_dir):
        config_paths = []
        _element_ids = set()
        path_to_node = {}

        for s in self.uiTree.start_node:
            for n in self.uiTree.nodes:
                p = self.uiTree.find_shortest_path(s.name, n.name)
                if (not p or p == []):
                    continue
                pred = None
                succ = None
                path = []
                for p_node in p:
                    if (not succ):
                        succ = p_node
                    else:
                        pred = succ
                        succ = p_node

                    if (pred and succ):
                        if (self.uiTree.edges_dict[pred.name][succ.name]):
                            eid = int(self.uiTree.edges_dict[pred.name][succ.name][0])
                            element = self.Elements[pred.name][eid]
                            desc = f"<ElementType:`{element['tag']}`, "
                            if (element['text']):
                                desc += f"Text:`{element['text']}`,"
                            if (element['onPress']):
                                desc += f"onPress:`{element['onPress']}`"
                            desc += ">"
                            path.append(desc)
                            _element_ids.add(eid)
                    path.append(f"<Screen:`{p_node.name}`>")

                if (n.name in path_to_node):
                    if (len(path) > len(path_to_node[n.name])):
                        continue
                path_to_node[n.name] = path
                # if (len(path) != 1 and "Screen" in path[-1]):
                #     continue
                # config_paths.append(path)

        for n in self.uiTree.nodes:
            if (n.name not in path_to_node):
                path_to_node[n.name] = [
                    f"<Screen:`{n.name}`>",
                ]

        for n in self.uiTree.nodes:
            if (n.name in self.Elements):
                elements = self.Elements[n.name]
                for element in elements:
                    eid = element["ID"]
                    if (eid in _element_ids or (not element['text'] and not element['onPress'])):
                        continue
                    path = copy.deepcopy(path_to_node[n.name])
                    desc = f"<ElementType:`{element['tag']}`, "
                    if (element['text']):
                        desc += f"Text:`{element['text']}`,"
                    if (element['onPress']):
                        desc += f"onPress:`{element['onPress']}`"
                    desc += ">"
                    path.append(desc)
                    config_paths.append(path)

        paths_str_list = []
        frags_size = len(config_paths) // 20 if len(config_paths) % 20 == 0 else (len(config_paths) // 20) + 1

        with open(f'{out_dir}/ActionPaths.txt', 'w') as file:
            for idx, p in enumerate(config_paths):
                file.write(str(idx) + ": " + str(p) + "\n")
                paths_str_list.append(str(idx) + ": " + str(p) + "\n")

        with open(out_dir + "/ConfigResourceMappingResponse.txt", "w") as f:
            f.write('')

        mapper = []
        for i in range(frags_size):
            if (i == frags_size - 1):
                paths_str = ''.join(paths_str_list[i * 20:])
            else:
                paths_str = ''.join(paths_str_list[i * 20:(i + 1) * 20])

            prompt = ''
            with open(BASE_DIR + "/../../prompt/ConfigResourceMapping_2.txt") as f:
                prompt = f.read()

            prompt = prompt.replace("{{PATHLIST}}", f"Device Model&Type: {model}" + "\n\n" + paths_str)
            print(prompt)
            print(
                "----------------------------------------------------------------------------------------------------------------------------------------------"
            )
            # os.environ["https_proxy"] = "http://192.168.72.1:1083"
            res = query_config_resource_mapping(prompt)

            with open(out_dir + "/ConfigResourceMappingResponse.txt", "a") as f:
                f.write(paths_str + "\n")
                f.write(res + "\n")


if __name__ == '__main__':
    model = "xiaomi.router.rm1800"

    parser = ASTParser(
        f"/root/documents/droidbot-confiot/Confiot_main/VIG-parser/react-parser/javascript/MihomePlugins/{model}/{model}.js")
    output_dir = f"/root/documents/Output/PLUGINS/{model}/"
    parser.start_parser()

    # parser.get_elements(parser.resources[10007]["node"])
    # 获取所有的pages/screens
    parser.get_Navigator()

    if (not parser.screens or not parser.initialRouteName):
        print("[ERR]: Get Navigator failed")
        sys.exit(1)

    # 获取navigations
    for id in parser.resources:
        nav = parser.get_navigations(id)
        # if (nav):
        #     print(nav)

    if (os.path.exists(f'{output_dir}/host_UITree.png')):
        exit()
    # STEP-1: 获取host的UITree
    parser.construct_UITree(out_dir=output_dir, UITree_file="host_UITree")

    parser.device_map_config_resource(model=model, out_dir=output_dir)
    # STEP-2: 获取guest的UITree
    parser.construct_shared_UITree(static_analysis_results_csv=output_dir + "js-results.csv",
                                   out_dir=output_dir,
                                   UITree="guest_UITree")
