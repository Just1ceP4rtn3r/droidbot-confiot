#!/usr/bin/env python3
"""
Automated pipeline for running Confiot app analysis with Autodroid crawler.
This script automates the process of running Autodroid crawl/parse/oracle tasks.
"""

import os
import subprocess
import argparse
from pathlib import Path
import json
import sys
from datetime import datetime
import logging
import time

class ConfiotAutodroidPipeline:
    def __init__(self, base_output_dir, apks_dir):
        self.base_output_dir = Path(base_output_dir)
        self.apks_dir = Path(apks_dir)
        self.base_output_dir.mkdir(parents=True, exist_ok=True)
        
    def run_command(self, cmd, description, log_file=None):
        """Run a command and handle output with logging"""
        print(f"\n{'='*60}")
        print(f"Running: {description}")
        print(f"Command: {' '.join(cmd)}")
        print(f"{'='*60}")
        
        # Prepare log content
        log_content = []
        log_content.append(f"{'='*60}")
        log_content.append(f"Running: {description}")
        log_content.append(f"Command: {' '.join(cmd)}")
        log_content.append(f"Start time: {datetime.now().isoformat()}")
        log_content.append(f"{'='*60}")
        
        try:
            # Run the command with real-time output streaming
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            
            # Stream output in real-time and collect for logging
            for line in process.stdout:
                timestamp = datetime.now().strftime('%H:%M:%S')
                formatted_line = f"[{timestamp}] {line}"
                print(formatted_line, end='')
                log_content.append(formatted_line.rstrip())
            
            # Wait for the process to complete
            return_code = process.wait()
            
            # Add completion info to log
            end_time = datetime.now().isoformat()
            log_content.append(f"\nEnd time: {end_time}")
            log_content.append(f"Exit code: {return_code}")
            
            if return_code == 0:
                print(f"\n✓ Success: {description}")
                log_content.append(f"✓ Success: {description}")
                success = True
            else:
                print(f"\n✗ Failed: {description} (exit code: {return_code})")
                log_content.append(f"✗ Failed: {description} (exit code: {return_code})")
                success = False
                
        except Exception as e:
            error_msg = f"✗ Failed: {description}\nError: {str(e)}"
            print(f"\n{error_msg}")
            log_content.append(f"\n{error_msg}")
            success = False
        
        # Save log to file if specified
        if log_file:
            try:
                log_file.parent.mkdir(parents=True, exist_ok=True)
                with open(log_file, 'a', encoding='utf-8') as f:
                    f.write('\n'.join(log_content) + '\n\n')
            except Exception as e:
                print(f"Warning: Failed to write log to {log_file}: {e}")
        
        return success
            
    def process_app(self, app_config):
        """Process a single app through the Autodroid pipeline"""
        app_name = app_config['app_name']
        guest_device = app_config.get('guest_device', app_config.get('device_name'))
        device_names = app_config.get('device_names')
        apk_path = self.apks_dir / app_config['apk_file']
        
        print(f"\n{'#'*80}")
        print(f"Processing app: {app_name}")
        print(f"Guest Device: {guest_device}")
        print(f"Device Names: {device_names}")
        print(f"APK: {apk_path}")
        print(f"{'#'*80}")
        
        # Create output directory structure (guest only for Autodroid)
        app_output_dir = self.base_output_dir / app_name
        guest_dir = app_output_dir / "guest"
        
        guest_dir.mkdir(parents=True, exist_ok=True)
        
        # Create log file for this app
        log_file = app_output_dir / f"pipeline_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        
        print(f"Created directories:")
        print(f"  - {app_output_dir}")
        print(f"  - {guest_dir}")
        print(f"  - Log file: {log_file}")
        
        # Process each device name
        overall_success = True
        
        for device_name in device_names:
            print(f"\n{'='*40}")
            print(f"Processing device: {device_name}")
            print(f"{'='*40}")
            
            # # Step 1: Run Autodroid crawler
            # autodroid_crawler_cmd = [
            #     "python3", "main.py",
            #     "--Autodroid-crawler",
            #     f"--A-app-path={apk_path}",
            #     f"--A-device={guest_device}",
            #     f"--A-droidbot-output={guest_dir}",
            #     f"--device-name={device_name}"
            # ]
            
            # crawler_success = self.run_command(
            #     autodroid_crawler_cmd,
            #     f"Autodroid crawling {app_name} for device '{device_name}'",
            #     log_file
            # )
            
            # if not crawler_success:
            #     print(f"⚠️  Autodroid crawler failed for {app_name} with device '{device_name}'")
            #     overall_success = False
        
        # # Step 2: Run task parser (once for all devices)
        # parser_cmd = [
        #     "python3", "main.py",
        #     "--A-device", guest_device,
        #     "--task-parser",
        #     f"--A-app-path={apk_path}",
        #     f"--A-droidbot-output={guest_dir}"
        # ]
        
        # parser_success = self.run_command(
        #     parser_cmd,
        #     f"Parsing results for {app_name}",
        #     log_file
        # )
        
        # if not parser_success:
        #     print(f"⚠️  Parser failed for {app_name}")
        #     overall_success = False
        
        # Step 3: Run oracle
        oracle_cmd = [
            "python3", "main.py",
            "--oracle",
            f"--a-device={guest_device}",
            f"--a-app-path={apk_path}",
            f"--a-droidbot-output={guest_dir}"
        ]
        
        oracle_success = self.run_command(
            oracle_cmd,
            f"Running oracle for {app_name}",
            log_file
        )
        
        if not oracle_success:
            print(f"⚠️  Oracle failed for {app_name}")
            overall_success = False
        
        # Log final results for this app
        final_results = {
            'app_name': app_name,
            # 'crawler_success': crawler_success if 'crawler_success' in locals() else False,
            # 'parser_success': parser_success,
            'oracle_success': oracle_success,
            'timestamp': datetime.now().isoformat()
        }
        
        # Write summary to log file
        try:
            with open(log_file, 'a', encoding='utf-8') as f:
                f.write(f"\n{'='*80}\n")
                f.write(f"FINAL RESULTS FOR {app_name.upper()}\n")
                f.write(f"{'='*80}\n")
                f.write(json.dumps(final_results, indent=2))
                f.write(f"\n{'='*80}\n\n")
        except Exception as e:
            print(f"Warning: Failed to write final results to log: {e}")
        
        print(f"\n{'='*60}")
        print(f"App {app_name} completed - Overall success: {overall_success}")
        print(f"Log saved to: {log_file}")
        print(f"{'='*60}")
        
        return overall_success
        
    def run_pipeline(self, config_file):
        """Run the pipeline for all apps in the configuration"""
        # Load configuration
        with open(config_file, 'r') as f:
            config = json.load(f)
            
        apps = config.get('apps', [])
        
        print(f"\nStarting Autodroid pipeline for {len(apps)} apps")
        print(f"Base output directory: {self.base_output_dir}")
        print(f"APKs directory: {self.apks_dir}")
        
        # Process each app
        results = []
        for i, app_config in enumerate(apps, 1):
            print(f"\n{'='*80}")
            print(f"App {i}/{len(apps)}")
            
            success = self.process_app(app_config)
            results.append({
                'app_name': app_config['app_name'],
                'success': success,
                'timestamp': datetime.now().isoformat()
            })
            
        # Print summary
        print(f"\n{'#'*80}")
        print("PIPELINE SUMMARY")
        print(f"{'#'*80}")
        
        successful = sum(1 for r in results if r['success'])
        failed = len(results) - successful
        
        print(f"\nTotal apps processed: {len(results)}")
        print(f"✓ Successful: {successful}")
        print(f"✗ Failed: {failed}")
        
        print("\nDetailed results:")
        for result in results:
            status = "✓" if result['success'] else "✗"
            print(f"  {status} {result['app_name']}")
            
        # Save results to file
        results_file = self.base_output_dir / f"pipeline_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(results_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nResults saved to: {results_file}")
        
        return successful == len(results)

