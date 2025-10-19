import joblib
import pandas as pd

# Load the trained model
model = joblib.load("model/computer_price_model_xgb.pkl")

# Columns expected by the model (training dataset)
column_names = [
    'device_type', 'brand', 'cpu_brand', 'cpu_model','gpu_brand', 'gpu_model', 'release_year',
    'cpu_cores', 'cpu_threads', 'cpu_base_ghz', 'cpu_boost_ghz',
     'vram_gb', 'ram_gb', 'storage_gb', 'weight_kg'
]

# Input data for Dell laptop (only selected columns)
input_data = {
    'device_type': ['Laptop'],
    'brand': ['Dell'],
    'cpu_brand': ['Intel'],
    'cpu_model': ['Intel i5-10XXX'],
    'gpu_brand': ['NVIDIA'],
    'gpu_model': ['RTX 40 50'],
    'release_year': [2020],
    'cpu_cores': [6],
    'cpu_threads': [12],
    'cpu_base_ghz': [2.2],
    'cpu_boost_ghz': [3.2],
    'vram_gb': [8],
    'ram_gb': [16],
    'storage_gb': [1024],
    'weight_kg': [1.57]
}

# Convert to DataFrame with only selected columns
input_df = pd.DataFrame(input_data, columns=column_names)

# Predict
predicted_price = model.predict(input_df)

print(f"Predicted Price: ${predicted_price[0]:.2f}")
