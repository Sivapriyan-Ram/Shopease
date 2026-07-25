// Checks if a user is logged in (any role)
function isLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect("/login");
}

// Checks if the logged-in user is specifically an admin
function isAdmin(req, res, next) {
  if (req.session && req.session.role === "admin") {
    return next();
  }
  res.status(403).send("Access denied. Admins only.");
}

module.exports = { isLoggedIn, isAdmin };