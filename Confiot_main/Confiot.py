###############################################
# Confiot.py
# This class is the entrance of analyzing the app policies
###############################################
import json
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../")

from droidbot.input_event import *
from droidbot.device import Device
from droidbot.app import App
from Confiot_main.util import DirectedGraph, Node, Edge
import Confiot_main.settings as settings
import xml.etree.ElementTree as ET


class Confiot:

    def __init__(self) -> None:
        self.device: Device = None
        self.app: App = None
        self.utg_graph: DirectedGraph = None
        # {"event_str": event_json_path}
        self.events = {}
        self.conf_list = []

    def device_connect(self):
        self.device = Device(device_serial=settings.device_serial, ignore_ad=True)
        self.app = App(app_path=settings.app_path, output_dir=settings.Confiot_output)
        #self.device.connect()
        self.device.install_app(self.app)

    def device_get_UIElement(self, host_analyzing_config: str, current_state_str: str, store_path="", store_file=""):
        if (store_file == ''):
            output_path = settings.UI_output + f"/{host_analyzing_config}/"
            if (self.device and self.app):
                self.device.adb.shell("uiautomator dump /sdcard/ui_dump.xml")
                if (not os.path.exists(output_path)):
                    os.makedirs(output_path)
                self.device.adb.run_cmd(["pull", "/sdcard/ui_dump.xml", output_path + f"{current_state_str}.xml"])
        else:
            output_path = store_path
            if (self.device and self.app):
                self.device.adb.shell("uiautomator dump /sdcard/ui_dump.xml")
                if (not os.path.exists(output_path)):
                    os.makedirs(output_path)

                self.device.adb.run_cmd(["pull", "/sdcard/ui_dump.xml", store_path + "/" + store_file])

    def device_screenshot(self, store_dir: str):
        local_image_path = store_dir
        remote_image_path = "/sdcard/screen.png"
        self.device.adb.shell("screencap -p %s" % remote_image_path)
        self.device.pull_file(remote_image_path, local_image_path)
        self.device.adb.shell("rm %s" % remote_image_path)

    def device_stop_app(self):
        try:
            stack = self.device.get_current_activity_stack()
            current_package = None
            for acts in stack:
                acts_package = acts.split("/")[0]
                if (acts_package != current_package and acts_package != "com.android.systemui" and acts_package != ""):
                    if (acts_package == self.app.get_package_name()):
                        break
                    current_package = acts_package
                    self.device.adb.shell("am force-stop " + current_package)
            stop_app_intent = self.app.get_stop_intent()
            go_back_event = IntentEvent(stop_app_intent)
            go_back_event.send(self.device)
        except:
            print("[ERR]: Cannot stop app")

    def device_to_state(self, host_analyzing_config: str, target_state: str):
        event_str_path = []
        path = self.utg_graph.find_shortest_path(self.utg_graph.start_node, target_state)
        if (path):
            current_node = path[0]
            for node in path[1:]:
                event_str_path.append(self.utg_graph.edges_dict[current_node.name][node.name][0])
                current_node = node

        self.device_stop_app()
        self.device.start_app(self.app)
        time.sleep(5)
        for estr in event_str_path:
            if (estr in self.events):
                with open(self.events[estr], "r") as f:
                    event_dict = json.load(f)["event"]
                    event = InputEvent.from_dict(event_dict)
                    print("[DBG]: Action: " + estr)
                    event.send(self.device)
            else:
                print("[ERR]: Wrong event path: ", event_str_path)
                return False

        print("[DBG]: Finish state: " + target_state + "\n")
        return True

    def device_state_walker(self, host_analyzing_config: str):
        for node in self.utg_graph.nodes:
            finished = self.device_to_state(host_analyzing_config, node.name)
            if (finished):
                self.device_get_UIElement(host_analyzing_config, node.name)

    # return True if the config is enabled
    # return False if the config is possiblly be disabled
    def device_guest_config_test(self, host_analyzing_config: str, guest_config):
        conf_activity_dict = guest_config
        target_state = conf_activity_dict["from_state"]
        config_view_name = guest_config["view_images"]
        config_event = conf_activity_dict["event"]
        config_bounds = conf_activity_dict["bounds"]
        config_bounds = f"[{config_bounds[0][0]},{config_bounds[0][1]}][{config_bounds[1][0]},{config_bounds[1][0]}]"

        if (config_view_name == ''):
            print("[ERR]: Cannot find view image")
            return False

        finished = self.device_to_state(host_analyzing_config, target_state)
        if (finished):
            if (config_event is not None):
                out_dir = settings.UI_output + f"/{host_analyzing_config}/" + config_view_name
                self.device_get_UIElement(host_analyzing_config, target_state, out_dir, "/before.xml")
                self.device_screenshot(out_dir + "/before.png")
                time.sleep(1)
                config_event.send(self.device)
                time.sleep(3)
                self.device_get_UIElement(host_analyzing_config, target_state, out_dir, "/after.xml")
                self.device_screenshot(out_dir + "/after.png")
        else:
            print("[ERR]: Failed to goto target state to test config :", guest_config)
            return False

        before_xml = ET.parse(out_dir + "/before.xml")
        after_xml = ET.parse(out_dir + "/after.xml")

        before_root = before_xml.getroot()
        after_root = after_xml.getroot()

        print("[DBG]: Find config in bounds: ", config_bounds)
        before_config_node = before_root.findall(f".//*[@bounds='{config_bounds}']")
        after_config_node = after_root.findall(f".//*[@bounds='{config_bounds}']")

        if (before_config_node == []):
            print("[ERR]: Cannot find config in before state")
            return True
        elif (before_config_node != [] and after_config_node == []):
            # TODO: 可能跳转到别的activity中了，一般是表示这个config是成功进行的，有没有别的情况？
            return True
        elif (before_config_node != [] and after_config_node != [] and len(before_config_node) == 1 and
              len(after_config_node) == 1):
            before_node = before_config_node[0]
            after_node = after_config_node[0]

            is_disabled = True
            if (before_node.attrib["checkable"]):
                if (before_node.attrib["checked"] != after_node.attrib["checked"]):
                    is_disabled = False

            ret = not is_disabled
            return ret
        else:
            print("[ERR]: Find more than one config node: ", before_config_node, after_config_node)
            return True
        # for node in bounds_related_nodes:
        #     print(ET.tostring(node, encoding='unicode'))

    ###############################################################
    ###############################################################
    def parse_event(self):
        events_path = settings.droid_output + "/events/"
        events_json = os.listdir(events_path)
        for j in events_json:
            with open(events_path + j, "r") as f:
                try:
                    event_str = json.load(f)["event_str"]
                    if (event_str != ''):
                        self.events[event_str] = events_path + j
                except Exception as e:
                    print(f"[ERR]: Failed to parse the event file `{j}`\n" + str(e))

    def parse_utg(self) -> DirectedGraph:
        self.utg_graph = DirectedGraph()
        utg_nodes = {}

        utg_dict = {}
        utg_nodes_dict = []
        utg_edges_dict = []

        with open(settings.droid_output + "/utg.js", "r") as f:
            utg_content = f.read()
            if (utg_content != ''):
                utg_content = utg_content.replace("var utg = ", '')
                utg_content = utg_content.replace(";", "")
                utg_dict = json.loads(utg_content)
                utg_nodes_dict = utg_dict["nodes"]
                utg_edges_dict = utg_dict["edges"]

                for node in utg_nodes_dict:
                    activity = (node["package"] + node["activity"]).replace("}", "")
                    if (activity == utg_dict["app_main_activity"]):
                        self.utg_graph.start_node = node["state_str"]
                        break

        if (utg_nodes_dict != [] and utg_edges_dict != [] and self.utg_graph.start_node is not None):
            print("[DBG]: Start state: " + self.utg_graph.start_node)
        else:
            print("[ERR]: Cannot find start state")
            return None

        # parse utg with DirectedGraph
        for n in utg_nodes_dict:
            self.utg_graph.add_node(Node(n["state_str"]))
            utg_nodes[n["state_str"]] = self.utg_graph.nodes[-1]

        for e in utg_edges_dict:
            event_strs = [eve["event_str"] for eve in e["events"]]
            self.utg_graph.add_edge(Edge(utg_nodes[e["from"]], utg_nodes[e["to"]], event_strs))

        self.utg_graph.utg_nodes = utg_nodes_dict
        self.utg_graph.utg_edges = utg_edges_dict

        return self.utg_graph

    def parse_conf_list(self):
        # input: droid_output/utg.js -> edges
        # output: conf_activity_dict (view_images, {event_id, event_str, {from_state, to_state}}, activity)
        utg_edges_dict = self.utg_graph.utg_edges
        conf_list = []
        # {'from': '6578c97fcb7eb008507ccde68f80d360', 'to': 'ddd93f40628f40c0b4105d3cc0f69a26', 'id': '6578c97fcb7eb008507ccde68f80d360-->ddd93f40628f40c0b4105d3cc0f69a26', 'title': '<table class="table">\n<tr><th>1166</th><td>TouchEvent(state=6578c97fcb7eb008507ccde68f80d360, view=bba1713c7fb66a73d605cc227313a1cf(CustomTabActivity}/View-))</td></tr>\n</table>', 'label': '1166', 'events': [{'event_str': 'TouchEvent(state=6578c97fcb7eb008507ccde68f80d360, view=bba1713c7fb66a73d605cc227313a1cf(CustomTabActivity}/View-))', 'event_id': 1166, 'event_type': 'touch', 'view_images': ['views/view_bba1713c7fb66a73d605cc227313a1cf.png']}]}
        # print(edges_dict)
        for e in utg_edges_dict:
            conf_activity_dict = {}
            if (e["events"] == []):
                continue

            c = {}
            for conf in conf_list:
                if (e["events"][0]["view_images"] == conf["view_images"]):
                    c = conf
                    break
            if c != {}:
                continue

            if (e["events"][0]["view_images"] != []):
                conf_activity_dict["view_images"] = e["events"][0]["view_images"][0].replace("views/", "")
            else:
                conf_activity_dict["view_images"] = ""
            conf_activity_dict["event_id"] = e["events"][0]["event_id"]
            conf_activity_dict["event_str"] = e["events"][0]["event_str"]
            conf_activity_dict["from_state"] = e["from"]
            conf_activity_dict["to_state"] = e["to"]

            # Add bounds and Inputevent for views identification
            conf_activity_dict["event"] = None
            conf_activity_dict["bounds"] = None
            if (conf_activity_dict["event_str"] in self.events):
                with open(self.events[conf_activity_dict["event_str"]], "r") as f:
                    event_dict = json.load(f)["event"]
                    event = InputEvent.from_dict(event_dict)
                    conf_activity_dict["event"] = event
                    if ("view" in event_dict):
                        conf_activity_dict["bounds"] = event_dict["view"]["bounds"]

            if (e["events"][0]["event_str"].split("(")[0] == "KeyEvent"):
                conf_activity_dict["activity"] = conf_list[-1]["activity"]
            elif (len(e["events"][0]["event_str"].split("(")) < 3):
                # IntentEvent: start and stop, skip
                conf_activity_dict["activity"] = ''
                continue
            else:
                conf_activity_dict["activity"] = e["events"][0]["event_str"].split("(")[2].split("}/")[0]

            if (conf_activity_dict["activity"] == "ChooseDeviceActivity" or
                    conf_activity_dict["activity"] == "ScanBarcodeActivity" or
                    conf_activity_dict["activity"] == "ChooseSubCategoryDeviceActivity" or
                    conf_activity_dict["activity"] == "WebShellActivity" or conf_activity_dict["activity"] == "MainActivity" or
                    conf_activity_dict["activity"] == "ResolverActivity" or
                    conf_activity_dict["activity"] == "HomeAllStyleListActivity" or
                    conf_activity_dict["activity"] == "HomeStyleActivity" or
                    conf_activity_dict["activity"] == "HomeRoomBackgroundPreviewActivity" or
                    conf_activity_dict["activity"] == "HomeRoomBackgroundActivity" or
                    conf_activity_dict["activity"] == "ImagePreviewActivity" or
                    conf_activity_dict["activity"] == "LoginH5HomeAcvtivity" or
                    conf_activity_dict["activity"] == "CustomTabActivity"):
                continue

            conf_list.append(conf_activity_dict)
        self.conf_list = conf_list
        #print(conf_list)
