const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { isLoggedIn } = require("../middleware/auth");

router.use(isLoggedIn);

// ---------- Show checkout page ----------
router.get("/checkout", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate("cart.product");

    if (!user.cart.length) {
      return res.redirect("/cart");
    }

    let total = 0;
    user.cart.forEach((item) => {
      if (item.product) total += item.product.price * item.quantity;
    });

    res.render("user/checkout", { cartItems: user.cart, total, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading checkout");
  }
});

// ---------- Place order ----------
router.post("/checkout", async (req, res) => {
  try {
    const { fullName, address, phone } = req.body;
    const user = await User.findById(req.session.userId).populate("cart.product");

    if (!user.cart.length) {
      return res.redirect("/cart");
    }

    // Build order items + calculate total + check stock
    let total = 0;
    const orderItems = [];

    for (const item of user.cart) {
      if (!item.product) continue;

      if (item.product.stock < item.quantity) {
        const cartTotal = user.cart.reduce(
          (sum, i) => (i.product ? sum + i.product.price * i.quantity : sum),
          0
        );
        return res.render("user/checkout", {
          cartItems: user.cart,
          total: cartTotal,
          error: `Not enough stock for "${item.product.name}". Only ${item.product.stock} left.`,
        });
      }

      orderItems.push({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      });

      total += item.product.price * item.quantity;

      // Reduce stock
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Create the order
    await Order.create({
      user: user._id,
      items: orderItems,
      totalAmount: total,
      address: { fullName, address, phone },
      paymentMethod: "Cash on Delivery",
      status: "placed",
    });

    // Clear the cart
    user.cart = [];
    await user.save();

    req.flash("success", "🎉 Your order has been placed successfully! Pay via Cash on Delivery upon arrival.");
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error placing order");
  }
});

// ---------- View my orders ----------
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.render("user/orders", { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading orders");
  }
});

module.exports = router;