#!/usr/bin/env python3
"""
Automated pipeline for running Confiot app analysis.
This script automates the process of creating directories and running crawl/parse tasks for multiple apps.
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

class ConfiotPipeline:
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
        """Process a single app through the pipeline"""
        app_name = app_config['app_name']
        # Support both old device_name and new host_device/guest_device
        host_device = app_config.get('host_device', app_config.get('device_name'))
        guest_device = app_config.get('guest_device', app_config.get('device_name'))
        apk_path = self.apks_dir / app_config['apk_file']
        
        print(f"\n{'#'*80}")
        print(f"Processing app: {app_name}")
        print(f"Host Device: {host_device}")
        print(f"Guest Device: {guest_device}")
        print(f"APK: {apk_path}")
        print(f"{'#'*80}")
        
        # Create output directory structure
        app_output_dir = self.base_output_dir / app_name
        host_dir = app_output_dir / "host"
        guest_dir = app_output_dir / "guest"
        
        host_dir.mkdir(parents=True, exist_ok=True)
        guest_dir.mkdir(parents=True, exist_ok=True)
        
        # Create log file for this app
        log_file = app_output_dir / f"pipeline_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        
        print(f"Created directories:")
        print(f"  - {app_output_dir}")
        print(f"  - {host_dir}")
        print(f"  - {guest_dir}")
        print(f"  - Log file: {log_file}")
        
        # Add blacklist keywords if specified in config for host
        if 'blacklist_keywords' in app_config:
            blacklist_file = host_dir / "blacklist_keywords.json"
            with open(blacklist_file, 'w') as f:
                json.dump({"blacklist_keywords": app_config['blacklist_keywords']}, f)
            print(f"Created host blacklist file with {len(app_config['blacklist_keywords'])} keywords")
            
        # Add priority keywords if specified in config for host
        if 'priority_keywords' in app_config:
            priority_file = host_dir / "priority_keywords.json"
            with open(priority_file, 'w') as f:
                json.dump({"priority_keywords": app_config['priority_keywords']}, f)
            print(f"Created host priority file with {len(app_config['priority_keywords'])} keywords")
        
        # # Step 1: Run host crawler
        # host_crawler_cmd = [
        #     "droidbot",
        #     "-d", host_device,
        #     "-a", str(apk_path),
        #     "-policy", "bfs_greedy",
        #     "-keep_env",
        #     "-keep_app",
        #     "-ignore_ad",
        #     "-grant_perm",
        #     "-o", str(host_dir),
        #     "-interval", "1",
        #     "-timeout", "1200"  # 20 minutes = 1200 seconds
        # ]
            
        # host_crawler_success = self.run_command(
        #     host_crawler_cmd,
        #     f"Host crawling {app_name} app on device {host_device}",
        #     log_file
        # )
        
        # if not host_crawler_success:
        #     print(f"⚠️  Host crawler failed for {app_name}, continuing with host parser...")
            
        # # Step 2: Run host parser
        # host_parser_cmd = [
        #     "python3", "main.py",
        #     "--task-parser",
        #     f"--A-app-path={apk_path}",
        #     f"--A-device={host_device}",
        #     f"--A-droidbot-output={host_dir}"
        # ]
        
        # host_parser_success = self.run_command(
        #     host_parser_cmd,
        #     f"Parsing host results for {app_name}",
        #     log_file
        # )
        
        # Step 2.1: Run host testing (temporarily commented out)
        # host_testing_cmd = [
        #     "python3", "main.py",
        #     "--testing",
        #     f"--A-app-path={apk_path}",
        #     f"--A-device={host_device}",
        #     f"--A-droidbot-output={host_dir}"
        # ]
        # 
        # host_testing_success = self.run_command(
        #     host_testing_cmd,
        #     f"Running testing for host {app_name}"
        # )
        # host_testing_success = True  # Skip testing for now
        
        # # Step 2.2: Run host oracle
        # host_oracle_cmd = [
        #     "python3", "main.py",
        #     "--oracle",
        #     "-R",  # Administrator role
        #     f"--a-app-path={apk_path}",
        #     f"--a-device={host_device}",
        #     f"--a-droidbot-output={host_dir}"
        # ]
        
        # host_oracle_success = self.run_command(
        #     host_oracle_cmd,
        #     f"Running oracle for host {app_name}",
        #     log_file
        # )
        
        # # Step 3: Run guest crawler
        # guest_crawler_cmd = [
        #     "droidbot",
        #     "-d", guest_device,
        #     "-a", str(apk_path),
        #     "-policy", "bfs_greedy",
        #     "-keep_env",
        #     "-keep_app",
        #     "-ignore_ad",
        #     "-grant_perm",
        #     "-o", str(guest_dir),
        #     "-interval", "1",
        #     "-timeout", "180"  # 10 minutes = 600 seconds
        # ]
        
        # # Add blacklist keywords if specified in config
        # if 'blacklist_keywords' in app_config:
        #     blacklist_file = guest_dir / "blacklist_keywords.json"
        #     with open(blacklist_file, 'w') as f:
        #         json.dump({"blacklist_keywords": app_config['blacklist_keywords']}, f)
        #     print(f"Created blacklist file with {len(app_config['blacklist_keywords'])} keywords")
            
        # # Add priority keywords if specified in config
        # if 'priority_keywords' in app_config:
        #     priority_file = guest_dir / "priority_keywords.json"
        #     with open(priority_file, 'w') as f:
        #         json.dump({"priority_keywords": app_config['priority_keywords']}, f)
        #     print(f"Created priority file with {len(app_config['priority_keywords'])} keywords")
            
        # guest_crawler_success = self.run_command(
        #     guest_crawler_cmd,
        #     f"Guest crawling {app_name} app on device {guest_device}",
        #     log_file
        # )
        
        # if not guest_crawler_success:
        #     print(f"⚠️  Guest crawler failed for {app_name}, continuing with guest parser...")
            
        # Step 4: Run guest parser
        # guest_parser_cmd = [
        #     "python3", "main.py",
        #     "--task-parser",
        #     f"--A-app-path={apk_path}",
        #     f"--A-device={guest_device}",
        #     f"--A-droidbot-output={guest_dir}"
        # ]
        
        # guest_parser_success = self.run_command(
        #     guest_parser_cmd,
        #     f"Parsing guest results for {app_name}",
        #     log_file
        # )
        
        # Step 4.1: Run guest testing (temporarily commented out)
        # guest_testing_cmd = [
        #     "python3", "main.py",
        #     "--testing",
        #     f"--A-app-path={apk_path}",
        #     f"--A-device={guest_device}",
        #     f"--A-droidbot-output={guest_dir}"
        # ]
        # 
        # guest_testing_success = self.run_command(
        #     guest_testing_cmd,
        #     f"Running testing for guest {app_name}"
        # )
        guest_testing_success = True  # Skip testing for now
        
        # Step 4.2: Run guest oracle
        guest_oracle_cmd = [
            "python3", "main.py",
            "--oracle",
            # No -R flag for guest (guest role)
            f"--a-app-path={apk_path}",
            f"--a-device={guest_device}",
            f"--a-droidbot-output={guest_dir}"
        ]
        
        guest_oracle_success = self.run_command(
            guest_oracle_cmd,
            f"Running oracle for guest {app_name}",
            log_file
        )
        
        # Log final results for this app
        final_results = {
            'app_name': app_name,
            # 'host_crawler': host_crawler_success,
            # 'host_parser': host_parser_success,
            # 'host_testing': host_testing_success,
            # 'host_oracle': host_oracle_success,
            # 'guest_crawler': guest_crawler_success,
            # 'guest_parser': guest_parser_success,
            'guest_testing': guest_testing_success,
            'guest_oracle': guest_oracle_success,
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
        
        # Consider success if at least one crawler and one parser succeeded
        # crawler_success = guest_crawler_success or host_crawler_success
        # parser_success = guest_parser_success or host_parser_success
        # testing_success = guest_testing_success or host_testing_success
        # oracle_success = guest_oracle_success or host_oracle_success
        
        # overall_success = crawler_success and parser_success and testing_success and oracle_success
        overall_success = guest_parser_success and guest_oracle_success
        
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
        
        print(f"\nStarting pipeline for {len(apps)} apps")
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
        description="Automated pipeline for Confiot app analysis"
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
      "app_name": "tapocam",
      "host_device": "17291JECB10652",
      "guest_device": "17281JECB06200",
      "apk_file": "com.tplink.iot.apk"
    },
    {
      "app_name": "another_app",
      "device_name": "single_device",  // For single device (both host and guest)
      "apk_file": "com.example.app.apk",
      "crawler_steplimit": 100
    }
  ]
}
        ''')
        sys.exit(1)
        
    # Run pipeline
    pipeline = ConfiotPipeline(args.output_dir, args.apks_dir)
    success = pipeline.run_pipeline(args.config)
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
