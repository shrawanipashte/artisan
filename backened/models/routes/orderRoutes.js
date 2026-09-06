const express = require("express");
const router = express.Router();

const Order = require("../Order");
const Product = require("../Product");

// ==========================================
// 1. CREATE A NEW ORDER
// ==========================================
router.post("/orders", async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Automatically get artisan name from product
    const orderData = {
      ...req.body,
      artisanName: product.artisanName
    };

    const order = new Order(orderData);

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (error) {
    res.status(400).json({
      message: "Failed to place order",
      error: error.message
    });
  }
});

// ==========================================
// 2. GET ALL ORDERS
// ==========================================
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
});


// ==========================================
// 3. UPDATE ORDER STATUS
// ==========================================
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: order
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message
    });
  }
});


// ==========================================
// 4. GET ORDERS BY CUSTOMER EMAIL
// ==========================================
router.get("/orders/customer/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      customerEmail: req.params.email
    });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer orders",
      error: error.message
    });
  }
});

// ==========================================
// 5. GET ORDERS BY ARTISAN NAME
// ==========================================
router.get("/orders/artisan/:artisanName", async (req, res) => {
  try {
    const orders = await Order.find({
      artisanName: req.params.artisanName
    });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch artisan orders",
      error: error.message
    });
  }
});

// ==========================================
// 6. GET ONE ORDER BY ID
// ==========================================
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message
    });
  }
});


module.exports = router;