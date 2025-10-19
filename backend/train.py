import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
import joblib
from xgboost import XGBRegressor

# Load dataset
data = pd.read_csv("model/computer_prices_all.csv")

# Handpick features to use
selected_features = [
    'device_type', 'brand', 'model', 'release_year', 'cpu_brand', 'cpu_model', 'cpu_cores', 'cpu_threads', 'cpu_base_ghz',
    'cpu_boost_ghz', 'gpu_brand', 'gpu_model', 'vram_gb', 'ram_gb', 'storage_gb', 'weight_kg'
]

# Features and target
X = data[selected_features]  # only selected columns
y = data['price']

# Identify categorical and numerical columns from selected features
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numerical_cols = X.select_dtypes(include=['int64','float64']).columns.tolist()

# Train-test split (9:1)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.1, random_state=42
)

# Preprocessing: scale numerical, encode categorical
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ]
)

# XGBoost pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', XGBRegressor(
        n_estimators=750,
        learning_rate=0.05,
        max_depth=6,
        subsample=0.8,
        colsample_bytree=0.8,
        tree_method='hist',
        device='cuda',
        random_state=42
    ))
])


# Train the model
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)
print(f"Test RMSE: {rmse:.2f}")
print(f"Test R^2: {r2:.2f}")

# Save model
joblib.dump(model, "model/computer_price_model_xgb.pkl")
print("Model saved as computer_price_model_xgb.pkl")