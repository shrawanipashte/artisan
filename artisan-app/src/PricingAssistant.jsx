import { useState } from "react";

function PricingAssistant() {
  const [materialCost, setMaterialCost] = useState("");
  const [days, setDays] = useState("");
  const [marketPrice, setMarketPrice] = useState("");

  const calculatePrice = () => {
    const material = Number(materialCost);
    const productionDays = Number(days);
    const market = Number(marketPrice);

    if (!material || !productionDays || !market) {
      return null;
    }

    const labourCost = productionDays * 200;
    const basePrice = material + labourCost;

    const recommendedPrice =
      Math.round(
        (basePrice * 0.4 + market * 0.6) / 10
      ) * 10;

    return Math.max(recommendedPrice, basePrice);
  };

  const recommendedPrice = calculatePrice();

  return (
    <div className="pricing-card">
      <h2>💰 Smart Pricing Assistant</h2>

      <p>
        Enter a few details and we'll suggest a
        competitive selling price.
      </p>

      <label>Material Cost (₹)</label>

      <input
        type="number"
        placeholder="Example: 350"
        value={materialCost}
        onChange={(e) =>
          setMaterialCost(e.target.value)
        }
      />

      <label>Time Taken (days)</label>

      <input
        type="number"
        placeholder="Example: 2"
        value={days}
        onChange={(e) =>
          setDays(e.target.value)
        }
      />

      <label>Current Market Price (₹)</label>

      <input
        type="number"
        placeholder="Example: 800"
        value={marketPrice}
        onChange={(e) =>
          setMarketPrice(e.target.value)
        }
      />

      {recommendedPrice && (
        <div className="price-result">
          <p>Recommended Selling Price</p>

          <div className="recommended-price">
            ₹{recommendedPrice}
          </div>

          <small>
            Based on material cost, production time
            and current market price.
          </small>

          <button>
            Use ₹{recommendedPrice}
          </button>
        </div>
      )}
    </div>
  );
}

export default PricingAssistant;