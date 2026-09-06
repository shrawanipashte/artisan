const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true
    },

    customerEmail: {
      type: String,
      required: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    productTitle: {
      type: String,
      required: true
    },

    artisanName: {
        type: String,
        required: true
    },
      
    quantity: {
      type: Number,
      required: true,
      default: 1
    },

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);