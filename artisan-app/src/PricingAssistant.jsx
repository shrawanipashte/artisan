import { useState } from "react";

function PricingAssistant({
  category,
  materials,
  productionTime,
  onPriceChange,
}) {
  const [recommendedPrice, setRecommendedPrice] = useState(null);
  const [sellingPrice, setSellingPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Temporary value until AI extraction provides the actual material cost
  const materialCost = 300;

  // Convert "2 days" into 2
  const productionDays = parseFloat(productionTime) || 2;

  const getSmartPrice = async () => {
    setLoading(true);
    setError("");

    try {
      // Automatically use the laptop's IP address.
      // This works both on the laptop and on your phone.
      const backendUrl = `http://${window.location.hostname}:5000/predict`;

      console.log("Sending pricing request to:", backendUrl);

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          material: materials,
          material_cost: materialCost,
          production_days: productionDays,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Flask error:", errorText);
        throw new Error("Pricing model failed");
      }

      const data = await response.json();

      console.log("Pricing result:", data);

      const price = Number(data.recommended_price);

      setRecommendedPrice(price);
      setSellingPrice(price);

      // Send recommended price to App.jsx
      onPriceChange(price);
    } catch (err) {
      console.error("Pricing error:", err);

      setError(
        "Could not connect to Smart Pricing. Please make sure the pricing model is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;

    setSellingPrice(value);

    // Send edited price to App.jsx
    if (value !== "") {
      onPriceChange(Number(value));
    } else {
      onPriceChange(null);
    }
  };

  return (
    <div className="pricing-assistant">
      <h2>💰 Smart Pricing</h2>

      <p>
        We'll check your product details against marketplace trends
        and suggest a fair price.
      </p>

      <button onClick={getSmartPrice} disabled={loading}>
        {loading ? "⏳ Calculating..." : "✨ Get Smart Price"}
      </button>

      {error && <p className="pricing-error">{error}</p>}

      {recommendedPrice !== null && (
        <div className="price-result">
          <h3>Recommended Price</h3>

          <div className="recommended-price">
            ₹{Number(recommendedPrice).toLocaleString("en-IN")}
          </div>

          <p>
            Based on marketplace data and your product details.
          </p>

          <label>Your Selling Price (₹)</label>

          <input
            type="number"
            min="1"
            value={sellingPrice}
            onChange={handlePriceChange}
          />

          <p>
            You can change the recommended price before publishing.
          </p>
        </div>
      )}
    </div>
  );
}

export default PricingAssistant;