#!/usr/bin/env python3
"""
Extract APKs from Android device
This script automates the process of finding running apps and extracting their APKs
"""

import subprocess
import re
import argparse
from pathlib import Path
from datetime import datetime

class APKExtractor:
    def __init__(self, output_dir="/Users/tracy/workspace/projects/ConfioT/apks"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        
    def run_adb_command(self, cmd):
        """Run an ADB command and return output"""
        try:
            # Add device ID to command if not already present
            if "-s " not in cmd:
                cmd = cmd.replace("adb ", "adb -s 17291JECB10652 ")
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
            return result.stdout.strip()
        except subprocess.CalledProcessError as e:
            print(f"ADB command failed: {cmd}")
            print(f"Error: {e.stderr}")
            return None
            
    def get_running_activities(self):
        """Get list of currently running activities"""
        print("\nFetching running activities...")
        output = self.run_adb_command("adb shell dumpsys activity top | grep ACTIVITY")
        
        if not output:
            print("No activities found or ADB error")
            return []
            
        activities = []
        for line in output.split('\n'):
            match = re.search(r'ACTIVITY\s+([^\s/]+)', line)
            if match:
                package_name = match.group(1)
                activities.append(package_name)
                
        print(f"Found {len(activities)} running activities:")
        for i, activity in enumerate(activities, 1):
            print(f"  {i}. {activity}")
            
        return activities
        
    def get_package_path(self, package_name):
        """Get the APK path for a package"""
        print(f"\nGetting path for package: {package_name}")
        output = self.run_adb_command(f"adb shell pm path {package_name}")
        
        if not output:
            print(f"Failed to get path for {package_name}")
            return None
            
        # Extract base.apk path
        for line in output.split('\n'):
            if 'base.apk' in line:
                path = line.replace('package:', '').strip()
                print(f"Found APK path: {path}")
                return path
                
        # If no base.apk, use the first path
        first_line = output.split('\n')[0]
        if first_line.startswith('package:'):
            path = first_line.replace('package:', '').strip()
            print(f"Found APK path: {path}")
            return path
            
        return None
        
    def pull_apk(self, package_name, apk_path):
        """Pull APK from device"""
        output_file = self.output_dir / f"{package_name}.apk"
        print(f"\nPulling APK to: {output_file}")
        
        cmd = f'adb pull "{apk_path}" "{output_file}"'
        result = self.run_adb_command(cmd)
        
        if result and output_file.exists():
            size_mb = output_file.stat().st_size / (1024 * 1024)
            print(f"✓ Successfully pulled {package_name}.apk ({size_mb:.1f} MB)")
            return True
        else:
            print(f"✗ Failed to pull {package_name}.apk")
            return False
            
    def extract_single_app(self, package_name):
        """Extract a single app's APK"""
        print(f"\n{'='*60}")
        print(f"Extracting: {package_name}")
        print(f"{'='*60}")
        
        # Get package path
        apk_path = self.get_package_path(package_name)
        if not apk_path:
            return False
            
        # Pull APK
        return self.pull_apk(package_name, apk_path)
        
    def extract_all_running_apps(self):
        """Extract APKs for all running apps"""
        activities = self.get_running_activities()
        
        if not activities:
            print("No activities to extract")
            return
            
        # Remove duplicates
        packages = list(set(activities))
        
        print(f"\n{'#'*60}")
        print(f"Extracting {len(packages)} unique packages")
        print(f"Output directory: {self.output_dir}")
        print(f"{'#'*60}")
        
        results = []
        for package in packages:
            success = self.extract_single_app(package)
            results.append({
                'package': package,
                'success': success,
                'timestamp': datetime.now().isoformat()
            })
            
        # Print summary
        print(f"\n{'#'*60}")
        print("EXTRACTION SUMMARY")
        print(f"{'#'*60}")
        
        successful = sum(1 for r in results if r['success'])
        failed = len(results) - successful
        
        print(f"\nTotal packages: {len(results)}")
        print(f"✓ Successful: {successful}")
        print(f"✗ Failed: {failed}")
        
        print("\nDetailed results:")
        for result in results:
            status = "✓" if result['success'] else "✗"
            print(f"  {status} {result['package']}")
            
    def interactive_extract(self):
        """Interactive mode to select which apps to extract"""
        activities = self.get_running_activities()
        
        if not activities:
            print("No activities to extract")
            return
            
        packages = list(set(activities))
        
        print("\nSelect packages to extract (comma-separated numbers or 'all'):")
        choice = input("Choice: ").strip()
        
        if choice.lower() == 'all':
            selected = packages
        else:
            try:
                indices = [int(i.strip()) - 1 for i in choice.split(',')]
                selected = [packages[i] for i in indices if 0 <= i < len(packages)]
            except (ValueError, IndexError):
                print("Invalid selection")
                return
                
        print(f"\nExtracting {len(selected)} packages...")
        for package in selected:
            self.extract_single_app(package)

def main():
    parser = argparse.ArgumentParser(
        description="Extract APKs from Android device"
    )
    parser.add_argument(
        '--output-dir',
        type=str,
        default='/Users/tracy/workspace/projects/ConfioT/apks',
        help='Output directory for APKs (default: ./apks)'
    )
    parser.add_argument(
        '--package',
        type=str,
        help='Extract specific package (e.g., com.example.app)'
    )
    parser.add_argument(
        '--all',
        action='store_true',
        help='Extract all running apps automatically'
    )
    parser.add_argument(
        '--interactive',
        action='store_true',
        help='Interactive mode to select apps'
    )
    
    args = parser.parse_args()
    
    extractor = APKExtractor(args.output_dir)
    
    # Check ADB connection
    devices = subprocess.run(['adb', '-s', '17291JECB10652', 'devices'], capture_output=True, text=True).stdout
    if '17291JECB10652' not in devices or 'device' not in devices:
        print("Error: Device 17291JECB10652 not connected")
        print("Run 'adb devices' to check connection")
        return
    
    if args.package:
        # Extract specific package
        extractor.extract_single_app(args.package)
    elif args.all:
        # Extract all running apps
        extractor.extract_all_running_apps()
    elif args.interactive:
        # Interactive selection
        extractor.interactive_extract()
    else:
        # Default: show running apps
        activities = extractor.get_running_activities()
        if activities:
            print("\nTo extract APKs, use one of these options:")
            print("  --package PACKAGE_NAME   Extract specific package")
            print("  --all                    Extract all running apps")
            print("  --interactive            Choose which apps to extract")

if __name__ == "__main__":
    main()