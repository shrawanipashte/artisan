const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    artisanName: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    stock: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);