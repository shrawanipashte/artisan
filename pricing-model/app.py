import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from datetime import datetime

app = Flask(__name__)

CORS(app)

# Load the trained ML model
model = joblib.load("pricing_model.pkl")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Get values sent by the Artisan UI
    category = data["category"]
    material = data["material"]
    material_cost = float(data["material_cost"])
    production_days = float(data["production_days"])

    # Automatically calculate today's date information
    today = datetime.now()

    month = today.month
    day_of_year = today.timetuple().tm_yday

    # The ML model was trained using these EXACT 6 features
    input_data = pd.DataFrame([{
    "category": category,
    "material": material,
    "material_cost": material_cost,
    "production_days": production_days,
    "month": month,
    "day_of_year": day_of_year
}])

    print("Input sent to ML model:", input_data)

    prediction = model.predict(input_data)

    recommended_price = round(prediction[0])

    return jsonify({
        "recommended_price": recommended_price
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)