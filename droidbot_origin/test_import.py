#!/usr/bin/env python3
"""
Test script to verify that droidbot can be imported and basic functionality works
"""

import sys
import os

# Add the current directory to Python path so we can import droidbot
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test that all main droidbot modules can be imported"""
    try:
        print("Testing droidbot imports...")
        
        # Test main droidbot import
        from droidbot import DroidBot, Device, App
        print("✓ Successfully imported DroidBot, Device, App")
        
        # Test individual module imports
        from droidbot.intent import Intent
        print("✓ Successfully imported Intent")
        
        from droidbot.input_manager import InputManager
        print("✓ Successfully imported InputManager")
        
        from droidbot.env_manager import AppEnvManager
        print("✓ Successfully imported AppEnvManager")
        
        print("\nAll imports successful!")
        return True
        
    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False
    except Exception as e:
        print(f"✗ Unexpected error: {e}")
        return False

def test_intent_creation():
    """Test that Intent objects can be created"""
    try:
        from droidbot.intent import Intent
        
        # Test basic intent creation
        intent1 = Intent(suffix="com.example.app")
        print(f"✓ Created basic intent: {intent1}")
        
        # Test intent with action
        intent2 = Intent(action="android.intent.action.VIEW")
        print(f"✓ Created intent with action: {intent2}")
        
        return True
        
    except Exception as e:
        print(f"✗ Intent creation error: {e}")
        return False

if __name__ == "__main__":
    print("DroidBot Import Test")
    print("=" * 50)
    
    success = True
    success &= test_imports()
    
    print("\n" + "=" * 50)
    success &= test_intent_creation()
    
    print("\n" + "=" * 50)
    if success:
        print("✓ All tests passed!")
        sys.exit(0)
    else:
        print("✗ Some tests failed!")
        sys.exit(1)
