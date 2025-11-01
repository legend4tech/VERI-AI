#!/usr/bin/env python3
"""
Test script for Vera AI API deployment
Run this to test your deployed API endpoints
"""

import requests
import json
import sys

def test_api(base_url):
    """Test all API endpoints"""
    print(f"🧪 Testing Vera AI API at: {base_url}")
    print("=" * 50)
    
    # Test 1: Health check
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health", timeout=10)
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")
    
    print()
    
    # Test 2: API info
    print("2. Testing API info endpoint...")
    try:
        response = requests.get(f"{base_url}/api/info", timeout=10)
        if response.status_code == 200:
            print("✅ API info passed")
            info = response.json()
            print(f"   API Name: {info.get('name')}")
            print(f"   Version: {info.get('version')}")
        else:
            print(f"❌ API info failed: {response.status_code}")
    except Exception as e:
        print(f"❌ API info error: {e}")
    
    print()
    
    # Test 3: Asset analysis
    print("3. Testing asset analysis endpoint...")
    test_token = "NGA-LAG-001"
    try:
        print(f"   Analyzing token: {test_token}")
        response = requests.get(f"{base_url}/analyze/{test_token}", timeout=30)
        
        if response.status_code == 200:
            print("✅ Asset analysis passed")
            data = response.json()
            print(f"   Status: {data.get('status')}")
            
            if 'analysis_report' in data:
                report = data['analysis_report']
                print(f"   Risk Score: {report.get('risk_score', 'N/A')}")
                risk_category = report.get('risk_assessment', {}).get('risk_category', 'N/A')
                print(f"   Risk Category: {risk_category}")
                
        elif response.status_code == 404:
            print("⚠️  Asset not found (expected for some test tokens)")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Asset analysis failed: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Asset analysis error: {e}")
    
    print()
    print("🏁 Testing complete!")
    print(f"📖 View full API docs at: {base_url}/docs")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        api_url = sys.argv[1].rstrip('/')
    else:
        # Default to local development
        api_url = "http://localhost:8000"
        print("No URL provided, testing local development server")
        print("Usage: python test_api_deployment.py https://your-app.onrender.com")
        print()
    
    test_api(api_url)