const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      fullName: String,
      address: String,
      phone: String,
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered"],
      default: "placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);