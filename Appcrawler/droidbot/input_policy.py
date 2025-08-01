import sys
import json
import re
import logging
import random
from abc import abstractmethod
import yaml
import copy
import requests
import ast
from .input_event import *
from .utg import UTG
import time
from .input_event import ScrollEvent

# from memory.memory_builder import Memory
import tools
import pdb
import os

os.environ["TOKENIZERS_PARALLELISM"] = "false"

# Max number of restarts
MAX_NUM_RESTARTS = 5
# Max number of steps outside the app
MAX_NUM_STEPS_OUTSIDE = 1000
MAX_NUM_STEPS_OUTSIDE_KILL = 1000
# Max number of replay tries
MAX_REPLY_TRIES = 5

# Some input event flags
EVENT_FLAG_STARTED = "+started"
EVENT_FLAG_START_APP = "+start_app"
EVENT_FLAG_STOP_APP = "+stop_app"
EVENT_FLAG_EXPLORE = "+explore"
EVENT_FLAG_NAVIGATE = "+navigate"
EVENT_FLAG_TOUCH = "+touch"

# Policy taxanomy
POLICY_NAIVE_DFS = "dfs_naive"
POLICY_GREEDY_DFS = "dfs_greedy"
POLICY_NAIVE_BFS = "bfs_naive"
POLICY_GREEDY_BFS = "bfs_greedy"
POLICY_REPLAY = "replay"
POLICY_MANUAL = "manual"
POLICY_MONKEY = "monkey"
POLICY_TASK = "task"
POLICY_AutodroidCrawlerPolicy = "AutodroidCrawlerPolicy"
POLICY_NONE = "none"
POLICY_MEMORY_GUIDED = "memory_guided"  # implemented in input_policy2
FINISHED = "task_completed"
MAX_SCROLL_NUM = 7

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class InputInterruptedException(Exception):
    pass


def safe_dict_get(view_dict, key, default=None):
    return_itm = view_dict[key] if (key in view_dict) else default
    if return_itm == None:
        return_itm = ""
    return return_itm


class InputPolicy(object):
    """
    This class is responsible for generating events to stimulate more app behaviour
    It should call AppEventManager.send_event method continuously
    """

    def __init__(self, device, app):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.device = device
        self.app = app
        self.action_count = 0
        self.master = None

    def Confiot_device_stop_app(self):
        try:
            stack = self.device.get_current_activity_stack()
            current_package = None
            if stack:
                for acts in stack:
                    acts_package = acts.split("/")[0]
                    if (
                        acts_package != current_package
                        and acts_package != "com.android.systemui"
                        and acts_package != ""
                    ):
                        if acts_package == self.app.get_package_name():
                            break
                        current_package = acts_package
                        self.device.adb.shell("am force-stop " + current_package)
            stop_app_intent = self.app.get_stop_intent()
            go_back_event = IntentEvent(stop_app_intent)
            go_back_event.send(self.device)
        except Exception as e:
            print("[ERR]: Cannot stop app caused by: ", e)

    # syncxxx: 开始task前进入task相应的前置状态
    def Confiot_toState(self, input_manager):

        sys.path.append(BASE_DIR + "/../../")
        from Confiot_main.Confiot import Confiot

        self.Confiot_device_stop_app()
        self.device.start_app(self.app)
        time.sleep(3)

        cf = Confiot()
        events = cf.TOSTATE(input_manager.state, self.app, self.device)
        if events:
            for e in events:
                input_manager.add_event(e)
                self.action_count += 1
        # input()

    def start(self, input_manager):
        """
        start producing events
        :param input_manager: instance of InputManager
        """
        self.action_count = 0

        if input_manager.state:
            self.Confiot_toState(input_manager)
        while input_manager.enabled and self.action_count < input_manager.event_count:
            try:
                # # make sure the first event is go to HOME screen
                # # the second event is to start the app
                # if self.action_count == 0 and self.master is None:
                #     event = KeyEvent(name="HOME")
                # elif self.action_count == 1 and self.master is None:
                #     event = IntentEvent(self.app.get_start_intent())
                # syncxxx: 不进行重启
                # if self.action_count == 0 and self.master is None:
                #     event = KillAppEvent(app=self.app)
                # else:
                #     event = self.generate_event(input_manager)
                event = self.generate_event(input_manager)
                if event == FINISHED:
                    break
                input_manager.add_event(event)
            except KeyboardInterrupt:
                break
            except InputInterruptedException as e:
                self.logger.warning("stop sending events: %s" % e)
                break
            # except RuntimeError as e:
            #     self.logger.warning(e.message)
            #     break
            except Exception as e:
                self.logger.warning("exception during sending events: %s" % e)
                import traceback

                traceback.print_exc()
                continue
            self.action_count += 1
            # self.logger.warning(f"current: {self.action_count}, limit: {input_manager.event_count}" )

    @abstractmethod
    def generate_event(self, input_manager):
        """
        generate an event
        @return:
        """
        pass


class NoneInputPolicy(InputPolicy):
    """
    do not send any event
    """

    def __init__(self, device, app):
        super(NoneInputPolicy, self).__init__(device, app)

    def generate_event(self):
        """
        generate an event
        @return:
        """
        return None


class UtgBasedInputPolicy(InputPolicy):
    """
    state-based input policy
    """

    def __init__(self, device, app, random_input):
        super(UtgBasedInputPolicy, self).__init__(device, app)
        self.random_input = random_input
        self.script = None
        self.master = None
        self.script_events = []
        self.last_event = None
        self.last_state = None
        self.current_state = None
        self.utg = UTG(device=device, app=app, random_input=random_input)
        self.script_event_idx = 0
        if self.device.humanoid is not None:
            self.humanoid_view_trees = []
            self.humanoid_events = []

    def generate_event(self, input_manager):
        """
        generate an event
        @return:
        """

        # Get current device state
        self.current_state = self.device.get_current_state()
        if self.current_state is None:
            import time

            time.sleep(5)
            return KeyEvent(name="BACK")

        self.__update_utg()

        # update last view trees for humanoid
        if self.device.humanoid is not None:
            self.humanoid_view_trees = self.humanoid_view_trees + [
                self.current_state.view_tree
            ]
            if len(self.humanoid_view_trees) > 4:
                self.humanoid_view_trees = self.humanoid_view_trees[1:]

        event = None

        # if the previous operation is not finished, continue
        if len(self.script_events) > self.script_event_idx:
            event = self.script_events[self.script_event_idx].get_transformed_event(
                self
            )
            self.script_event_idx += 1

        # First try matching a state defined in the script
        if event is None and self.script is not None:
            operation = self.script.get_operation_based_on_state(self.current_state)
            if operation is not None:
                self.script_events = operation.events
                # restart script
                event = self.script_events[0].get_transformed_event(self)
                self.script_event_idx = 1

        if event is None:
            old_state, event = self.generate_event_based_on_utg(input_manager)
            # import time

            # time.sleep(3)
        # update last events for humanoid
        if self.device.humanoid is not None:
            self.humanoid_events = self.humanoid_events + [event]
            if len(self.humanoid_events) > 3:
                self.humanoid_events = self.humanoid_events[1:]

        self.last_state = self.current_state if old_state is None else old_state
        self.last_event = event
        return event

    def __update_utg(self):
        self.utg.add_transition(self.last_event, self.last_state, self.current_state)

    @abstractmethod
    def generate_event_based_on_utg(self, input_manager):
        """
        generate an event based on UTG
        :return: InputEvent
        """
        pass


class UtgNaiveSearchPolicy(UtgBasedInputPolicy):
    """
    depth-first strategy to explore UFG (old)
    """

    def __init__(self, device, app, random_input, search_method):
        super(UtgNaiveSearchPolicy, self).__init__(device, app, random_input)
        self.logger = logging.getLogger(self.__class__.__name__)

        self.explored_views = set()
        self.state_transitions = set()
        self.search_method = search_method

        self.last_event_flag = ""
        self.last_event_str = None
        self.last_state = None

        self.preferred_buttons = [
            "yes",
            "ok",
            "activate",
            "detail",
            "more",
            "access",
            "allow",
            "check",
            "agree",
            "try",
            "go",
            "next",
        ]

    def generate_event_based_on_utg(self):
        """
        generate an event based on current device state
        note: ensure these fields are properly maintained in each transaction:
          last_event_flag, last_touched_view, last_state, exploited_views, state_transitions
        @return: InputEvent
        """
        self.save_state_transition(
            self.last_event_str, self.last_state, self.current_state
        )

        if self.device.is_foreground(self.app):
            # the app is in foreground, clear last_event_flag
            self.last_event_flag = EVENT_FLAG_STARTED
        else:
            number_of_starts = self.last_event_flag.count(EVENT_FLAG_START_APP)
            # If we have tried too many times but the app is still not started, stop DroidBot
            if number_of_starts > MAX_NUM_RESTARTS:
                raise InputInterruptedException("The app cannot be started.")

            # if app is not started, try start it
            if self.last_event_flag.endswith(EVENT_FLAG_START_APP):
                # It seems the app stuck at some state, and cannot be started
                # just pass to let viewclient deal with this case
                self.logger.info(
                    "The app had been restarted %d times.", number_of_starts
                )
                self.logger.info("Trying to restart app...")
                pass
            else:
                start_app_intent = self.app.get_start_intent()

                self.last_event_flag += EVENT_FLAG_START_APP
                self.last_event_str = EVENT_FLAG_START_APP
                return IntentEvent(start_app_intent)

        # select a view to click
        view_to_touch = self.select_a_view(self.current_state)

        # if no view can be selected, restart the app
        if view_to_touch is None:
            stop_app_intent = self.app.get_stop_intent()
            self.last_event_flag += EVENT_FLAG_STOP_APP
            self.last_event_str = EVENT_FLAG_STOP_APP
            return IntentEvent(stop_app_intent)

        view_to_touch_str = view_to_touch["view_str"]
        if view_to_touch_str.startswith("BACK"):
            result = KeyEvent("BACK")
        else:
            result = TouchEvent(view=view_to_touch)

        self.last_event_flag += EVENT_FLAG_TOUCH
        self.last_event_str = view_to_touch_str
        self.save_explored_view(self.current_state, self.last_event_str)
        return result

    def select_a_view(self, state):
        """
        select a view in the view list of given state, let droidbot touch it
        @param state: DeviceState
        @return:
        """
        views = []
        for view in state.views:
            if view["enabled"] and len(view["children"]) == 0:
                views.append(view)

        if self.random_input:
            random.shuffle(views)

        # add a "BACK" view, consider go back first/last according to search policy
        mock_view_back = {
            "view_str": "BACK_%s" % state.foreground_activity,
            "text": "BACK_%s" % state.foreground_activity,
        }
        if self.search_method == POLICY_NAIVE_DFS:
            views.append(mock_view_back)
        elif self.search_method == POLICY_NAIVE_BFS:
            views.insert(0, mock_view_back)

        # first try to find a preferable view
        for view in views:
            view_text = view["text"] if view["text"] is not None else ""
            view_text = view_text.lower().strip()
            if (
                view_text in self.preferred_buttons
                and (state.foreground_activity, view["view_str"])
                not in self.explored_views
            ):
                self.logger.info("selected an preferred view: %s" % view["view_str"])
                return view

        # try to find a un-clicked view
        for view in views:
            if (state.foreground_activity, view["view_str"]) not in self.explored_views:
                self.logger.info("selected an un-clicked view: %s" % view["view_str"])
                return view

        # if all enabled views have been clicked, try jump to another activity by clicking one of state transitions
        if self.random_input:
            random.shuffle(views)
        transition_views = {transition[0] for transition in self.state_transitions}
        for view in views:
            if view["view_str"] in transition_views:
                self.logger.info("selected a transition view: %s" % view["view_str"])
                return view

        # no window transition found, just return a random view
        # view = views[0]
        # self.logger.info("selected a random view: %s" % view['view_str'])
        # return view

        # DroidBot stuck on current state, return None
        self.logger.info("no view could be selected in state: %s" % state.tag)
        return None

    def save_state_transition(self, event_str, old_state, new_state):
        """
        save the state transition
        @param event_str: str, representing the event cause the transition
        @param old_state: DeviceState
        @param new_state: DeviceState
        @return:
        """
        if event_str is None or old_state is None or new_state is None:
            return
        if new_state.is_different_from(old_state):
            self.state_transitions.add((event_str, old_state.tag, new_state.tag))

    def save_explored_view(self, state, view_str):
        """
        save the explored view
        @param state: DeviceState, where the view located
        @param view_str: str, representing a view
        @return:
        """
        if not state:
            return
        state_activity = state.foreground_activity
        self.explored_views.add((state_activity, view_str))


