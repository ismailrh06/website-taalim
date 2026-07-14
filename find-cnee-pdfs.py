#!/usr/bin/env python3
import requests
import sys

# Test different patterns for CNEE exam PDFs
patterns = [
    # Pattern 1: RS + last 2 digits of year + number (e.g., RS191, RS201, etc.)
    lambda year, code: f"https://cnee.men.gov.ma/NATIONAL/{year}/RS{str(year)[-2:]}{code}.pdf",
    # Pattern 2: Just RS + full year + number
    lambda year, code: f"https://cnee.men.gov.ma/NATIONAL/{year}/RS{year}{code}.pdf",
    # Pattern 3: Subject codes
    lambda year, code: f"https://cnee.men.gov.ma/NATIONAL/{year}/EXS{year}{code}.pdf",
]

found_urls = []

print("🔍 Searching for CNEE exam PDFs...\n")

for year in range(2019, 2025):
    for code in range(1, 15):
        for pattern in patterns:
            url = pattern(year, code)
            try:
                response = requests.head(url, timeout=3, allow_redirects=False)
                if response.status_code == 200:
                    print(f"✅ {url}")
                    found_urls.append(url)
            except:
                pass

if found_urls:
    print(f"\n📊 Found {len(found_urls)} valid PDFs:")
    for url in found_urls[:10]:  # Show first 10
        print(f"  - {url}")
else:
    print("❌ No valid PDFs found with these patterns")
    print("\nTrying to list directory structure...")
    # Try to get directory listing
    try:
        response = requests.get("https://cnee.men.gov.ma/NATIONAL/2019/", timeout=5)
        print(f"Status: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")
