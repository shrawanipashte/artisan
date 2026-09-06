require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./models/routes/productRoutes");
const orderRoutes = require("./models/routes/orderRoutes");
const app = express();

app.use(express.json());
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "HunarSetu Backend is running!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
