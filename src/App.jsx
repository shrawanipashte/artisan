import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Handmade Cotton Bag",
    price: 799,
    category: "Bags",
    artisan: "Meena Sharma",
    location: "Maharashtra",
    image: "👜",
    description:
      "A beautiful handmade cotton bag made using natural dyes. Carefully crafted by an Indian artisan.",
  },
  {
    id: 2,
    name: "Traditional Handwoven Saree",
    price: 1299,
    category: "Clothing",
    artisan: "Sunita Devi",
    location: "West Bengal",
    image: "🥻",
    description:
      "A traditional handwoven saree made with care by skilled artisans.",
  },
  {
    id: 3,
    name: "Warli Art Painting",
    price: 999,
    category: "Art",
    artisan: "Ramesh Patil",
    location: "Maharashtra",
    image: "🎨",
    description:
      "Traditional Warli-inspired artwork created by hand.",
  },
  {
    id: 4,
    name: "Handmade Clay Pot",
    price: 599,
    category: "Home Decor",
    artisan: "Rajesh Kumar",
    location: "Rajasthan",
    image: "🏺",
    description:
      "A handmade clay pot created using traditional pottery techniques.",
  },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
  });

  const [orders, setOrders] = useState([]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          product: product,
          quantity: 1,
        },
      ]);
    }

    alert("Product added to cart!");
  };

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.name || !loginData.email) {
      alert("Please enter your name and email.");
      return;
    }

    setCustomer({
      ...customer,
      name: loginData.name,
    });

    setIsLoggedIn(true);
    setShowLogin(false);

    alert("Welcome to HunarSetu!");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setShowProfile(false);
    setShowOrders(false);
    setShowCart(false);
    setShowCheckout(false);
    setOrderPlaced(false);
    setShowLogin(true);
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.pincode
    ) {
      alert("Please fill all delivery details.");
      return;
    }

    const newOrder = {
      id: "HS" + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cart.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0
      ),
      status: "Order Placed",
    };

    setOrders([newOrder, ...orders]);
    setOrderPlaced(true);
    setShowCheckout(false);
  };

  const goHome = () => {
    setShowCart(false);
    setShowCheckout(false);
    setOrderPlaced(false);
    setShowProfile(false);
    setShowOrders(false);

    document.getElementById("home")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const goCategories = () => {
    setShowCart(false);
    setShowCheckout(false);
    setOrderPlaced(false);
    setShowProfile(false);
    setShowOrders(false);

    document.getElementById("categories")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">

      {/* LOGIN PAGE */}
      {!isLoggedIn && showLogin && (
        <section className="login-page">
          <div className="login-card">

            <div className="login-logo">HunarSetu</div>

            <h1>Welcome to HunarSetu</h1>

            <p>
              Discover authentic handmade products
              from Indian artisans.
            </p>

            <form onSubmit={handleLogin}>

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={loginData.name}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    name: e.target.value,
                  })
                }
                required
              />

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                required
              />

              <button
                type="submit"
                className="login-button"
              >
                Login / Continue
              </button>

            </form>

          </div>
        </section>
      )}

      {/* MAIN WEBSITE */}
      {isLoggedIn && (
        <>

          {/* NAVBAR */}
          <nav className="navbar">

            <div
              className="logo"
              onClick={goHome}
            >
              HunarSetu
            </div>

            <div className="nav-links">

              <button onClick={goHome}>
                Home
              </button>

              <button onClick={goCategories}>
                Categories
              </button>

              <button
                onClick={() => {
                  setShowOrders(true);
                  setShowCart(false);
                  setShowCheckout(false);
                  setShowProfile(false);
                  setOrderPlaced(false);
                }}
              >
                📦 My Orders
              </button>

              <button
                onClick={() => {
                  setShowProfile(true);
                  setShowOrders(false);
                  setShowCart(false);
                  setShowCheckout(false);
                  setOrderPlaced(false);
                }}
              >
                👤 {customer.name}
              </button>

              <button
                className="cart"
                onClick={() => {
                  setShowCart(true);
                  setShowOrders(false);
                  setShowProfile(false);
                  setShowCheckout(false);
                  setOrderPlaced(false);
                }}
              >
                🛒 Cart (
                {cart.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
                )
              </button>

            </div>

          </nav>

          {/* HOME */}
          {!showCart &&
            !showCheckout &&
            !orderPlaced &&
            !showProfile &&
            !showOrders && (
              <>

                <section
                  className="hero"
                  id="home"
                >
                  <h1>
                    Handmade. Authentic. Indian.
                  </h1>

                  <p>
                    Discover beautiful products made
                    by talented Indian artisans.
                  </p>

                  <div className="search-box">

                    <input
                      type="text"
                      placeholder="🔍 Search handmade products..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                    />

                    <button>
                      Search
                    </button>

                  </div>
                </section>

                {/* CATEGORIES */}
                <section
                  className="categories"
                  id="categories"
                >

                  <h2>
                    Explore Categories
                  </h2>

                  <div className="category-list">

                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchTerm("");
                      }}
                    >
                      ✨ All
                    </button>

                    <button
                      onClick={() =>
                        setSelectedCategory("Bags")
                      }
                    >
                      👜 Bags
                    </button>

                    <button
                      onClick={() =>
                        setSelectedCategory("Clothing")
                      }
                    >
                      🥻 Clothing
                    </button>

                    <button
                      onClick={() =>
                        setSelectedCategory("Art")
                      }
                    >
                      🎨 Art
                    </button>

                    <button
                      onClick={() =>
                        setSelectedCategory("Home Decor")
                      }
                    >
                      🏺 Home Decor
                    </button>

                  </div>

                </section>

                {/* PRODUCTS */}
                <section className="products-section">

                  <h2>
                    {selectedCategory === "All"
                      ? "Featured Products"
                      : selectedCategory}
                  </h2>

                  {filteredProducts.length === 0 ? (
                    <div className="empty-products">
                      <h3>No products found</h3>
                      <p>
                        Try another search or category.
                      </p>
                    </div>
                  ) : (
                    <div className="products-grid">

                      {filteredProducts.map(
                        (product) => (
                          <div
                            className="product-card"
                            key={product.id}
                          >

                            <div className="product-image">
                              {product.image}
                            </div>

                            <div className="product-info">

                              <h3>
                                {product.name}
                              </h3>

                              <p className="artisan">
                                Made by{" "}
                                {product.artisan}
                              </p>

                              <p className="location">
                                📍 {product.location}
                              </p>

                              <p className="price">
                                ₹{product.price}
                              </p>

                              <button
                                className="view-button"
                                onClick={() =>
                                  setSelectedProduct(
                                    product
                                  )
                                }
                              >
                                View Product
                              </button>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </section>

                {/* RECOMMENDATIONS */}
                <section className="recommendations">

                  <h2>
                    Recommended for You
                  </h2>

                  <p className="recommendation-subtitle">
                    Handpicked products you may like
                  </p>

                  <div className="recommendation-grid">

                    {products
                      .slice(0, 3)
                      .map((product) => (
                        <div
                          className="recommendation-card"
                          key={product.id}
                        >

                          <div>
                            {product.image}
                          </div>

                          <h3>
                            {product.name}
                          </h3>

                          <p>
                            ₹{product.price}
                          </p>

                          <button
                            onClick={() =>
                              setSelectedProduct(
                                product
                              )
                            }
                          >
                            View Product
                          </button>

                        </div>
                      ))}

                  </div>

                </section>

              </>
            )}

          {/* PRODUCT DETAILS */}
          {selectedProduct && (
            <div className="modal">

              <div className="modal-content">

                <button
                  className="close"
                  onClick={() =>
                    setSelectedProduct(null)
                  }
                >
                  ✕
                </button>

                <div className="big-image">
                  {selectedProduct.image}
                </div>

                <h2>
                  {selectedProduct.name}
                </h2>

                <h3 className="modal-price">
                  ₹{selectedProduct.price}
                </h3>

                <p>
                  {selectedProduct.description}
                </p>

                <p>
                  <strong>Artisan:</strong>{" "}
                  {selectedProduct.artisan}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {selectedProduct.location}
                </p>

                <button
                  className="cart-button"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  🛒 Add to Cart
                </button>

              </div>

            </div>
          )}

          {/* CART */}
          {showCart && (
            <section className="cart-page">

              <button
                className="back-button"
                onClick={() =>
                  setShowCart(false)
                }
              >
                ← Continue Shopping
              </button>

              <h2>🛒 Your Cart</h2>

              {cart.length === 0 ? (
                <div className="empty-cart">

                  <h3>
                    Your cart is empty
                  </h3>

                  <p>
                    Add some beautiful handmade
                    products!
                  </p>

                </div>
              ) : (
                <div className="cart-container">

                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.product.id}
                    >

                      <div className="cart-item-image">
                        {item.product.image}
                      </div>

                      <div className="cart-item-info">

                        <h3>
                          {item.product.name}
                        </h3>

                        <p>
                          Made by{" "}
                          {item.product.artisan}
                        </p>

                        <strong>
                          ₹{item.product.price}
                        </strong>

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.product.id
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.product.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        <p className="item-total">
                          Item Total: ₹
                          {item.product.price *
                            item.quantity}
                        </p>

                      </div>

                    </div>
                  ))}

                  <div className="cart-total">

                    <h2>
                      Total: ₹
                      {cart.reduce(
                        (total, item) =>
                          total +
                          item.product.price *
                            item.quantity,
                        0
                      )}
                    </h2>

                    <button
                      className="checkout-button"
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                    >
                      Proceed to Checkout
                    </button>

                  </div>

                </div>
              )}

            </section>
          )}

          {/* CHECKOUT */}
          {showCheckout &&
            !orderPlaced && (
              <section className="checkout-page">

                <button
                  className="back-button"
                  onClick={() => {
                    setShowCheckout(false);
                    setShowCart(true);
                  }}
                >
                  ← Back to Cart
                </button>

                <div className="checkout-container">

                  <div className="checkout-form">

                    <h2>
                      Checkout
                    </h2>

                    <p>
                      Enter your delivery details
                    </p>

                    <form onSubmit={placeOrder}>

                      <label>
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            name: e.target.value,
                          })
                        }
                        required
                      />

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            phone: e.target.value,
                          })
                        }
                        required
                      />

                      <label>
                        Delivery Address
                      </label>

                      <textarea
                        placeholder="House no., street, area"
                        value={customer.address}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            address: e.target.value,
                          })
                        }
                        required
                      />

                      <label>
                        City
                      </label>

                      <input
                        type="text"
                        placeholder="Enter city"
                        value={customer.city}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            city: e.target.value,
                          })
                        }
                        required
                      />

                      <label>
                        PIN Code
                      </label>

                      <input
                        type="text"
                        placeholder="Enter PIN code"
                        value={customer.pincode}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            pincode: e.target.value,
                          })
                        }
                        required
                      />

                      <label>
                        Payment Method
                      </label>

                      <div className="payment-option">

                        <input
                          type="radio"
                          checked
                          readOnly
                        />

                        <span>
                          Cash on Delivery
                        </span>

                      </div>

                      <button
                        type="submit"
                        className="place-order-button"
                      >
                        Place Order
                      </button>

                    </form>

                  </div>

                  <div className="checkout-summary">

                    <h2>
                      Order Summary
                    </h2>

                    {cart.map((item) => (
                      <div
                        className="summary-item"
                        key={item.product.id}
                      >

                        <span>
                          {item.product.name} ×{" "}
                          {item.quantity}
                        </span>

                        <strong>
                          ₹
                          {item.product.price *
                            item.quantity}
                        </strong>

                      </div>
                    ))}

                    <hr />

                    <h2>
                      Total: ₹
                      {cart.reduce(
                        (total, item) =>
                          total +
                          item.product.price *
                            item.quantity,
                        0
                      )}
                    </h2>

                  </div>

                </div>

              </section>
            )}

          {/* ORDER CONFIRMATION */}
          {orderPlaced && (
            <section className="confirmation-page">

              <div className="confirmation-card">

                <div className="success-icon">
                  ✓
                </div>

                <h1>
                  Order Placed Successfully!
                </h1>

                <p>
                  Thank you for supporting Indian
                  artisans. ❤️
                </p>

                <p className="order-message">
                  Your handmade products are being
                  prepared for delivery.
                </p>

                <div className="order-id">
                  Order ID:{" "}
                  {orders.length > 0
                    ? orders[0].id
                    : ""}
                </div>

                <button
                  className="checkout-button"
                  onClick={() => {
                    setOrderPlaced(false);
                    setShowCart(false);
                    setShowCheckout(false);
                    setCart([]);
                  }}
                >
                  Continue Shopping
                </button>

              </div>

            </section>
          )}

          {/* MY ORDERS */}
          {showOrders && (
            <section className="orders-page">

              <button
                className="back-button"
                onClick={() =>
                  setShowOrders(false)
                }
              >
                ← Back to Home
              </button>

              <h1>
                📦 My Orders
              </h1>

              {orders.length === 0 ? (
                <div className="empty-orders">

                  <h3>
                    No orders yet
                  </h3>

                  <p>
                    Your previous orders will
                    appear here.
                  </p>

                </div>
              ) : (
                <div className="orders-container">

                  {orders.map((order) => (
                    <div
                      className="order-card"
                      key={order.id}
                    >

                      <div className="order-header">

                        <div>
                          <h3>
                            Order {order.id}
                          </h3>

                          <p>
                            Ordered on{" "}
                            {order.date}
                          </p>
                        </div>

                        <strong>
                          ₹{order.total}
                        </strong>

                      </div>

                      <div className="order-products">

                        {order.items.map(
                          (item) => (
                            <div
                              key={
                                item.product.id
                              }
                            >
                              {item.product.image}{" "}
                              {item.product.name}{" "}
                              × {item.quantity}
                            </div>
                          )
                        )}

                      </div>

                      {/* TRACKING */}
                      <div className="tracking">

                        <h3>
                          Order Tracking
                        </h3>

                        <div className="tracking-steps">

                          <div className="tracking-step active">
                            <span>✓</span>
                            <p>
                              Order Placed
                            </p>
                          </div>

                          <div className="tracking-step">
                            <span>2</span>
                            <p>
                              Confirmed
                            </p>
                          </div>

                          <div className="tracking-step">
                            <span>3</span>
                            <p>
                              Preparing
                            </p>
                          </div>

                          <div className="tracking-step">
                            <span>4</span>
                            <p>
                              Shipped
                            </p>
                          </div>

                          <div className="tracking-step">
                            <span>5</span>
                            <p>
                              Delivered
                            </p>
                          </div>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </section>
          )}

          {/* PROFILE */}
          {showProfile && (
            <section className="profile-page">

              <button
                className="back-button"
                onClick={() =>
                  setShowProfile(false)
                }
              >
                ← Back to Home
              </button>

              <div className="profile-card">

                <div className="profile-icon">
                  👤
                </div>

                <h1>
                  My Profile
                </h1>

                <div className="profile-info">

                  <p>
                    <strong>Name:</strong>{" "}
                    {customer.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {loginData.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {customer.phone ||
                      "Not added yet"}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {customer.address ||
                      "Not added yet"}
                  </p>

                </div>

                <button
                  className="logout-button"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>

            </section>
          )}

          {/* FOOTER */}
          {!showOrders &&
            !showProfile &&
            !showCheckout &&
            !showCart && (
              <footer id="about">

                <h3>
                  HunarSetu
                </h3>

                <p>
                  Connecting Indian artisans
                  with customers.
                </p>

                <p>
                  Made with ❤️ for Indian artisans
                </p>

              </footer>
            )}

        </>
      )}

    </div>
  );
}

export default App;