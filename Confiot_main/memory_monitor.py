#!/usr/bin/env python3
"""
Memory monitoring utility for DroidBot-ConfioT
This script helps monitor and debug memory usage issues during app crawling.
"""

import psutil
import os
import time
import json
from datetime import datetime
from pathlib import Path
import gc
import sys

class MemoryMonitor:
    def __init__(self, log_file=None):
        self.process = psutil.Process()
        self.log_file = log_file
        self.start_time = time.time()
        self.peak_memory = 0
        self.memory_history = []
        
    def get_memory_info(self):
        """Get current memory usage information"""
        memory_info = self.process.memory_info()
        memory_percent = self.process.memory_percent()
        
        # Get system memory info
        system_memory = psutil.virtual_memory()
        
        info = {
            'timestamp': datetime.now().isoformat(),
            'elapsed_time': time.time() - self.start_time,
            'rss_mb': memory_info.rss / 1024 / 1024,  # Resident Set Size in MB
            'vms_mb': memory_info.vms / 1024 / 1024,  # Virtual Memory Size in MB
            'memory_percent': memory_percent,
            'system_available_mb': system_memory.available / 1024 / 1024,
            'system_used_percent': system_memory.percent,
            'pid': self.process.pid
        }
        
        # Track peak memory
        if info['rss_mb'] > self.peak_memory:
            self.peak_memory = info['rss_mb']
            
        return info
    
    def log_memory(self, context="", force_gc=False):
        """Log current memory usage with optional context"""
        if force_gc:
            gc.collect()
            
        info = self.get_memory_info()
        info['context'] = context
        
        self.memory_history.append(info)
        
        # Print to console
        print(f"[MEMORY] {context}: RSS={info['rss_mb']:.1f}MB, "
              f"VMS={info['vms_mb']:.1f}MB, "
              f"Percent={info['memory_percent']:.1f}%, "
              f"Elapsed={info['elapsed_time']:.1f}s")
        
        # Log to file if specified
        if self.log_file:
            with open(self.log_file, 'a') as f:
                f.write(json.dumps(info) + '\n')
                
        return info
    
    def check_memory_leak(self, threshold_mb=500, window_size=10):
        """Check for potential memory leaks"""
        if len(self.memory_history) < window_size:
            return False
            
        recent_memory = [entry['rss_mb'] for entry in self.memory_history[-window_size:]]
        memory_growth = recent_memory[-1] - recent_memory[0]
        
        if memory_growth > threshold_mb:
            print(f"[WARNING] Potential memory leak detected! "
                  f"Memory grew by {memory_growth:.1f}MB in last {window_size} measurements")
            return True
            
        return False
    
    def get_summary(self):
        """Get memory usage summary"""
        if not self.memory_history:
            return {}
            
        current = self.memory_history[-1]
        initial = self.memory_history[0]
        
        return {
            'initial_memory_mb': initial['rss_mb'],
            'current_memory_mb': current['rss_mb'],
            'peak_memory_mb': self.peak_memory,
            'memory_growth_mb': current['rss_mb'] - initial['rss_mb'],
            'total_elapsed_time': current['elapsed_time'],
            'measurements_count': len(self.memory_history)
        }
    
    def cleanup_temp_files(self, temp_dirs):
        """Clean up temporary files to free disk space"""
        cleaned_files = 0
        freed_space = 0
        
        for temp_dir in temp_dirs:
            if os.path.exists(temp_dir):
                for root, dirs, files in os.walk(temp_dir):
                    for file in files:
                        file_path = os.path.join(root, file)
                        try:
                            file_size = os.path.getsize(file_path)
                            os.remove(file_path)
                            cleaned_files += 1
                            freed_space += file_size
                        except Exception as e:
                            print(f"[WARNING] Failed to remove {file_path}: {e}")
        
        print(f"[CLEANUP] Removed {cleaned_files} files, freed {freed_space / 1024 / 1024:.1f}MB")
        return cleaned_files, freed_space

def monitor_droidbot_memory(output_dir, interval=30):
    """Monitor DroidBot memory usage during execution"""
    log_file = os.path.join(output_dir, f"memory_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jsonl")
    monitor = MemoryMonitor(log_file)
    
    print(f"[MEMORY MONITOR] Starting memory monitoring, logging to {log_file}")
    print(f"[MEMORY MONITOR] PID: {monitor.process.pid}")
    
    try:
        monitor.log_memory("Initial")
        
        while True:
            time.sleep(interval)
            monitor.log_memory(f"Interval check")
            
            # Check for memory leaks
            if monitor.check_memory_leak():
                # Force garbage collection
                gc.collect()
                monitor.log_memory("After forced GC", force_gc=True)
                
                # Clean up temp files
                temp_dirs = [
                    os.path.join(output_dir, "temp"),
                    "/tmp/droidbot_*",
                    "/sdcard/screen_*.png"
                ]
                monitor.cleanup_temp_files(temp_dirs)
                
    except KeyboardInterrupt:
        print("\n[MEMORY MONITOR] Stopping...")
        
    finally:
        summary = monitor.get_summary()
        print(f"\n[MEMORY SUMMARY]")
        print(f"  Initial Memory: {summary.get('initial_memory_mb', 0):.1f}MB")
        print(f"  Peak Memory: {summary.get('peak_memory_mb', 0):.1f}MB")
        print(f"  Final Memory: {summary.get('current_memory_mb', 0):.1f}MB")
        print(f"  Memory Growth: {summary.get('memory_growth_mb', 0):.1f}MB")
        print(f"  Total Time: {summary.get('total_elapsed_time', 0):.1f}s")
        
        # Save summary
        summary_file = os.path.join(output_dir, f"memory_summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
        with open(summary_file, 'w') as f:
            json.dump(summary, f, indent=2)
        print(f"  Summary saved to: {summary_file}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Monitor DroidBot memory usage")
    parser.add_argument("--output-dir", default="/tmp", help="Output directory for logs")
    parser.add_argument("--interval", type=int, default=30, help="Monitoring interval in seconds")
    
    args = parser.parse_args()
    
    monitor_droidbot_memory(args.output_dir, args.interval)
