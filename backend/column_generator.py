import pandas as pd
import os

# Input file path
input_file = "model/computer_prices_all.csv"

# Columns you want to extract
columns_to_copy = ["device_type", "brand", "cpu_brand", "cpu_model", "gpu_brand", "gpu_model"]

# Output folder for text files
output_folder = "../frontend/public/options"
os.makedirs(output_folder, exist_ok=True)

# Read only those columns
df = pd.read_csv(input_file, usecols=columns_to_copy)

# Create one text file per column
for col in df.columns:
    unique_vals = sorted(df[col].dropna().unique())  # remove duplicates, sort, drop NaNs
    output_path = os.path.join(output_folder, f"{col}.txt")
    
    with open(output_path, "w", encoding="utf-8") as f:
        for val in unique_vals:
            f.write(str(val) + "\n")
    
    print(f"{col}.txt created with {len(unique_vals)} unique values.")

print("\nAll text files created successfully!")