class UtgGreedySearchPolicy(UtgBasedInputPolicy):
    """
    DFS/BFS (according to search_method) strategy to explore UFG (new)
    """

    def __init__(self, device, app, random_input, search_method):
        super(UtgGreedySearchPolicy, self).__init__(device, app, random_input)
        self.logger = logging.getLogger(self.__class__.__name__)
        self.search_method = search_method

        self.preferred_buttons = [
            "yes",
            "ok",
            "activate",
            "detail",
            "more",
            "access",
            "allow",
            "check",
            "agree",
            "try",
            "go",
            "next",
        ]

        self.__nav_target = None
        self.__nav_num_steps = -1
        self.__num_restarts = 0
        self.__num_steps_outside = 0
        self.__event_trace = ""
        self.__missed_states = set()
        self.__random_explore = False

    def generate_event_based_on_utg(self, input_manager):
        """
        generate an event based on current UTG
        @return: InputEvent
        """
        current_state = self.current_state
        self.logger.info("Current state: %s" % current_state.state_str)
        if current_state.state_str in self.__missed_states:
            self.__missed_states.remove(current_state.state_str)

        if current_state.get_app_activity_depth(self.app) < 0:
            # If the app is not in the activity stack
            start_app_intent = self.app.get_start_intent()

            # It seems the app stucks at some state, has been
            # 1) force stopped (START, STOP)
            #    just start the app again by increasing self.__num_restarts
            # 2) started at least once and cannot be started (START)
            #    pass to let viewclient deal with this case
            # 3) nothing
            #    a normal start. clear self.__num_restarts.

            if self.__event_trace.endswith(
                EVENT_FLAG_START_APP + EVENT_FLAG_STOP_APP
            ) or self.__event_trace.endswith(EVENT_FLAG_START_APP):
                self.__num_restarts += 1
                self.logger.info(
                    "The app had been restarted %d times.", self.__num_restarts
                )
            else:
                self.__num_restarts = 0

            # pass (START) through
            if not self.__event_trace.endswith(EVENT_FLAG_START_APP):
                if self.__num_restarts > MAX_NUM_RESTARTS:
                    # If the app had been restarted too many times, enter random mode
                    msg = "The app had been restarted too many times. Entering random mode."
                    self.logger.info(msg)
                    self.__random_explore = True
                else:
                    # Start the app
                    self.__event_trace += EVENT_FLAG_START_APP
                    self.logger.info("Trying to start the app...")
                    return IntentEvent(intent=start_app_intent)

        elif current_state.get_app_activity_depth(self.app) > 0:
            # If the app is in activity stack but is not in foreground
            self.__num_steps_outside += 1

            if self.__num_steps_outside > MAX_NUM_STEPS_OUTSIDE:
                # If the app has not been in foreground for too long, try to go back
                if self.__num_steps_outside > MAX_NUM_STEPS_OUTSIDE_KILL:
                    stop_app_intent = self.app.get_stop_intent()
                    go_back_event = IntentEvent(stop_app_intent)
                else:
                    go_back_event = KeyEvent(name="BACK")
                self.__event_trace += EVENT_FLAG_NAVIGATE
                self.logger.info("Going back to the app...")
                return go_back_event
        else:
            # If the app is in foreground
            self.__num_steps_outside = 0

        # Get all possible input events
        possible_events = current_state.get_possible_input()

        if self.random_input:
            random.shuffle(possible_events)

        if self.search_method == POLICY_GREEDY_DFS:
            possible_events.append(KeyEvent(name="BACK"))
        elif self.search_method == POLICY_GREEDY_BFS:
            possible_events.insert(0, KeyEvent(name="BACK"))

        # get humanoid result, use the result to sort possible events
        # including back events
        if self.device.humanoid is not None:
            possible_events = self.__sort_inputs_by_humanoid(possible_events)

        # If there is an unexplored event, try the event first
        for input_event in possible_events:
            if not self.utg.is_event_explored(event=input_event, state=current_state):
                self.logger.info("Trying an unexplored event.")
                self.__event_trace += EVENT_FLAG_EXPLORE
                return input_event

        target_state = self.__get_nav_target(current_state)
        if target_state:
            navigation_steps = self.utg.get_navigation_steps(
                from_state=current_state, to_state=target_state
            )
            if navigation_steps and len(navigation_steps) > 0:
                self.logger.info(
                    "Navigating to %s, %d steps left."
                    % (target_state.state_str, len(navigation_steps))
                )
                self.__event_trace += EVENT_FLAG_NAVIGATE
                return navigation_steps[0][1]

        if self.__random_explore:
            self.logger.info("Trying random event.")
            random.shuffle(possible_events)
            return possible_events[0]

        # If couldn't find a exploration target, stop the app
        stop_app_intent = self.app.get_stop_intent()
        self.logger.info("Cannot find an exploration target. Trying to restart app...")
        self.__event_trace += EVENT_FLAG_STOP_APP
        return IntentEvent(intent=stop_app_intent)

    def __sort_inputs_by_humanoid(self, possible_events):
        if sys.version.startswith("3"):
            from xmlrpc.client import ServerProxy
        else:
            from xmlrpclib import ServerProxy
        proxy = ServerProxy("http://%s/" % self.device.humanoid)
        request_json = {
            "history_view_trees": self.humanoid_view_trees,
            "history_events": [x.__dict__ for x in self.humanoid_events],
            "possible_events": [x.__dict__ for x in possible_events],
            "screen_res": [
                self.device.display_info["width"],
                self.device.display_info["height"],
            ],
        }
        result = json.loads(proxy.predict(json.dumps(request_json)))
        new_idx = result["indices"]
        text = result["text"]
        new_events = []

        # get rid of infinite recursive by randomizing first event
        if not self.utg.is_state_reached(self.current_state):
            new_first = random.randint(0, len(new_idx) - 1)
            new_idx[0], new_idx[new_first] = new_idx[new_first], new_idx[0]

        for idx in new_idx:
            if isinstance(possible_events[idx], SetTextEvent):
                possible_events[idx].text = text
            new_events.append(possible_events[idx])
        return new_events

    def __get_nav_target(self, current_state):
        # If last event is a navigation event
        if self.__nav_target and self.__event_trace.endswith(EVENT_FLAG_NAVIGATE):
            navigation_steps = self.utg.get_navigation_steps(
                from_state=current_state, to_state=self.__nav_target
            )
            if navigation_steps and 0 < len(navigation_steps) <= self.__nav_num_steps:
                # If last navigation was successful, use current nav target
                self.__nav_num_steps = len(navigation_steps)
                return self.__nav_target
            else:
                # If last navigation was failed, add nav target to missing states
                self.__missed_states.add(self.__nav_target.state_str)

        reachable_states = self.utg.get_reachable_states(current_state)
        if self.random_input:
            random.shuffle(reachable_states)

        for state in reachable_states:
            # Only consider foreground states
            if state.get_app_activity_depth(self.app) != 0:
                continue
            # Do not consider missed states
            if state.state_str in self.__missed_states:
                continue
            # Do not consider explored states
            if self.utg.is_state_explored(state):
                continue
            self.__nav_target = state
            navigation_steps = self.utg.get_navigation_steps(
                from_state=current_state, to_state=self.__nav_target
            )
            if len(navigation_steps) > 0:
                self.__nav_num_steps = len(navigation_steps)
                return state

        self.__nav_target = None
        self.__nav_num_steps = -1
        return None


class UtgReplayPolicy(InputPolicy):
    """
    Replay DroidBot output generated by UTG policy
    """

    def __init__(self, device, app, replay_output):
        super(UtgReplayPolicy, self).__init__(device, app)
        self.logger = logging.getLogger(self.__class__.__name__)
        self.replay_output = replay_output

        import os

        event_dir = os.path.join(replay_output, "events")
        self.event_paths = sorted(
            [
                os.path.join(event_dir, x)
                for x in next(os.walk(event_dir))[2]
                if x.endswith(".json")
            ]
        )
        # skip HOME and start app intent
        self.device = device
        self.app = app
        self.event_idx = 2
        self.num_replay_tries = 0
        self.utg = UTG(device=device, app=app, random_input=None)
        self.last_event = None
        self.last_state = None
        self.current_state = None

    def generate_event(self):
        """
        generate an event based on replay_output
        @return: InputEvent
        """
        import time

        while (
            self.event_idx < len(self.event_paths)
            and self.num_replay_tries < MAX_REPLY_TRIES
        ):
            self.num_replay_tries += 1
            current_state = self.device.get_current_state()
            if current_state is None:
                time.sleep(5)
                self.num_replay_tries = 0
                return KeyEvent(name="BACK")

            curr_event_idx = self.event_idx
            self.__update_utg()
            while curr_event_idx < len(self.event_paths):
                event_path = self.event_paths[curr_event_idx]
                with open(event_path, "r") as f:
                    curr_event_idx += 1

                    try:
                        event_dict = json.load(f)
                    except Exception as e:
                        self.logger.info("Loading %s failed" % event_path)
                        continue

                    if event_dict["start_state"] != current_state.state_str:
                        continue
                    if not self.device.is_foreground(self.app):
                        # if current app is in background, bring it to foreground
                        component = self.app.get_package_name()
                        if self.app.get_main_activity():
                            component += "/%s" % self.app.get_main_activity()
                        return IntentEvent(Intent(suffix=component))

                    self.logger.info("Replaying %s" % event_path)
                    self.event_idx = curr_event_idx
                    self.num_replay_tries = 0
                    # return InputEvent.from_dict(event_dict["event"])
                    event = InputEvent.from_dict(event_dict["event"])
                    self.last_state = self.current_state
                    self.last_event = event
                    return event

            time.sleep(5)

        # raise InputInterruptedException("No more record can be replayed.")

    def __update_utg(self):
        self.utg.add_transition(self.last_event, self.last_state, self.current_state)


