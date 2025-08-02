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

class ConfiotPipeline:
    def __init__(self, base_output_dir, apks_dir):
        self.base_output_dir = Path(base_output_dir)
        self.apks_dir = Path(apks_dir)
        self.base_output_dir.mkdir(parents=True, exist_ok=True)
        
    def run_command(self, cmd, description):
        """Run a command and handle output"""
        print(f"\n{'='*60}")
        print(f"Running: {description}")
        print(f"Command: {' '.join(cmd)}")
        print(f"{'='*60}")
        
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
            
            # Stream output in real-time
            for line in process.stdout:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] {line}", end='')
            
            # Wait for the process to complete
            return_code = process.wait()
            
            if return_code == 0:
                print(f"\n✓ Success: {description}")
                return True
            else:
                print(f"\n✗ Failed: {description} (exit code: {return_code})")
                return False
                
        except Exception as e:
            print(f"\n✗ Failed: {description}")
            print(f"Error: {str(e)}")
            return False
            
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
        
        print(f"Created directories:")
        print(f"  - {app_output_dir}")
        print(f"  - {host_dir}")
        print(f"  - {guest_dir}")
        
        # Step 1: Run host crawler
        host_crawler_cmd = [
            "python3", "main.py",
            "--device-name", app_name,  # This is used for the task description
            "--Autodroid-crawler",
            f"--A-app-path={apk_path}",
            f"--A-device={host_device}",
            f"--A-droidbot-output={host_dir}"
        ]
        
        # Add optional crawler parameters
        if 'crawler_steplimit' in app_config:
            host_crawler_cmd.append(f"--crawler-steplimit={app_config['crawler_steplimit']}")
            
        host_crawler_success = self.run_command(
            host_crawler_cmd,
            f"Host crawling {app_name} app on device {host_device}"
        )
        
        if not host_crawler_success:
            print(f"⚠️  Host crawler failed for {app_name}, continuing with host parser...")
            
        # Step 2: Run host parser
        host_parser_cmd = [
            "python3", "main.py",
            "--task-parser",
            f"--A-app-path={apk_path}",
            f"--A-device={host_device}",
            f"--A-droidbot-output={host_dir}"
        ]
        
        host_parser_success = self.run_command(
            host_parser_cmd,
            f"Parsing host results for {app_name}"
        )
        
        # Step 3: Run guest crawler
        guest_crawler_cmd = [
            "python3", "main.py",
            "--device-name", app_name,  # This is used for the task description
            "--Autodroid-crawler",
            f"--A-app-path={apk_path}",
            f"--A-device={guest_device}",
            f"--A-droidbot-output={guest_dir}"
        ]
        
        # Add optional crawler parameters
        if 'crawler_steplimit' in app_config:
            guest_crawler_cmd.append(f"--crawler-steplimit={app_config['crawler_steplimit']}")
            
        guest_crawler_success = self.run_command(
            guest_crawler_cmd,
            f"Guest crawling {app_name} app on device {guest_device}"
        )
        
        if not guest_crawler_success:
            print(f"⚠️  Guest crawler failed for {app_name}, continuing with guest parser...")
            
        # Step 4: Run guest parser
        guest_parser_cmd = [
            "python3", "main.py",
            "--task-parser",
            f"--A-app-path={apk_path}",
            f"--A-device={guest_device}",
            f"--A-droidbot-output={guest_dir}"
        ]
        
        guest_parser_success = self.run_command(
            guest_parser_cmd,
            f"Parsing guest results for {app_name}"
        )
        
        # Consider success if at least one crawler and one parser succeeded
        crawler_success = guest_crawler_success or host_crawler_success
        parser_success = guest_parser_success or host_parser_success
        
        return crawler_success and parser_success
        
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
