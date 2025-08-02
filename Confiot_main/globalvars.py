class GlobalVars:
    event_dict_steps = []
    current_proccess_state_str = ""
    step_outputfile = ""
    
    @classmethod
    def clear_all(cls):
        """Clear all global variables to prevent memory leaks"""
        cls.event_dict_steps = []
        cls.current_proccess_state_str = ""
        cls.step_outputfile = ""
        
    @classmethod
    def get_memory_usage(cls):
        """Get approximate memory usage of global variables"""
        import sys
        return {
            'event_dict_steps_size': sys.getsizeof(cls.event_dict_steps),
            'event_dict_steps_count': len(cls.event_dict_steps),
            'current_proccess_state_str_size': sys.getsizeof(cls.current_proccess_state_str),
            'step_outputfile_size': sys.getsizeof(cls.step_outputfile)
        }