class ManualPolicy(UtgBasedInputPolicy):
    """
    manually explore UFG
    """

    def __init__(self, device, app):
        super(ManualPolicy, self).__init__(device, app, False)
        self.logger = logging.getLogger(self.__class__.__name__)

        self.__first_event = True

    def generate_event_based_on_utg(self):
        """
        generate an event based on current UTG
        @return: InputEvent
        """
        if self.__first_event:
            self.__first_event = False
            self.logger.info("Trying to start the app...")
            start_app_intent = self.app.get_start_intent()
            return IntentEvent(intent=start_app_intent)
        else:
            return ManualEvent()


class TaskPolicy(UtgBasedInputPolicy):

    def __init__(
        self, device, app, random_input, task, use_memory=False, debug_mode=False
    ):
        super(TaskPolicy, self).__init__(device, app, random_input)
        self.logger = logging.getLogger(self.__class__.__name__)
        self.task = task

        self.__nav_target = None
        self.__nav_num_steps = -1
        self.__num_restarts = 0
        self.__num_steps_outside = 0
        self.__event_trace = ""
        self.__missed_states = set()
        self.__random_explore = random_input
        self.__action_history = []
        self.__thought_history = []
        self.use_memory = use_memory
        # if use_memory:
        #     self.memory = Memory(app_name=self.app.app_name, app_output_path=self.device.output_dir)
        if self.use_memory:
            (
                self.similar_ele_path,
                self.similar_ele_function,
                self.similar_ele_statement,
            ) = self.get_most_similar_element()
            if not self.similar_ele_function:
                self.use_memory = False
                print(
                    "=============\nWarning: Did not find the memory of this app, the app memory is disabled\n============="
                )
            else:
                print(
                    f"============\nFound element: {self.similar_ele_statement}\nPath: {self.similar_ele_path}\nFunction: {self.similar_ele_function}\n============"
                )
                self.state_ele_memory = (
                    {}
                )  # memorize some important states that contain elements of insight

    def get_most_similar_element(self):
        from InstructorEmbedding import INSTRUCTOR
        from sklearn.metrics.pairwise import cosine_similarity
        import numpy as np

        model = INSTRUCTOR("hkunlp/instructor-xl")
        task_embedding = model.encode("task: " + self.task).reshape(1, -1)

        with open(BASE_DIR + "/../" + "memory/node_filtered_elements.json") as file:
            ele_statements = json.load(file)
        with open(BASE_DIR + "/../" + "memory/element_description.json") as file:
            ele_functions = json.load(file)
        with open(BASE_DIR + "/../" + "memory/embedded_elements_desc.json") as file:
            embeddings = json.load(file)
        app_name = self.device.output_dir.split("/")[-1]
        if app_name not in embeddings.keys():
            return None, None, None
        app_embeddings = embeddings[app_name]

        # similarities = {}
        max_similarity, similar_ele_idx = -9999, -9999
        for state_str, elements in app_embeddings.items():
            # if the target element is in the first ui, no onclick is needed
            # if ele_statements[app_name][state_str]['path'] == []:
            #     continue
            # similarities[state_str] = []
            for idx, ele in enumerate(elements):
                if ele:
                    npele = np.array(ele).reshape(1, -1)
                    similarity = cosine_similarity(task_embedding, npele)[0][0]
                else:
                    similarity = -9999
                # similarities[state_str].append(similarity)
                if similarity > max_similarity:
                    max_similarity = similarity
                    similar_ele_idx = idx
                    similar_state_str = state_str

        similar_ele = ele_statements[app_name][similar_state_str]["elements"][
            similar_ele_idx
        ]
        similar_ele_path = ele_statements[app_name][similar_state_str]["path"]
        similar_ele_desc = ele_functions[app_name][similar_state_str][similar_ele_idx]
        del model
        return similar_ele_path, similar_ele_desc, similar_ele

    def _scroll_to_top(self, scroller, all_views_for_mark, old_state=None):
        prefix_scroll_event = []
        if old_state is None:
            old_state = self.current_state
        for _ in range(MAX_SCROLL_NUM):  # first scroll up to the top
            self.device.send_event(ScrollEvent(view=scroller, direction="UP"))
            scrolled_state = self.device.get_current_state()
            self.utg.add_transition(
                ScrollEvent(view=scroller, direction="UP"), old_state, scrolled_state
            )
            old_state = scrolled_state
            state_prompt, scrolled_candidate_actions, scrolled_views, _ = (
                scrolled_state.get_described_actions()
            )
            scrolled_new_views = []  # judge whether there is a new view after scrolling
            for scrolled_view in scrolled_views:
                if scrolled_view not in all_views_for_mark:
                    scrolled_new_views.append(scrolled_view)
                    all_views_for_mark.append(scrolled_view)
            if len(scrolled_new_views) == 0:
                break

            prefix_scroll_event.append(ScrollEvent(view=scroller, direction="UP"))
        return prefix_scroll_event

    def generate_event_based_on_utg(self, input_manager):
        """
        generate an event based on current UTG
        @return: InputEvent
        """
        current_state = self.current_state
        self.logger.info("Current state: %s" % current_state.state_str)
        if current_state.state_str in self.__missed_states:
            self.__missed_states.remove(current_state.state_str)

        if current_state.get_app_activity_depth(self.app) < 0:
            # If the app is not in the activity stack
            start_app_intent = self.app.get_start_intent()

            # It seems the app stucks at some state, has been
            # 1) force stopped (START, STOP)
            #    just start the app again by increasing self.__num_restarts
            # 2) started at least once and cannot be started (START)
            #    pass to let viewclient deal with this case
            # 3) nothing
            #    a normal start. clear self.__num_restarts.

            if self.__event_trace.endswith(
                EVENT_FLAG_START_APP + EVENT_FLAG_STOP_APP
            ) or self.__event_trace.endswith(EVENT_FLAG_START_APP):
                self.__num_restarts += 1
                self.logger.info(
                    "The app had been restarted %d times.", self.__num_restarts
                )
            else:
                self.__num_restarts = 0

            # pass (START) through
            if not self.__event_trace.endswith(EVENT_FLAG_START_APP):
                if self.__num_restarts > MAX_NUM_RESTARTS:
                    # If the app had been restarted too many times, enter random mode
                    msg = "The app had been restarted too many times. Entering random mode."
                    self.logger.info(msg)
                    self.__random_explore = True
                # syncxxx: 禁止启动
                # else:
                #     # Start the app
                #     self.__event_trace += EVENT_FLAG_START_APP
                #     self.logger.info("Trying to start the app...")
                #     # self.__action_history = [f'- start the app {self.app.app_name}']
                #     self.__action_history = [f'- launchApp {self.app.app_name}']
                #     self.__thought_history = [f'launch the app {self.app.app_name} to finish the task {self.task}']
                #     #
                #     return None, IntentEvent(intent=start_app_intent)

        elif current_state.get_app_activity_depth(self.app) > 0:
            # If the app is in activity stack but is not in foreground
            self.__num_steps_outside += 1

            if self.__num_steps_outside > MAX_NUM_STEPS_OUTSIDE:
                # If the app has not been in foreground for too long, try to go back
                if self.__num_steps_outside > MAX_NUM_STEPS_OUTSIDE_KILL:
                    stop_app_intent = self.app.get_stop_intent()
                    go_back_event = IntentEvent(stop_app_intent)
                else:
                    go_back_event = KeyEvent(name="BACK")
                self.__event_trace += EVENT_FLAG_NAVIGATE
                self.logger.info("Going back to the app...")
                self.__action_history.append("- go back")
                self.__thought_history.append(
                    "the app has not been in foreground for too long, try to go back"
                )
                return None, go_back_event
        else:
            # If the app is in foreground
            self.__num_steps_outside = 0

        scrollable_views = (
            current_state.get_scrollable_views()
        )  # self._get_scrollable_views(current_state)
        # syncxxxx: 禁止滑动
        scrollable_views = []

        if len(scrollable_views) > 0:
            """
            if there is at least one scroller in the screen, we scroll each scroller many times until all the screens after scrolling have been recorded, you do not need to read
            """
            # print(scrollable_views)

            actions_dict = {}
            whole_state_views, whole_state_actions, whole_state_strs = [], [], []

            # state_strs = [current_state.state_str]
            state_prompt, current_candidate_actions, current_views, _ = (
                current_state.get_described_actions()
            )
            all_views_for_mark = copy.deepcopy(
                current_views
            )  # just for judging whether the screen has been scrolled up to the top

            for scrollerid in range(len(scrollable_views)):
                scroller = scrollable_views[scrollerid]
                # prefix_scroll_event = []
                actions_dict[scrollerid] = []

                prefix_scroll_event = self._scroll_to_top(scroller, all_views_for_mark)

                # after scrolling to the top, update the current_state
                top_state = self.device.get_current_state()
                state_prompt, top_candidate_actions, top_views, _ = (
                    top_state.get_described_actions()
                )
                all_views_without_id, all_actions = top_views, top_candidate_actions

                too_few_item_time = 0

                for _ in range(MAX_SCROLL_NUM):  # then scroll down to the bottom
                    whole_state_strs.append(
                        top_state.state_str
                    )  # record the states from the top to the bottom
                    self.device.send_event(ScrollEvent(view=scroller, direction="DOWN"))
                    scrolled_state = self.device.get_current_state()
                    state_prompt, scrolled_candidate_actions, scrolled_views, _ = (
                        scrolled_state.get_described_actions()
                    )

                    scrolled_new_views = []
                    for scrolled_view_id in range(len(scrolled_views)):
                        scrolled_view = scrolled_views[scrolled_view_id]
                        if scrolled_view not in all_views_without_id:
                            scrolled_new_views.append(scrolled_view)
                            all_views_without_id.append(scrolled_view)
                            all_actions.append(
                                prefix_scroll_event
                                + [
                                    ScrollEvent(view=scroller, direction="DOWN"),
                                    scrolled_candidate_actions[scrolled_view_id],
                                ]
                            )
                    # print('found new views:', scrolled_new_views)
                    if len(scrolled_new_views) == 0:
                        break

                    prefix_scroll_event.append(
                        ScrollEvent(view=scroller, direction="DOWN")
                    )

                    if len(scrolled_new_views) < 2:
                        too_few_item_time += 1
                    if too_few_item_time >= 2:
                        break

                    self.utg.add_transition(
                        ScrollEvent(view=scroller, direction="DOWN"),
                        top_state,
                        scrolled_state,
                    )
                    top_state = scrolled_state

                # filter out the views that have been added to the whole_state by scrolling other scrollers
                for all_view_id in range(len(all_views_without_id)):
                    view = all_views_without_id[all_view_id]
                    if view not in whole_state_views:
                        whole_state_views.append(view)
                        whole_state_actions.append(all_actions[all_view_id])

                all_views_for_mark = []
                _ = self._scroll_to_top(scroller, all_views_for_mark, top_state)
            # print(whole_state_views)
            action, candidate_actions, target_view, thought = (
                self._get_action_from_views_actions(
                    views=whole_state_views,
                    candidate_actions=whole_state_actions,
                    state_strs=whole_state_strs,
                    action_history=self.__action_history,
                    thought_history=self.__thought_history,
                )
            )

            if isinstance(action, list):  # the screen has to be scrolled first
                last_state = None
                for eventid in range(len(action) - 1):
                    self.device.send_event(action[eventid])
                    last_state = self.device.get_current_state()
                    # self.__action_history.append(current_state.get_action_desc(action[eventid]))
                self.__action_history.append(
                    current_state.get_action_descv2(action[-1], target_view)
                )
                self.__thought_history.append(thought)
                return last_state, action[-1]
            """
            end for dealing with scrollers
            """
        else:
            action, candidate_actions, target_view, thought = (
                self._get_action_from_views_actions(
                    current_state=current_state,
                    action_history=self.__action_history,
                    thought_history=self.__thought_history,
                    state_strs=current_state.state_str,
                )
            )

        if action == FINISHED:
            return None, FINISHED
        if action is not None:
            self.__action_history.append(
                current_state.get_action_descv2(action, target_view)
            )
            self.__thought_history.append(thought)
            return None, action

        if self.__random_explore:
            self.logger.info("Trying random event.")
            action = random.choice(candidate_actions)
            self.__action_history.append(
                current_state.get_action_descv2(action, target_view)
            )
            self.__thought_history.append("random trying")
            return None, action

        # If couldn't find a exploration target, stop the app
        stop_app_intent = self.app.get_stop_intent()
        self.logger.info("Cannot find an exploration target. Trying to restart app...")
        self.__action_history.append("- stop the app")
        self.__thought_history.append(
            "couldn't find a exploration target, stop the app"
        )
        self.__event_trace += EVENT_FLAG_STOP_APP
        return None, IntentEvent(intent=stop_app_intent)

    def _save2yaml(self, file_name, state_prompt, idx, state_str, inputs="null"):
        if not os.path.exists(file_name):
            tmp_data = {"task_name": self.task, "step_num": 0, "records": []}
            with open(file_name, "w", encoding="utf-8") as f:
                yaml.dump(tmp_data, f)

        with open(file_name, "r", encoding="utf-8") as f:
            old_yaml_data = yaml.safe_load(f)

        new_records = old_yaml_data["records"]
        new_records.append(
            {
                "State": state_prompt,
                "Choice": idx,
                "Input": inputs,
                "state_str": state_str,
            }
        )
        # import pdb;pdb.set_trace()
        data = {
            "task_name": self.task,
            "step_num": len(list(old_yaml_data["records"])),
            "records": new_records,
        }
        with open(file_name, "w", encoding="utf-8") as f:
            yaml.dump(data, f)

    def _make_prompt(
        self,
        state_prompt,
        action_history,
        is_text,
        state_str,
        view_text=None,
        thought_history=None,
        use_thoughts=True,
    ):
        if self.use_memory:
            # if isinstance(state_str, list):
            #     if len(state_str) == 1:
            #         state_str = state_str[0]
            #     else:
            #         state_str = self.memory.hash_state(state_prompt)
            # new_state_prompt = self.f(action_history, state_prompt, state_str)
            # if new_state_prompt !z= None and new_state_prompt != 'no_description':
            #     state_prompt = new_state_prompt
            if len(action_history) <= len(self.similar_ele_path):
                current_ui_id = len(action_history) - 1
                new_state_prompt = tools.insert_onclick_into_prompt(
                    state_prompt,
                    self.similar_ele_path[current_ui_id],
                    self.similar_ele_function,
                )
                if (
                    new_state_prompt != state_prompt
                ):  # current state contains an element of insight
                    self.state_ele_memory[state_str] = new_state_prompt
                state_prompt = new_state_prompt
            # elif state_str in self.state_ele_memory.keys():
            #     state_prompt = self.state_ele_memory[state_str]

        if use_thoughts:
            history_with_thought = []
            for idx in range(len(action_history)):
                history_with_thought.append(
                    action_history[idx] + "\n    Reason: " + thought_history[idx]
                )
        else:
            history_with_thought = action_history

        introduction = """You are a smartphone assistant to help users complete tasks by interacting with mobile apps.Given a task, the previous UI actions, and the content of current UI state, your job is to decide whether the task is already finished by the previous actions, and if not, decide which UI element in current UI state should be interacted. 1. If the given task content is vague or may involve multiple configuration tasks (e.g., 'Configure settings in the page'), please analyze the current page information and autonomously break down the task into more specific subtasks. 2. Notably, when you encounter an operation that needs to input some text/id/number, or there are multiple options that are uncertain, please feel free to enter any legal content yourself, or choose a random certain value, and your answer should also be certain. Never use "or" in your answer. 3. **Please note that the same action should not be performed consecutively more than three times on the same state.**"""
        task_prompt = (
            "Task (also see detailed task and subtasks in Previous UI actions): "
            + self.task
        )
        history_prompt = "Previous UI actions: \n" + "\n".join(history_with_thought)
        full_state_prompt = "Current UI state: \n" + state_prompt
        request_prompt = """Your answer should always use the following format:1. What task/subtasks you need to complete and completing this tasks on a smartphone usually involves these steps: <?>.\n2. Analyses of the relations between the task and the previous UI actions and current UI state: <?>.\n3. Based on the previous actions, is the task already finished? <Y/N>. The next step should be (If this step has been performed more than 3 times in the same state in previous rounds, reorganize the response by selecting an alternative action.) <?/None>.\n4. Can the task be proceeded with the current UI state? <Y/N>. Fill in the blanks about the next one interaction: - id=<id number> - action=<tap/input> - input text=<text or N/A>"""
        prompt = (
            introduction
            + "\n"
            + task_prompt
            + "\n"
            + history_prompt
            + "\n"
            + full_state_prompt
            + "\n"
            + request_prompt
        )
        return prompt

    def _extract_input_text(self, string, start="Text: ", end=" Thought"):
        start_index = string.find(start) + len(start)  # Find the location of 'start'
        if start_index == -1:
            start_index = 0
        end_index = string.find(end)  # Find the location of 'end'
        substring = (
            string[start_index:end_index] if end_index != -1 else string[start_index:]
        )
        return substring

    def _extract_input_textv2(self, string):
        if string[:11] == "InputText: ":
            return string[11:]
        else:
            return string

    def _get_text_view_description(self, view):
        content_description = safe_dict_get(view, "content_description", default="")
        view_text = safe_dict_get(view, "text", default="")

        view_desc = f"<input class='&'>#</input>"  # .replace('&', view_class)#.replace('#', text)
        if view_text:
            view_desc = view_desc.replace("#", view_text)
        else:
            view_desc = view_desc.replace("#", "")
        if content_description:
            view_desc = view_desc.replace("&", content_description)
        else:
            view_desc = view_desc.replace(" class='&'", "")
        return view_desc

    def _get_action_from_views_actions(
        self,
        action_history,
        thought_history,
        views=None,
        candidate_actions=None,
        state_strs=None,
        current_state=None,
    ):
        """
        get action choice from LLM based on a list of views and corresponding actions
        """
        if current_state:
            state_prompt, candidate_actions, _, _ = (
                current_state.get_described_actions()
            )
            state_str = current_state.state_str
            prompt = self._make_prompt(
                state_prompt,
                action_history,
                is_text=False,
                state_str=state_str,
                thought_history=thought_history,
            )
        else:
            views_with_id = []
            for id in range(len(views)):
                views_with_id.append(tools.insert_id_into_view(views[id], id))
            state_prompt = "\n".join(views_with_id)
            state_str = tools.hash_string(state_prompt)
            prompt = self._make_prompt(
                state_prompt,
                action_history,
                is_text=False,
                state_str=state_str,
                thought_history=thought_history,
            )

        print(
            "********************************** prompt: **********************************"
        )
        print(prompt)
        print(
            "********************************** end of prompt **********************************"
        )
        response = tools.query_gpt(prompt)

        print(f"response: {response}")

        file_name = (
            self.device.output_dir
            + "/"
            + self.task.replace('"', "_").replace("'", "_")[:10]
            + ".yaml"
        )  # str(str(time.time()).replace('.', ''))
        idx, action_type, input_text = tools.extract_action(response)

        if idx == -1:
            return FINISHED, None, None, None

        selected_action = candidate_actions[idx]

        selected_view_description = tools.get_item_properties_from_id(
            ui_state_desc=state_prompt, view_id=idx
        )
        try:
            thought = re.findall("involves these steps: (.*)?\.\n", response)[
                0
            ]  # tools.get_thought(response)
        except:
            thought = ""

        if isinstance(selected_action, SetTextEvent):
            if input_text != "N/A" and input_text != None:
                selected_action.text = input_text.replace('"', "").replace(" ", "-")
                try:
                    int(selected_action.text)
                except:
                    selected_action.text += "a"
                if (
                    len(selected_action.text) > 30
                ):  # heuristically disable long text input
                    selected_action.text = ""
            else:
                selected_action.text = ""
            self._save2yaml(
                file_name, state_prompt, idx, state_strs, inputs=selected_action.text
            )
        else:
            self._save2yaml(file_name, state_prompt, idx, state_strs, inputs="null")
        return selected_action, candidate_actions, selected_view_description, thought

    def _insert_predictions_into_state_prompt(
        self, state_prompt, current_state_item_descriptions
    ):
        state_prompt_list = state_prompt.split(">\n")
        item_list = []
        for view_desc in state_prompt_list:
            if view_desc[0] == " ":
                view_desc = view_desc[1:]
            if view_desc[-1] != ">":
                view_desc = view_desc + ">"
            view_desc_without_id = tools.get_view_without_id(view_desc)
            if view_desc_without_id in current_state_item_descriptions.keys():
                prediction = (
                    "title=" + current_state_item_descriptions[view_desc_without_id]
                )
                view_desc_list = view_desc.split(" ", 2)
                if (
                    len(view_desc_list) > 2
                ):  # for example, <button id=3 class='More options' checked=False></button>
                    inserted_view = (
                        view_desc_list[0]
                        + " "
                        + view_desc_list[1]
                        + " "
                        + prediction
                        + " "
                        + view_desc_list[2]
                    )
                else:  # for example, <p id=4>June</p>
                    latter_part = view_desc_list[1].split(">", 1)
                    inserted_view = (
                        view_desc_list[0]
                        + " "
                        + latter_part[0]
                        + " "
                        + prediction
                        + ">"
                        + latter_part[1]
                    )
                if inserted_view[-1] != ">":
                    inserted_view += ">"
                item_list.append(inserted_view)
            else:
                item_list.append(view_desc)
        return "\n".join(item_list)

    def _get_item_prediction(self, action_history, state_prompt, state_str):
        """
        find the most match history_state in memory_graph based on action_history.
        match the current items in device_state with the history items in history_state,
        return the predicted screen after touching the item
        if can not find the device_state not in action_history, return None, can decide whether to explore
        """

        def parse_history_views(history):
            parsed_views = []
            for history_action in history:
                history_action_list = history_action.split(": ", 1)
                if "launchApp" in history_action:
                    return []
                latter_part = history_action_list[1]
                if " InputText:" in latter_part:
                    target_view = latter_part.split(" InputText:", 1)[0]
                elif " Reason:" in latter_part:
                    target_view = latter_part.split(" Reason:", 1)[0]
                else:
                    target_view = latter_part
                parsed_views.append(target_view)
            return parsed_views

        action_history = parse_history_views(
            action_history[1:]
        )  # ignore the first action, which is launching the app

        # search the current state str in memory based on history actions
        current_state_str = self.memory.get_first_state_str()
        next_state_str = None
        for actionid in range(0, len(action_history)):
            actioned_view = action_history[
                actionid
            ]  # action_history[actionid].rsplit('.', 1)[0]
            next_state_str = self.memory.get_successor_by_node_edge(
                current_state_str, actioned_view
            )
            current_state_str = next_state_str
            # the past actions have lead to a state that does not exist in the memory
            if next_state_str == None:
                break
        if next_state_str == None:
            current_state_str = state_str
        # now, current_state_str is the current device state string, we should add all its successors' information into the items on this device state
        current_state_item_descriptions = self.memory.get_predictions_of_items(
            current_state_str
        )
        # import pdb;pdb.set_trace()
        if current_state_item_descriptions is None:
            return "no_description"  # there is no description of the current state, either it is the leaf node or it was not explored
        # import pdb;pdb.set_trace()
        return self._insert_predictions_into_state_prompt(
            state_prompt, current_state_item_descriptions
        )


