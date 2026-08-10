import csv
import json
import os

base_dir = r"c:\Users\zonoz\Desktop\夏休み学習計画\Notion版・夏休み学習計画パッケージ"
output_dir = r"c:\Users\zonoz\Desktop\夏休み学習計画\app\src\data"

os.makedirs(output_dir, exist_ok=True)

files = [
    ("01_日別プラン.csv", "daily_plan.json"),
    ("02_週間目標.csv", "weekly_goals.json"),
    ("03_科目ロードマップ.csv", "subject_roadmap.json"),
    ("04_TOEIC対策.csv", "toeic_plan.json")
]

for csv_file, json_file in files:
    csv_path = os.path.join(base_dir, csv_file)
    json_path = os.path.join(output_dir, json_file)
    
    with open(csv_path, encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        data = list(reader)
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Conversion complete.")
