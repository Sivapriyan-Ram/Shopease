const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const { isLoggedIn } = require("../middleware/auth");

router.use(isLoggedIn);

// ---------- Add to cart ----------
router.post("/cart/add/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity) || 1;
    const user = await User.findById(req.session.userId);

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    req.flash("success", "Item added to cart!");
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to cart");
  }
});



// ---------- View cart ----------
router.get("/cart", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate("cart.product");

    // Calculate total price
    let total = 0;
    user.cart.forEach((item) => {
      if (item.product) {
        total += item.product.price * item.quantity;
      }
    });

    res.render("user/cart", { cartItems: user.cart, total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading cart");
  }
});

// ---------- Update quantity in cart ----------
router.post("/cart/update/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.session.userId);

    const item = user.cart.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (item) {
      item.quantity = parseInt(quantity);
    }

    await user.save();
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating cart");
  }
});

// ---------- Remove item from cart ----------
router.post("/cart/remove/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await user.save();
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing item");
  }
});

module.exports = router;