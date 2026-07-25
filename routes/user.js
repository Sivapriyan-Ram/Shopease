const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { isLoggedIn } = require("../middleware/auth");

// All user routes require login
router.use(isLoggedIn);

// ---------- User dashboard: show all products ----------
router.get("/dashboard", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render("user/dashboard", { products, name: req.session.name });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading products");
  }
});

// ---------- Single product page ----------
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.render("user/product", { product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading product");
  }
});

module.exports = router;