def main():
    parser = argparse.ArgumentParser(
        description="Automated Autodroid pipeline for Confiot app analysis"
    )
    parser.add_argument(
        '--config',
        type=str,
        default='pipeline_config.json',
        help='Configuration file with app details (default: pipeline_config.json)'
    )
    parser.add_argument(
        '--output-dir',
        type=str,
        default='/Users/tracy/workspace/projects/ConfioT/ndss26',
        help='Base output directory for results'
    )
    parser.add_argument(
        '--apks-dir',
        type=str,
        default='/Users/tracy/workspace/projects/ConfioT/apks',
        help='Directory containing APK files'
    )
    
    args = parser.parse_args()
    
    # Check if config file exists
    if not os.path.exists(args.config):
        print(f"Error: Configuration file '{args.config}' not found")
        print("\nPlease create a configuration file with the following format:")
        print('''
{
  "apps": [
    {
      "app_name": "Govee_home",
      "guest_device": "17281JECB06200",
      "apk_file": "com.govee.home.apk",
      "device_names": ["Shared,Smart Plug", "Other Device"]
    }
  ]
}
        ''')
        sys.exit(1)
        
    # Run pipeline
    pipeline = ConfiotAutodroidPipeline(args.output_dir, args.apks_dir)
    success = pipeline.run_pipeline(args.config)
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()