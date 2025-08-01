from TestingPhase import Phase
from Confiot_main.Confiot import Confiot
from Confiot_main.settings import settings


class TestingDriver:

    def __init__(self, Agent_host: Confiot, Agent_guest: Confiot):
        self.stage = Phase.Initilization

    def process_testing(self):
        self.test_Initilization()
        pass

    def test_Initilization(self):
        # 执行delegation
        pass

    def test_AfterDelegation(self):
        pass
