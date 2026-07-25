const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

// All admin routes require login + admin role
router.use(isLoggedIn, isAdmin);

// ---------- Admin dashboard ----------
router.get("/", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const customerCount = await User.countDocuments({ role: "user" });
    res.render("admin/dashboard", { productCount, customerCount, name: req.session.name });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
});

// ---------- Show add product form ----------
router.get("/products/add", (req, res) => {
  res.render("admin/addProduct", { error: null });
});

// ---------- Handle add product ----------
router.post("/products/add", async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;
    await Product.create({ name, description, price, image, stock, category });
    req.flash("success", "Product added successfully!");
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.render("admin/addProduct", { error: "Something went wrong. Try again." });
  }
});

// ---------- View all customers ----------
router.get("/customers", async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.render("admin/viewCustomers", { customers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading customers");
  }
});

// ---------- View all orders ----------
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.render("admin/viewOrders", { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading orders");
  }
});

// ---------- Update order status ----------
router.post("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.redirect("/admin/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating order status");
  }
});

// ---------- View all products (with edit/delete options) ----------
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render("admin/viewProducts", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading products");
  }
});

// ---------- Show edit product form ----------
router.get("/products/edit/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.render("admin/editProduct", { product, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading product");
  }
});

// ---------- Handle product update ----------
router.put("/products/:id", async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      image,
      stock,
      category,
    });
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating product");
  }
});

// ---------- Delete product ----------
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted.");
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
});
module.exports = router;