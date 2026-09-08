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

    # Information coming from the Artisan UI
    category = data["category"]
    material = data["material"]
    material_cost = float(data["material_cost"])
    production_days = float(data["production_days"])

    # Automatically use today's date
    today = datetime.now()
    month = today.month
    day_of_year = today.timetuple().tm_yday

    # The model was trained on these EXACT 6 features
    input_data = [[
        category,
        material,
        material_cost,
        production_days,
        month,
        day_of_year
    ]]

    prediction = model.predict(input_data)

    recommended_price = round(prediction[0])

    return jsonify({
        "recommended_price": recommended_price,
        "month": month,
        "day_of_year": day_of_year
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)