const express = require("express");
const router = express.Router();

const Product = require("../Product");

// Add a new product
router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add product",
      error: error.message
    });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
});

module.exports = router;