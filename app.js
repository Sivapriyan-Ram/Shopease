require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const session = require('express-session')
const bodyparser = require('body-parser')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const path = require('path')
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')

const app = express()
const port = process.env.PORT || 2000

app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// ---------- Session setup ----------
app.use(session({
  secret: process.env.SESSION_SECRET || 'ecommerceSecretKey',
  resave: false,
  saveUninitialized: false,
}))

app.use(flash())

// Make flash messages available in ALL views automatically
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('success')
  res.locals.errorMsg = req.flash('error')
  next()
})

// ---------- Connect to MongoDB ----------
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerceDB"
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Connection Error:", err))

// ---------- Routes ----------
app.use('/', authRoutes) // handles /register, /login, /logout
app.use('/admin', adminRoutes)
app.use('/', userRoutes)
app.use('/', cartRoutes)
app.use('/', orderRoutes)

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.listen(port, () => console.log(`Server Running on port:${port}`))