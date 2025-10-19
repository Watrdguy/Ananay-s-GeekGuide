from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__, static_folder='dist')
CORS(app, origins=["http://localhost:5000", "http://127.0.0.1:5000",  "https://your-frontend.onrender.com"])

model = joblib.load("model/computer_price_model_xgb.pkl")

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No input data provided"}), 400
        
        numeric_fields = ["release_year", "ram_gb", "vram_gb", "cpu_cores", "cpu_threads", "storage_gb", "weight_kg", "cpu_base_ghz", "cpu_boost_ghz"]
        
        print(f"Received data: {data}")
        for field in numeric_fields:
            if field in data:
                try:
                    data[field] = float(data[field])
                except ValueError:
                    print(f"Invalid value for field {field}: {data[field]}")
                    return jsonify({"error": f"Field {field} must be a number"}), 430

        input_data = {k: [v] for k, v in data.items()}
        
        df = pd.DataFrame(input_data)
        
        prediction = model.predict(df)

        print(f"prediction: {prediction}")
        return jsonify({"predicted_price": float(prediction[0])})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
