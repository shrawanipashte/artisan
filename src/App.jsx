import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  // Product image
  const [image, setImage] = useState(null);
  const [enhanced, setEnhanced] = useState(false);

  // Hindi description
  const [description, setDescription] = useState("");

  // Editable AI listing
  const [productName, setProductName] = useState(
    "Handmade Cotton Bag"
  );

  const [listingDescription, setListingDescription] = useState(
    "A beautiful handmade cotton bag crafted using natural dyes."
  );

  const [category, setCategory] = useState("Bags");

  const [materials, setMaterials] = useState(
    "Cotton, Natural Dyes"
  );

  const [productionTime, setProductionTime] = useState(
    "2 days"
  );

  // Published products
  const [products, setProducts] = useState([]);

  // ---------------- HOME ----------------
  if (page === "home") {
    return (
      <div className="page">
        <h1>HunarSetu 🪔</h1>

        <p>Welcome, Artisan 👋</p>

        <p>
          Ready to showcase your beautiful craft?
        </p>

        <button onClick={() => setPage("add-product")}>
          + Add New Product
        </button>

        {products.length > 0 && (
          <div>
            <h2>Your Products</h2>

            {products.map((product) => (
              <div
                className="product-card"
                key={product.id}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-preview"
                  />
                )}

                <h2>{product.name}</h2>

                <p>{product.description}</p>

                <p>
                  <strong>Category:</strong>{" "}
                  {product.category}
                </p>

                <p>
                  <strong>Materials:</strong>{" "}
                  {product.materials}
                </p>

                <p>
                  <strong>Production Time:</strong>{" "}
                  {product.productionTime}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="published">
                    Published ✓
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---------------- ADD PRODUCT ----------------
  if (page === "add-product") {
    return (
      <div className="page">
        <button onClick={() => setPage("home")}>
          ← Back
        </button>

        <h1>Add New Product</h1>

        <p>
          Let's create your product listing.
        </p>

        <button
          onClick={() => setPage("image-studio")}
        >
          📸 Add Product Photo
        </button>
      </div>
    );
  }

  // ---------------- IMAGE STUDIO ----------------
  if (page === "image-studio") {
    function handleImage(event) {
      const file = event.target.files[0];

      if (file) {
        setImage(URL.createObjectURL(file));
        setEnhanced(false);
      }
    }

    return (
      <div className="page">
        <button
          onClick={() => setPage("add-product")}
        >
          ← Back
        </button>

        <h1>AI Image Studio ✨</h1>

        <p>
          Turn your handmade creation into a
          beautiful marketplace-ready photo.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {image && (
          <div>
            <h3>Your Product Photo</h3>

            <img
              src={image}
              alt="Product"
              className="product-preview"
            />

            <button
              onClick={() => setEnhanced(true)}
            >
              ✨ Enhance Photo
            </button>

            {enhanced && (
              <div className="success-box">
                <h2>✓ Photo Enhanced</h2>

                <p>✓ Background optimized</p>
                <p>✓ Lighting improved</p>
                <p>✓ E-commerce format applied</p>

                <button
                  onClick={() =>
                    setPage("description")
                  }
                >
                  Use This Photo
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ---------------- HINDI DESCRIPTION ----------------
  if (page === "description") {
    return (
      <div className="page">
        <button
          onClick={() => setPage("image-studio")}
        >
          ← Back
        </button>

        <h1>Tell Us About Your Product 🎤</h1>

        <p>
          Speak in Hindi or type below.
        </p>

        <textarea
          rows="7"
          placeholder="यहाँ अपने उत्पाद के बारे में बताएं..."
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />

        <button
          onClick={() =>
            setDescription(
              "यह हाथ से बनी हुई कॉटन बैग है। इसे बनाने में दो दिन लगते हैं और प्राकृतिक रंग इस्तेमाल किए गए हैं।"
            )
          }
        >
          🎤 Speak in Hindi
        </button>

        <button
          onClick={() => setPage("review")}
        >
          ✨ Generate Listing
        </button>
      </div>
    );
  }

  // ---------------- AI REVIEW ----------------
  if (page === "review") {
    return (
      <div className="page">
        <button
          onClick={() => setPage("description")}
        >
          ← Back
        </button>

        <h1>✨ AI Generated Listing</h1>

        <p>
          Review and edit your listing before
          publishing.
        </p>

        <label>Product Name</label>

        <input
          value={productName}
          onChange={(event) =>
            setProductName(event.target.value)
          }
        />

        <label>Description</label>

        <textarea
          rows="6"
          value={listingDescription}
          onChange={(event) =>
            setListingDescription(
              event.target.value
            )
          }
        />

        <label>Category</label>

        <input
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        />

        <label>Materials</label>

        <input
          value={materials}
          onChange={(event) =>
            setMaterials(event.target.value)
          }
        />

        <label>Production Time</label>

        <input
          value={productionTime}
          onChange={(event) =>
            setProductionTime(
              event.target.value
            )
          }
        />

        <button
          onClick={() => {
            const newProduct = {
              id: Date.now(),
              name: productName,
              description: listingDescription,
              category: category,
              materials: materials,
              productionTime: productionTime,
              image: image,
            };

            setProducts([
              ...products,
              newProduct,
            ]);

            setPage("home");
          }}
        >
          🚀 Approve & Publish
        </button>
      </div>
    );
  }

  return null;
}

export default App;