class AutodroidCrawlerPolicy(UtgBasedInputPolicy):
    """
    A policy for crawling Android apps to discover new pages, driven by an LLM.
    """

    def __init__(
        self, device, app, random_input, task, use_memory=False, debug_mode=False
    ):
        super(AutodroidCrawlerPolicy, self).__init__(device, app, random_input)
        self.logger = logging.getLogger(self.__class__.__name__)
        self.task = task  # The overall goal, now interpreted as exploration

        self.__nav_target = None
        self.__nav_num_steps = -1
        self.__num_restarts = 0
        self.__num_steps_outside = 0
        self.__event_trace = ""
        self.__missed_states = set()
        self.__random_explore = random_input
        # MODIFICATION: Action history will now store dictionaries
        self.__action_history = []
        self.__thought_history = []
        self.use_memory = use_memory
        
        # 新增：用于应用状态恢复的变量
        self.__last_valid_state = None  # 记录最后一个有效的应用内状态
        self.__is_recovering = False    # 标记是否正在恢复状态
        self.__exit_causing_actions = set()  # 记录导致应用退出的操作
        self.__last_action_desc = None  # 记录上一次执行的操作描述
        
        # 新增：用于BFS遍历的变量
        self.__state_button_queue = {}  # 记录每个状态的按钮遍历队列 {state_str: [button_indices]}
        self.__current_state_buttons = []  # 当前状态的按钮队列
        self.__visited_states = set()  # 已访问的状态
        self.__state_depth = {}  # 记录状态的深度层级

        if self.use_memory:
            (
                self.similar_ele_path,
                self.similar_ele_function,
                self.similar_ele_statement,
            ) = self.get_most_similar_element()
            if not self.similar_ele_function:
                self.use_memory = False
                print(
                    "=============\nWarning: Did not find the memory of this app, the app memory is disabled\n============="
                )
            else:
                print(
                    f"============\nFound element: {self.similar_ele_statement}\nPath: {self.similar_ele_path}\nFunction: {self.similar_ele_function}\n============"
                )
                self.state_ele_memory = (
                    {}
                )  # memorize some important states that contain elements of insight

    # ============================================================================================
    # MODIFICATION 1: Updated LLM query method to include page summary in the response structure.
    # ============================================================================================
    def _query_llm_for_action(self, system_prompt, user_prompt, llm="gpt-4o"):
        """
        Queries the LLM for the next action using structured output parsing.
        """
        from pydantic import BaseModel, Field
        from openai import OpenAI

        # Define the structure of the expected response from the LLM
        class LLMResponse(BaseModel):
            idx: str = Field(
                description="The numeric index 'id' of the element to interact with. Should be a string, e.g., '3'."
            )
            action_type: str = Field(
                description="The type of action to perform. Either 'tap' or 'input'."
            )
            input_text: str = Field(
                description="The text to input for an 'input' action. Use 'N/A' if the action is 'tap'."
            )
            # NEW FIELD: Added page_summary to the response model.
            page_summary: str = Field(
                description="Provide a concise feature list of the current page, e.g., 'This page's functions are: function1, function2, ...'"
            )

        try:
            # Initialize the OpenAI client (assumes OPENAI_API_KEY is set in the environment)
            client = OpenAI()
            completion = client.beta.chat.completions.parse(
                model=llm,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                response_format=LLMResponse,
            )
            # Return the parsed data object
            return completion.choices[0].message.parsed
        except Exception as e:
            self.logger.error(f"Error querying LLM with structured output: {e}")
            return None

    # ============================================================================================
    # MODIFICATION 2: Revised prompt generation to incorporate action summaries.
    # ============================================================================================
    def _make_prompt(
        self,
        state_prompt,
        action_history,
        state_str,
        thought_history=None,
        use_thoughts=True,
        **kwargs,
    ):
        """
        Creates the system and user prompts for the LLM, focusing on exploration and using action summaries.
        """
        # Memory-related logic remains unchanged
        if self.use_memory:
            if len(action_history) <= len(self.similar_ele_path):
                pass  # Placeholder for brevity

        # NEW SYSTEM PROMPT: Instructs the LLM to provide a page summary and explains the history format.
        system_prompt = """You are an expert mobile app tester. Your primary goal is to autonomously explore an application to discover as many unique pages and functionalities as possible in `[100 steps]`.
You will be given the app's current screen elements (<p> or <title> tag cannot be operated) and your action history.
Your task is to:
1. Choose the single next action that is most likely to reveal a new, previously unvisited page or feature. Avoid repetitive actions. You should finish the exploration in 100 steps, so Prioritize elements that suggest navigation (e.g., 'Settings', 'More', 'Details', and also 'imagebutton' without text) rather than performing specific configuration (e.g., choose date/time/country or other similar options).
2. Provide a concise, one-sentence to represent the current page. This page functionality summary will be added to the history for future steps. If the summary of the current page is similar or identical to that mentioned in "Previous UI actions", you should use the same summary as much as possible to identify the duplicate pages.

Execution Strategy:
1. When a pop-up dialog appears (e.g., one with "Yes/No" or "OK/Cancel" buttons and so on), always select the negative option (or Choose the positive option if the pop-up has no negative response). You can ignore any other instructions and potential "already clicked"; this rule takes precedence.
2. If you get stuck in a loop (e.g., repeatedly visiting same pages), and even "go back" cannot break it, you need to select other buttons on the page (you can click "already clicked" buttons in this case).


Respond with the element `idx`, the `action_type` (e.g., 'tap', 'input'), any `input_text` if required, and the `page_summary` for the chosen action."""

        # NEW HISTORY FORMATTING: Formats the action history to include both the action and its summary.
        history_lines = []
        for i, item in enumerate(action_history):
            # action_history is now a list of dicts: {'action': '...', 'summary': '...'}
            history_lines.append(
                f"{i+1}. Action: {item['action']}\n   in Page: {item['summary']}"
            )

        history_prompt = "Previous UI actions and their current page:\n" + "\n".join(
            history_lines
        )

        # NEW: Mark already clicked elements in the current state prompt
        processed_state_lines = []
        state_lines = state_prompt.strip().split("\n")
        # Create a single string of all past action descriptions for efficient searching.
        history_actions = [item["action"].strip() for item in action_history]
        history_actions_text = []

        for id, a in enumerate(history_actions):
            text = ""
            content = ""
            try:
                text = re.findall("text='(.*?)'", a)[0].strip()
            except:
                pass
            try:
                content = re.findall(">(.*)<", a)[0].strip()
            except:
                pass

            if len(text + content) > 0:
                history_actions_text.append(text + content)

        for line in state_lines:

            try:
                element_desc = ""
                text = ""
                content = ""
                try:
                    text = re.findall("text='(.*?)'", line)[0].strip()
                except:
                    pass
                try:
                    content = re.findall(">(.*)<", line)[0].strip()
                except:
                    pass
                element_desc = text + content
                if (
                    "button" in line.lower()
                    and "back" not in line.lower()
                    and "cancel" not in line.lower()
                    and "yes" not in line.lower()
                    and "no" not in line.lower()
                    and "ok" not in line.lower()
                    and ",ok" not in line.lower()
                    and "ok," not in line.lower()
                    and "确定" not in line.lower()
                    and "取消" not in line.lower()
                    and len(element_desc) > 0
                    and element_desc in history_actions_text
                ):
                    processed_state_lines.append(f"{line} [potential already clicked]")
                else:
                    processed_state_lines.append(line)
            except:
                processed_state_lines.append(line)

        full_state_prompt = "Current UI state with interactive elements:\n" + "\n".join(
            processed_state_lines
        )
        request_prompt = "Based on the history and current screen, select the next action to perform to discover a new page and provide a summary of its purpose."

        # The user prompt provides the context for the current decision
        user_prompt = (
            f"Task: {self.task}\n\n"
            f"{history_prompt}\n\n"
            f"{full_state_prompt}\n\n"
            f"{request_prompt}"
        )

        return system_prompt, user_prompt

    # ============================================================================================
    # MODIFICATION 3: Core logic updated to process the new page_summary field.
    # ============================================================================================
    def _get_action_from_views_actions(
        self,
        action_history,
        thought_history,
        views=None,
        candidate_actions=None,
        state_strs=None,
        current_state=None,
    ):
        """
        Get action choice from LLM and the new page summary.
        """
        if current_state:

            # 2025-7-24: 提供给LLM的actions修改为merged operations
            sys.path.append(BASE_DIR + "/../../")
            from Confiot_main.ConfigurationParser.OperationExtraction import (
                OperationExtractor,
            )

            def get_described_operations(operations, plain_labels, hashable_views):
                text_frame = "<p id=@>#</p>"
                btn_frame = "<button id=@>#</button>"
                imgbtn_frame = "<imagebutton id=@>#</imagebutton>"
                checkbox_frame = "<checkbox id=@ checked=$>#</checkbox>"
                input_frame = "<input id=@>#</input>"

                state_prompt = ""
                # event list
                candidate_actions = []
                
                # 检测是否存在原生返回按钮的函数
                def is_back_button(view, text):
                    """
                    检测一个view是否是返回按钮
                    """
                    if not text:
                        text = ""
                    text_lower = text.lower().strip()
                    
                    # 检查文本内容
                    back_keywords = [
                        'back', 'return', '返回', '后退', 'previous', 'prev',
                        '←', '‹', '<', '◀', '⬅', '⬅️'
                    ]
                    
                    for keyword in back_keywords:
                        if keyword in text_lower:
                            return True
                    
                    # 检查resource_id
                    resource_id = view.get("resource_id", "") or ""
                    resource_id = resource_id.lower()
                    if any(keyword in resource_id for keyword in ['back', 'return', 'previous']):
                        return True
                    
                    # 检查content_description
                    content_desc = view.get("content_description", "") or ""
                    content_desc = content_desc.lower()
                    if any(keyword in content_desc for keyword in back_keywords):
                        return True
                    
                    # 检查class名称（某些返回按钮可能是ImageButton）
                    class_name = view.get("class", "") or ""
                    class_name = class_name.lower()
                    if 'back' in class_name:
                        return True
                    
                    return False

                # 添加纯文本标签
                for label_view in plain_labels:
                    view_desc = text_frame.replace("@", str(len(candidate_actions))).replace(
                        "#", label_view["text"]
                    )
                    state_prompt += view_desc + "\n"
                    candidate_actions.append(TouchEvent(view=label_view))

                # 添加有文本标签的操作
                first_button_is_back = False  # 标记第一个按钮是否是返回按钮
                
                for op in operations:
                    op_view = hashable_views[op]
                    op_type = op_view["class"]
                    op_text = ",".join([tview[0]["text"] for tview in operations[op]])

                    lowertext = op_text.lower()
                    # popup dialog
                    if (
                        "cancel" in lowertext
                        or "apply" in lowertext
                        or "yes" in lowertext
                        or "confirm" in lowertext
                        or "ok" == lowertext
                        or ",ok" in lowertext
                        or "ok," in lowertext
                        or "确定" in lowertext
                        or "取消" in lowertext
                    ):
                        state_prompt, candidate_actions, _, _ = (
                            current_state.get_described_actions()
                        )
                        return state_prompt, candidate_actions

                    # 检查是否是返回按钮（只检查第一个按钮，即id=0的位置）
                    current_id = len(candidate_actions)
                    is_back = is_back_button(op_view, op_text)
                    
                    # 如果是第一个按钮且是返回按钮，标记但不添加
                    if current_id == 0 and is_back:
                        first_button_is_back = True
                        self.logger.info(f"Detected native back button at id=0: '{op_text}', filtering it out")
                        continue  # 跳过这个返回按钮，不添加到候选操作中

                    if op_view["checkable"]:
                        view_desc = checkbox_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", op_text
                        ).replace("$", str(op_view["checked"]))
                        state_prompt += view_desc + "\n"
                        candidate_actions.append(TouchEvent(view=op_view))
                    elif op_view["editable"]:
                        view_desc = input_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", op_text
                        )
                        state_prompt += view_desc + "\n"
                        candidate_actions.append(SetTextEvent(view=op_view, text="HelloWorld"))
                    elif "image" in op_type.lower() or "img" in op_type.lower():
                        view_desc = imgbtn_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", op_text
                        )
                        state_prompt += view_desc + "\n"
                        candidate_actions.append(TouchEvent(view=op_view))
                    else:
                        view_desc = btn_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", op_text
                        )
                        state_prompt += view_desc + "\n"
                        candidate_actions.append(TouchEvent(view=op_view))

                # 新增：添加没有文本但可能有用的可点击元素
                processed_view_ids = set()
                # 记录已经处理过的view，避免重复
                for op in operations:
                    processed_view_ids.add(hashable_views[op]["temp_id"])
                for label_view in plain_labels:
                    processed_view_ids.add(label_view["temp_id"])

                # 遍历所有views，寻找被遗漏的可交互元素
                for view in current_state.views:
                    if view["temp_id"] in processed_view_ids:
                        continue
                    if not view["visible"]:
                        continue
                    
                    # 检查是否是可交互的元素
                    is_interactive = (
                        view.get("clickable", False) or 
                        view.get("checkable", False) or 
                        view.get("long_clickable", False) or
                        view.get("editable", False)
                    )
                    
                    if not is_interactive:
                        continue
                    
                    # 生成元素描述
                    element_text = ""
                    
                    # 优先使用text
                    if view.get("text") and view["text"].strip():
                        element_text = view["text"].strip()
                    # 其次使用content_description
                    elif view.get("content_description") and view["content_description"].strip():
                        element_text = view["content_description"].strip()
                    # 再次使用resource_id
                    elif view.get("resource_id") and view["resource_id"].strip():
                        resource_id = view["resource_id"].strip()
                        # 提取resource_id的最后部分作为描述
                        if "/" in resource_id:
                            element_text = resource_id.split("/")[-1]
                        else:
                            element_text = resource_id
                    # 最后使用class名称
                    else:
                        class_name = view.get("class", "").split(".")[-1]
                        element_text = class_name if class_name else "element"
                    
                    # 限制文本长度
                    if len(element_text) > 30:
                        element_text = element_text[:30] + "..."
                    
                    # 根据元素类型生成描述
                    if view.get("editable", False):
                        view_desc = input_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", element_text
                        )
                        candidate_actions.append(SetTextEvent(view=view, text="HelloWorld"))
                    elif view.get("checkable", False):
                        view_desc = checkbox_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", element_text
                        ).replace("$", str(view.get("checked", False)))
                        candidate_actions.append(TouchEvent(view=view))
                    elif "image" in view.get("class", "").lower():
                        view_desc = imgbtn_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", element_text
                        )
                        candidate_actions.append(TouchEvent(view=view))
                    else:
                        view_desc = btn_frame.replace("@", str(len(candidate_actions))).replace(
                            "#", element_text
                        )
                        candidate_actions.append(TouchEvent(view=view))
                    
                    state_prompt += view_desc + "\n"

                state_prompt += f"<button id={len(candidate_actions)}>go back</button>"
                candidate_actions.append(KeyEvent(name="BACK"))

                return state_prompt, candidate_actions


            OE = OperationExtractor()
            OE.views = copy.deepcopy(current_state.views)
            for v in OE.views:
                OE.viewsId[v["temp_id"]] = v
            operations, plain_labels, hashable_views = OE.extract_operations()
            state_prompt, candidate_actions = get_described_operations(operations, plain_labels, hashable_views)

            # print(state_prompt)

            # exit()
            # state_prompt, candidate_actions, _, _ = (
            #     current_state.get_described_actions()
            # )
            state_str = current_state.state_str
        else:
            # Handle case where current_state is not provided
            self.logger.error(
                "current_state is not provided to _get_action_from_views_actions"
            )
            return None, None, None, "Internal error: current_state is missing.", None

        # 1. 在生成prompt之前，先过滤掉会导致应用退出的操作和不想要的内容
        filtered_actions = []
        filtered_state_lines = []
        
        state_lines = state_prompt.strip().split('\n')
        for i, (action, state_line) in enumerate(zip(candidate_actions, state_lines)):
            # 使用与记录时相同的方法生成操作描述
            if isinstance(action, KeyEvent):
                action_desc = f"- TapOn: <button>go back</button>"
            else:
                # 直接使用action的view来生成描述，确保与记录时一致
                if hasattr(action, 'view') and action.view:
                    view_desc = current_state.get_view_desc(action.view)
                    action_desc = current_state.get_action_descv2(action, view_desc)
                else:
                    # fallback方法
                    try:
                        view_desc = tools.get_item_properties_from_id(
                            ui_state_desc=state_prompt, view_id=i
                        )
                        if isinstance(view_desc, dict):
                            view_desc = str(view_desc)
                        action_desc = current_state.get_action_descv2(action, view_desc)
                    except:
                        action_desc = f"- TapOn: element_{i}"
            
            # 检查是否包含不想要的内容（Shop/Store相关）
            is_unwanted_content = self._is_shop_or_store_related(state_line, action_desc)
            if is_unwanted_content:
                self.logger.info(f"Filtering out shop/store related action: {action_desc}")
                continue
            
            # 检查是否会导致退出 - 使用更宽松的匹配策略
            exit_action_key = f"{current_state.state_str}::{action_desc}"
            is_exit_causing = False
            
            # 精确匹配
            if exit_action_key in self.__exit_causing_actions:
                is_exit_causing = True
            else:
                # 模糊匹配：检查是否有相似的操作描述
                for recorded_key in self.__exit_causing_actions:
                    recorded_state, recorded_action = recorded_key.split("::", 1)
                    # 如果状态相同且操作描述相似，也认为是危险操作
                    if (recorded_state == current_state.state_str and 
                        self._actions_are_similar(action_desc, recorded_action)):
                        is_exit_causing = True
                        self.logger.info(f"Found similar exit-causing action: {recorded_action} vs {action_desc}")
                        break
            
            if not is_exit_causing:
                filtered_actions.append(action)
                # 重新分配ID
                new_id = len(filtered_actions) - 1
                updated_line = state_line.replace(f"id={i}", f"id={new_id}")
                filtered_state_lines.append(updated_line)
            else:
                self.logger.warning(f"Filtering out exit-causing action from prompt: {action_desc}")
        
        # 如果所有操作都被过滤掉了，保留一个非back操作
        if not filtered_actions:
            self.logger.warning("All actions were filtered out, keeping non-back actions")
            for i, (action, state_line) in enumerate(zip(candidate_actions, state_lines)):
                if not isinstance(action, KeyEvent):  # 不是back按钮
                    filtered_actions.append(action)
                    new_id = len(filtered_actions) - 1
                    updated_line = state_line.replace(f"id={i}", f"id={new_id}")
                    filtered_state_lines.append(updated_line)
                    break
        
        # 更新候选操作和状态描述
        candidate_actions = filtered_actions
        filtered_state_prompt = '\n'.join(filtered_state_lines)
        
        self.logger.info(f"Filtered {len(state_lines) - len(filtered_state_lines)} exit-causing actions")
        
        # 2. Generate the new prompts with filtered actions
        system_prompt, user_prompt = self._make_prompt(
            state_prompt=filtered_state_prompt,
            action_history=action_history,
            thought_history=thought_history,
            state_str=state_str,
        )

        print("*" * 34 + " PROMPT (System) " + "*" * 34)
        print(system_prompt)
        print("*" * 35 + " PROMPT (User) " + "*" * 35)
        print(user_prompt)
        print("*" * 36 + " END OF PROMPT " + "*" * 37)

        # 2. Query the LLM using the new structured output method
        parsed_response = self._query_llm_for_action(system_prompt, user_prompt)

        if parsed_response is None:
            self.logger.warning(
                "LLM query failed. No action will be taken in this step."
            )
            return None, None, None, "LLM query failed.", None

        # NEW: Print the full parsed response including the summary
        print(
            f"LLM Response (parsed): idx='{parsed_response.idx}', action_type='{parsed_response.action_type}', "
            f"input_text='{parsed_response.input_text}'"
        )

        # 3. Process the structured response
        try:
            if not parsed_response.idx.isdigit():
                if "finish" in parsed_response.idx.lower():
                    return FINISHED, None, None, "Exploration finished by LLM.", None
                else:
                    raise ValueError("idx is not a digit.")
            idx = int(parsed_response.idx)
            action_type = parsed_response.action_type
            input_text = parsed_response.input_text
            # NEW: Extract the page summary from the response
            page_summary = parsed_response.page_summary
        except (ValueError, TypeError) as e:
            self.logger.error(
                f"LLM returned an invalid index or data: {parsed_response}. Error: {e}"
            )
            return None, None, None, "LLM returned invalid data.", None

        if idx < 0 or idx >= len(candidate_actions):
            self.logger.warning(
                f"LLM returned out-of-bounds index: {idx}. Number of actions is {len(candidate_actions)}."
            )
            return None, None, None, "LLM returned an invalid action index.", None

        selected_action = candidate_actions[idx]
        selected_view_description = tools.get_item_properties_from_id(
            ui_state_desc=state_prompt, view_id=idx
        )

        # The "thought" now includes the LLM's summary.
        thought = f"LLM chose action '{action_type}' on element {idx}"

        if isinstance(selected_action, SetTextEvent):
            if input_text and input_text.upper() != "N/A":
                selected_action.text = input_text
                if len(selected_action.text) > 30:
                    selected_action.text = selected_action.text[:30]
            else:
                selected_action.text = "randomtext"

        # self._save2yaml(...) # Saving logic remains unchanged

        # NEW: Return the extracted page_summary
        return (
            selected_action,
            candidate_actions,
            selected_view_description,
            thought,
            page_summary,
        )

    # ============================================================================================
    # MODIFICATION 4: Update event generation to handle new history format.
    # ============================================================================================
    def _check_and_recover_app_state(self):
        """
        检查当前是否在目标应用中，如果不在则重启应用并复现路径
        """
        current_state = self.current_state
        target_package = self.app.get_package_name()
        current_package = current_state.foreground_activity.split('/')[0] if current_state.foreground_activity else None
        
        # 如果当前在目标应用中，更新最后有效状态
        if current_package == target_package:
            self.__last_valid_state = current_state
            self.__is_recovering = False
            return None
        
        # 如果不在目标应用中，记录导致退出的操作
        if self.__last_action_desc is not None and self.__last_valid_state is not None:
            # 创建一个唯一的操作标识符：状态+操作描述
            exit_action_key = f"{self.__last_valid_state.state_str}::{self.__last_action_desc}"
            self.__exit_causing_actions.add(exit_action_key)
            self.logger.warning(f"Recording exit-causing action: {self.__last_action_desc}")
            self.logger.warning(f"Total exit-causing actions recorded: {len(self.__exit_causing_actions)}")
        
        # 如果不在目标应用中，需要恢复
        self.logger.warning(f"App switched from target {target_package} to {current_package}")
        
        if self.__last_valid_state is None:
            # 如果没有记录的有效状态，直接重启应用
            self.logger.info("No valid state recorded, restarting app...")
            start_app_intent = self.app.get_start_intent()
            self.__action_history.append({
                "action": f"- restart app {target_package}",
                "summary": f"App exited to {current_package}, restarting target app"
            })
            return IntentEvent(intent=start_app_intent)
        
        # 重启应用并复现路径
        self.logger.info(f"Restarting app and recovering to last valid state: {self.__last_valid_state.state_str}")
        self.__is_recovering = True
        
        # 重启应用
        start_app_intent = self.app.get_start_intent()
        self.__action_history.append({
            "action": f"- restart app and recover path",
            "summary": f"App exited, restarting and recovering to previous state"
        })
        return IntentEvent(intent=start_app_intent)
    
    def _recover_to_last_state(self):
        """
        复现路径到最后一个有效状态
        """
        if not self.__is_recovering or self.__last_valid_state is None:
            return None
            
        current_state = self.current_state
        target_state = self.__last_valid_state
        
        # 获取从当前状态到目标状态的导航步骤
        navigation_steps = self.utg.get_navigation_steps(
            from_state=current_state, 
            to_state=target_state
        )
        
        if navigation_steps and len(navigation_steps) > 0:
            self.logger.info(f"Recovering path: {len(navigation_steps)} steps to reach previous state")
            # 返回第一个导航步骤
            return navigation_steps[0][1]
        else:
            # 如果无法找到路径，结束恢复模式
            self.logger.warning("Cannot find path to recover to last valid state")
            self.__is_recovering = False
            return None

    def generate_event_based_on_utg(self, input_manager=None):
        current_state = self.current_state
        self.logger.info("Current state: %s" % current_state.state_str)
        if current_state.state_str in self.__missed_states:
            self.__missed_states.remove(current_state.state_str)

        # 首先检查应用状态并尝试恢复
        recovery_event = self._check_and_recover_app_state()
        if recovery_event is not None:
            return None, recovery_event
        
        # 如果正在恢复路径中，尝试继续恢复
        if self.__is_recovering:
            recovery_step = self._recover_to_last_state()
            if recovery_step is not None:
                return None, recovery_step
            # 如果恢复完成，继续正常流程

        if current_state.get_app_activity_depth(self.app) < 0:
            # If the app is not in the activity stack
            start_app_intent = self.app.get_start_intent()
            self.__action_history.append({
                "action": f"- start app {self.app.get_package_name()}",
                "summary": "App not in activity stack, starting it"
            })
            return None, IntentEvent(intent=start_app_intent)
        elif current_state.get_app_activity_depth(self.app) > 0:
            self.__num_steps_outside += 1
            if self.__num_steps_outside > MAX_NUM_STEPS_OUTSIDE:
                # If the app has not been in foreground for too long, try to go back
                if self.__num_steps_outside > MAX_NUM_STEPS_OUTSIDE_KILL:
                    stop_app_intent = self.app.get_stop_intent()
                    go_back_event = IntentEvent(stop_app_intent)
                else:
                    go_back_event = KeyEvent(name="BACK")
                self.__event_trace += EVENT_FLAG_NAVIGATE
                self.logger.info("Going back to the app...")
                self.__action_history.append({
                    "action": "- go back to app",
                    "summary": "App was in background, attempting to return"
                })
                self.__thought_history.append(
                    "the app has not been in foreground for too long, try to go back"
                )
                return None, go_back_event
        else:
            self.__num_steps_outside = 0

        scrollable_views = []  # Feature disabled as in original code

        if len(scrollable_views) > 0:
            pass
        else:
            # BFS遍历逻辑：优先遍历当前状态的所有按钮
            action, candidate_actions, target_view, thought, page_summary = (
                self._get_bfs_action(
                    current_state=current_state,
                    action_history=self.__action_history,
                    thought_history=self.__thought_history,
                )
            )

        if action == FINISHED:
            return None, FINISHED
        if action is not None:
            action_desc = current_state.get_action_descv2(action, target_view)
            
            # 记录当前操作描述，用于下次检查
            self.__last_action_desc = action_desc
            
            # NEW: Append a dictionary to the action history
            self.__action_history.append(
                {"action": action_desc, "summary": page_summary}
            )
            self.__thought_history.append(thought)
            return None, action

        if self.__random_explore:
            self.logger.info("Trying random event.")
            # The original code might have failed here if candidate_actions was empty.
            if not candidate_actions:
                self.logger.warning("No candidate actions available for random choice.")
                # Fall through to the app restart logic
            else:
                action = random.choice(candidate_actions)
                # FIX: `target_view` is not available here. Use `action.view` instead.
                action_desc = current_state.get_action_descv2(action, action.view)
                # NEW: Update history with a dictionary for random actions
                self.__action_history.append(
                    {
                        "action": action_desc,
                        "summary": "Performing a random action due to lack of a clear path.",
                    }
                )
                self.__thought_history.append("random trying")
                return None, action

        stop_app_intent = self.app.get_stop_intent()
        self.logger.info("Cannot find an exploration target. Trying to restart app...")
        # NEW: Update history with a dictionary for app stop
        self.__action_history.append(
            {
                "action": "- stop the app",
                "summary": "Cannot find an exploration target, restarting the app.",
            }
        )
        self.__thought_history.append(
            "couldn't find an exploration target, stop the app"
        )
        self.__event_trace += EVENT_FLAG_STOP_APP
        return None, IntentEvent(intent=stop_app_intent)

    # ============================================================================================
    # UNCHANGED METHODS BELOW
    # All other methods from the original class are preserved without modification.
    # ============================================================================================

    def get_most_similar_element(self):
        from InstructorEmbedding import INSTRUCTOR
        from sklearn.metrics.pairwise import cosine_similarity
        import numpy as np

        model = INSTRUCTOR("hkunlp/instructor-xl")
        task_embedding = model.encode("task: " + self.task).reshape(1, -1)

        with open(BASE_DIR + "/../" + "memory/node_filtered_elements.json") as file:
            ele_statements = json.load(file)
        with open(BASE_DIR + "/../" + "memory/element_description.json") as file:
            ele_functions = json.load(file)
        with open(BASE_DIR + "/../" + "memory/embedded_elements_desc.json") as file:
            embeddings = json.load(file)
        app_name = self.device.output_dir.split("/")[-1]
        if app_name not in embeddings.keys():
            return None, None, None
        app_embeddings = embeddings[app_name]

        max_similarity, similar_ele_idx = -9999, -9999
        similar_state_str = ""
        for state_str, elements in app_embeddings.items():
            for idx, ele in enumerate(elements):
                if ele:
                    npele = np.array(ele).reshape(1, -1)
                    similarity = cosine_similarity(task_embedding, npele)[0][0]
                else:
                    similarity = -9999
                if similarity > max_similarity:
                    max_similarity = similarity
                    similar_ele_idx = idx
                    similar_state_str = state_str

        similar_ele = ele_statements[app_name][similar_state_str]["elements"][
            similar_ele_idx
        ]
        similar_ele_path = ele_statements[app_name][similar_state_str]["path"]
        similar_ele_desc = ele_functions[app_name][similar_state_str][similar_ele_idx]
        del model
        return similar_ele_path, similar_ele_desc, similar_ele

    def _save2yaml(self, file_name, state_prompt, idx, state_str, inputs="null"):
        if not os.path.exists(file_name):
            tmp_data = {"task_name": self.task, "step_num": 0, "records": []}
            with open(file_name, "w", encoding="utf-8") as f:
                yaml.dump(tmp_data, f)
        with open(file_name, "r", encoding="utf-8") as f:
            old_yaml_data = yaml.safe_load(f)
        new_records = old_yaml_data["records"]
        new_records.append(
            {
                "State": state_prompt,
                "Choice": idx,
                "Input": inputs,
                "state_str": state_str,
            }
        )
        data = {
            "task_name": self.task,
            "step_num": len(list(old_yaml_data["records"])),
            "records": new_records,
        }
        with open(file_name, "w", encoding="utf-8") as f:
            yaml.dump(data, f)

    # Other helper methods are kept as they were
    def _extract_input_text(self, string, start="Text: ", end=" Thought"):
        start_index = string.find(start) + len(start)
        if start_index == -1:
            start_index = 0
        end_index = string.find(end)
        substring = (
            string[start_index:end_index] if end_index != -1 else string[start_index:]
        )
        return substring

    def _extract_input_textv2(self, string):
        if string[:11] == "InputText: ":
            return string[11:]
        else:
            return string

    def _is_shop_or_store_related(self, state_line, action_desc):
        """
        检查操作是否与商店/购物相关，如果是则过滤掉
        """
        # 定义与商店/购物相关的关键词
        shop_keywords = [
            'discover', 'service', 'shop', 'store', 'shopping', 'buy', 'cart', 'checkout',
            'payment', 'product', 'price', 'sale', 'discount',
            'marketplace', 'commerce', 'merchant', 'vendor', 'retail', 'goods',
            'catalog', 'inventory', 'wishlist', 'basket', 'billing', 'invoice',
            'refund', 'coupon', 'voucher', 'deal', 'offer'
        ]
        
        # 将state_line和action_desc转换为小写进行检查
        combined_text = (state_line + " " + action_desc).lower()
        
        # 检查是否包含任何商店相关的关键词
        for keyword in shop_keywords:
            if keyword in combined_text:
                return True
        
        return False

    def _actions_are_similar(self, action1, action2):
        """
        检查两个操作描述是否相似，用于模糊匹配退出操作
        """
        # 提取操作中的关键文本内容
        def extract_action_content(action_desc):
            # 提取按钮文本
            try:
                # 匹配 <button>text</button> 或 <button text='text'>content</button>
                button_text = ""
                if ">" in action_desc and "<" in action_desc:
                    # 提取标签内容
                    content_match = re.search(r'>([^<]+)<', action_desc)
                    if content_match:
                        button_text += content_match.group(1).strip()
                
                # 提取text属性
                text_match = re.search(r"text='([^']*)'", action_desc)
                if text_match:
                    button_text += text_match.group(1).strip()
                
                return button_text.lower().strip()
            except:
                return action_desc.lower().strip()
        
        content1 = extract_action_content(action1)
        content2 = extract_action_content(action2)
        
        # 如果内容相同或者都包含相同的关键词，认为是相似的
        if content1 == content2:
            return True
        
        # 检查是否包含相同的关键词（长度大于2的词）
        words1 = set([w for w in content1.split() if len(w) > 2])
        words2 = set([w for w in content2.split() if len(w) > 2])
        
        if words1 and words2 and words1.intersection(words2):
            return True
        
        # 检查是否是相同类型的操作（都是Forum相关）
        key_terms = ['forum', 'review', 'program', 'reviewer']
        action1_has_term = any(term in content1 for term in key_terms)
        action2_has_term = any(term in content2 for term in key_terms)
        
        if action1_has_term and action2_has_term:
            return True
        
        return False

    def _get_bfs_action(self, current_state, action_history, thought_history):
        """
        实现BFS遍历策略：先按顺序遍历当前页面的所有按钮，再依次进入每个子页面
        """
        state_str = current_state.state_str
        
        # 初始化当前状态的按钮队列（如果还没有的话）
        if state_str not in self.__state_button_queue:
            # 获取当前状态的所有操作
            action, candidate_actions, target_view, thought, page_summary = (
                self._get_action_from_views_actions(
                    current_state=current_state,
                    action_history=action_history,
                    thought_history=thought_history,
                    state_strs=state_str,
                )
            )
            
            # 如果获取操作失败，返回原结果
            if action is None:
                return action, candidate_actions, target_view, thought, page_summary
            
            # 创建按钮索引队列（排除back按钮，它通常是最后一个）
            button_indices = []
            for i, candidate_action in enumerate(candidate_actions):
                if not isinstance(candidate_action, KeyEvent):  # 不是back按钮
                    button_indices.append(i)
            
            # 将back按钮放在最后
            for i, candidate_action in enumerate(candidate_actions):
                if isinstance(candidate_action, KeyEvent):  # back按钮
                    button_indices.append(i)
            
            self.__state_button_queue[state_str] = button_indices
            self.__current_state_buttons = button_indices.copy()
            
            self.logger.info(f"BFS: Initialized button queue for state {state_str} with {len(button_indices)} buttons")
        else:
            # 使用已存在的按钮队列
            self.__current_state_buttons = self.__state_button_queue[state_str].copy()
            
            # 重新获取当前状态的操作（因为可能有变化）
            action, candidate_actions, target_view, thought, page_summary = (
                self._get_action_from_views_actions(
                    current_state=current_state,
                    action_history=action_history,
                    thought_history=thought_history,
                    state_strs=state_str,
                )
            )
            
            if action is None:
                return action, candidate_actions, target_view, thought, page_summary
        
        # BFS策略：按顺序选择下一个未点击的按钮
        for button_idx in self.__current_state_buttons:
            if button_idx < len(candidate_actions):
                selected_action = candidate_actions[button_idx]
                
                # 生成操作描述来检查是否已经执行过
                if isinstance(selected_action, KeyEvent):
                    action_desc = f"- TapOn: <button>go back</button>"
                else:
                    try:
                        if hasattr(selected_action, 'view') and selected_action.view:
                            view_desc = current_state.get_view_desc(selected_action.view)
                            action_desc = current_state.get_action_descv2(selected_action, view_desc)
                        else:
                            view_desc = tools.get_item_properties_from_id(
                                ui_state_desc="", view_id=button_idx
                            )
                            action_desc = current_state.get_action_descv2(selected_action, view_desc)
                    except:
                        action_desc = f"- TapOn: element_{button_idx}"
                
                # 检查这个操作是否在历史中已经执行过（在当前状态）
                current_state_actions = []
                for hist_item in action_history:
                    if isinstance(hist_item, dict):
                        current_state_actions.append(hist_item['action'])
                    else:
                        current_state_actions.append(str(hist_item))
                
                # 简单的重复检查：如果这个操作在最近几步中出现过，跳过
                recent_actions = current_state_actions[-3:] if len(current_state_actions) >= 3 else current_state_actions
                action_already_tried = any(action_desc.strip() in recent_action.strip() for recent_action in recent_actions)
                
                if not action_already_tried:
                    # 从队列中移除这个按钮索引
                    self.__state_button_queue[state_str].remove(button_idx)
                    
                    # 获取目标视图描述
                    try:
                        target_view_desc = tools.get_item_properties_from_id(
                            ui_state_desc="", view_id=button_idx
                        )
                    except:
                        target_view_desc = "button"
                    
                    bfs_thought = f"BFS: Selecting button {button_idx} from current state queue"
                    bfs_page_summary = f"Exploring button {button_idx} in BFS order"
                    
                    self.logger.info(f"BFS: Selected button {button_idx}, remaining buttons in queue: {len(self.__state_button_queue[state_str])}")
                    
                    return selected_action, candidate_actions, target_view_desc, bfs_thought, bfs_page_summary
        
        # 如果当前状态的所有按钮都已经尝试过，选择back按钮或者随机选择
        self.logger.info(f"BFS: All buttons in current state {state_str} have been tried, going back or random selection")
        
        # 寻找back按钮
        for i, candidate_action in enumerate(candidate_actions):
            if isinstance(candidate_action, KeyEvent):
                target_view_desc = "back_button"
                bfs_thought = "BFS: All buttons tried, going back to explore other states"
                bfs_page_summary = "Going back after exploring all buttons in current state"
                return candidate_action, candidate_actions, target_view_desc, bfs_thought, bfs_page_summary
        
        # 如果没有back按钮，随机选择一个
        if candidate_actions:
            selected_action = random.choice(candidate_actions)
            target_view_desc = "random_selection"
            bfs_thought = "BFS: No back button available, random selection"
            bfs_page_summary = "Random selection when no back button is available"
            return selected_action, candidate_actions, target_view_desc, bfs_thought, bfs_page_summary
        
        # 如果没有任何操作可选，返回None
        return None, [], None, "BFS: No actions available", "No actions available in current state"

    def _get_text_view_description(self, view):
        content_description = safe_dict_get(view, "content_description", default="")
        view_text = safe_dict_get(view, "text", default="")
        view_desc = f"<input class='&'>#</input>"
        if view_text:
            view_desc = view_desc.replace("#", view_text)
        else:
            view_desc = view_desc.replace("#", "")
        if content_description:
            view_desc = view_desc.replace("&", content_description)
        else:
            view_desc = view_desc.replace(" class='&'", "")
        return view_desc
