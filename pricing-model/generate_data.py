import csv
import random
from datetime import date, timedelta

random.seed(42)

categories = {
    "Bag": {
        "materials": ["Cotton", "Jute", "Canvas"],
        "cost": (150, 500),
        "days": (1, 5),
        "base_price": (400, 1200),
    },
    "Pottery": {
        "materials": ["Clay", "Terracotta"],
        "cost": (80, 400),
        "days": (1, 6),
        "base_price": (250, 1000),
    },
    "Textile": {
        "materials": ["Cotton", "Silk", "Wool"],
        "cost": (200, 1000),
        "days": (2, 10),
        "base_price": (600, 2500),
    },
    "Jewelry": {
        "materials": ["Beads", "Brass", "Silver"],
        "cost": (150, 1200),
        "days": (1, 7),
        "base_price": (500, 3000),
    },
    "Wooden Craft": {
        "materials": ["Bamboo", "Teak", "Wood"],
        "cost": (200, 900),
        "days": (2, 8),
        "base_price": (600, 2200),
    },
    "Basket": {
        "materials": ["Bamboo", "Cane", "Jute"],
        "cost": (100, 500),
        "days": (1, 5),
        "base_price": (350, 1300),
    },
    "Home Decor": {
        "materials": ["Clay", "Wood", "Cotton"],
        "cost": (150, 800),
        "days": (1, 7),
        "base_price": (500, 2000),
    },
}

rows = []

# 20 different products, each observed on 5 different dates = 100 records
product_number = 1

for category, info in categories.items():

    # 3 products per category
    for _ in range(3):
        product_id = f"P{product_number:03d}"
        product_number += 1

        material = random.choice(info["materials"])
        material_cost = random.randint(*info["cost"])
        production_days = random.randint(*info["days"])
        base_price = random.randint(*info["base_price"])

        # Each product gets 5 historical market observations
        for month in range(1, 6):

            observation_date = date(2026, month, 10)

            # Simulate market movement over time
            trend = 1 + ((month - 1) * random.uniform(0.015, 0.04))

            # Small random market fluctuation
            fluctuation = random.uniform(0.90, 1.10)

            # Production/material costs influence price
            cost_factor = 1 + (material_cost / 3000)

            market_price = (
                base_price
                * trend
                * fluctuation
                * cost_factor
            )

            # More time-consuming products tend to cost more
            market_price += production_days * random.uniform(25, 70)

            market_price = round(market_price / 10) * 10

            rows.append({
                "product_id": product_id,
                "category": category,
                "material": material,
                "material_cost": material_cost,
                "production_days": production_days,
                "date": observation_date.isoformat(),
                "market_price": int(market_price),
            })


with open("products.csv", "w", newline="", encoding="utf-8") as file:

    fieldnames = [
        "product_id",
        "category",
        "material",
        "material_cost",
        "production_days",
        "date",
        "market_price",
    ]

    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(rows)

print(f"Created products.csv with {len(rows)} records.")