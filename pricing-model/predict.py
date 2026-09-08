import pandas as pd
import joblib
from datetime import date

# Load the trained ML model
model = joblib.load("pricing_model.pkl")

# Example of a NEW artisan product
new_product = pd.DataFrame([{
    "category": "Bag",
    "material": "Cotton",
    "material_cost": 300,
    "production_days": 2,
    "month": date.today().month,
    "day_of_year": date.today().timetuple().tm_yday
}])

# Ask the model for a price
predicted_price = model.predict(new_product)[0]

print("================================")
print("       DYNAMIC PRICE RESULT")
print("================================")
print(f"Recommended Price: ₹{round(predicted_price)}")
print("================================")