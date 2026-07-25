const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ---------- Show register form ----------
router.get("/register", (req, res) => {
  res.render("auth/register", { error: null });
});

// ---------- Handle registration ----------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("auth/register", { error: "Email already registered." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // always force normal users; admins are set manually in DB
    });

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("auth/register", { error: "Something went wrong. Try again." });
  }
});

// ---------- Show login form ----------
router.get("/login", (req, res) => {
  res.render("auth/login", { error: null });
});

// ---------- Handle login ----------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render("auth/login", { error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("auth/login", { error: "Invalid email or password." });
    }

    // Store user info in session
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.name = user.name;

    // Redirect based on role
    if (user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    res.render("auth/login", { error: "Something went wrong. Try again." });
  }
});

// ---------- Logout ----------
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;