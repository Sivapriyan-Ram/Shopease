<div align="center">

# 🛍️ ShopEase — Full-Stack E-Commerce Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![EJS](https://img.shields.io/badge/View_Engine-EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=white)](https://ejs.co/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  A robust, full-featured e-commerce web application built with the <b>MVC (Model-View-Controller)</b> architecture using <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>, and <b>EJS</b>.
</p>

[Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Installation & Setup](#-getting-started) • [Admin Setup](#-creating-an-admin-account) • [Routes & Endpoints](#-routes--api-endpoints)

---

</div>

## 📌 Project Overview

**ShopEase** is an end-to-end e-commerce solution designed for seamless online shopping and inventory control. It provides a dual-interface experience:

1. **Customer Portal**: Allows shoppers to explore items, view product details, manage their personal cart, checkout with real-time inventory validation, and track past orders.
2. **Admin Management Suite**: Enables administrators to monitor platform metrics, manage the product catalog (create, update, delete), inspect customer accounts, and update live order fulfillment statuses.

---

## ✨ Key Features

### 👤 Customer Experience
- **User Authentication**: Secure user registration and login powered by `bcryptjs` password hashing and `express-session`.
- **Dynamic Product Catalog**: Browse available items with live pricing, category tagging, and high-resolution product imagery.
- **Detailed Product View**: Dedicated single-product view with stock level indicators and custom quantity selectors.
- **Cart Management**: Add products to cart, update quantities dynamically, remove individual line items, and view total cart computations.
- **Smart Checkout System**: Real-time stock verification at checkout to prevent overselling. Seamless delivery information capture.
- **Order Tracking**: Comprehensive order history displaying items, quantities, pricing, order date, and live fulfillment status (`placed`, `shipped`, `delivered`).
- **Interactive Feedback**: Contextual flash alerts for successful actions, login prompts, and error notifications.

### 🛠️ Admin Capabilities
- **Overview Dashboard**: Quick high-level analytics tracking total products in catalog and total registered customers.
- **Product Management (CRUD)**:
  - Add new products with title, category, description, price, stock, and image URL.
  - Modify existing product attributes in real-time.
  - Delete products with automatic confirmation prompts.
  - Visual indicators for products with low stock (`< 5` units remaining).
- **Order Lifecycle Management**: View incoming orders with full customer info, line items, and delivery address. Update order status from `placed` to `shipped` or `delivered`.
- **Customer Directory**: Browse registered users, joined dates, and contact information.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) | JavaScript runtime engine |
| **Backend Framework** | [Express.js](https://expressjs.com/) | RESTful routing and middleware handling |
| **Database** | [MongoDB](https://www.mongodb.com/) | NoSQL document database |
| **ODM** | [Mongoose](https://mongoosejs.com/) | Object data modeling for MongoDB |
| **Templating Engine** | [EJS](https://ejs.co/) | Server-side rendering with Embedded JavaScript |
| **UI & Styling** | [Bootstrap 5](https://getbootstrap.com/) & Custom CSS | Responsive layout, modern UI components |
| **Authentication** | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) & [express-session](https://github.com/expressjs/session) | Cryptographic password hashing & session management |
| **Utilities** | `connect-flash`, `method-override`, `dotenv` | Flash notifications, REST method spoofing, environment config |

---

## 📂 Project Structure

```text
Shopease/
├── middleware/
│   └── auth.js            # Authentication & role-based authorization guards
├── models/
│   ├── Order.js           # Order schema (items, total, delivery address, status)
│   ├── Product.js         # Product schema (name, price, stock, category, image)
│   └── User.js            # User schema (credentials, role, shopping cart)
├── public/
│   └── css/
│       └── style.css      # Custom styling and design enhancements
├── routes/
│   ├── admin.js           # Admin portal endpoints (dashboard, CRUD, orders)
│   ├── auth.js            # Auth handlers (/login, /register, /logout)
│   ├── cart.js            # Shopping cart management routes
│   ├── order.js           # Checkout processing & order history
│   └── user.js            # Customer storefront & product browsing
├── views/
│   ├── admin/             # Admin EJS templates
│   │   ├── addProduct.ejs
│   │   ├── dashboard.ejs
│   │   ├── editProduct.ejs
│   │   ├── viewCustomers.ejs
│   │   ├── viewOrders.ejs
│   │   └── viewProducts.ejs
│   ├── auth/              # Auth EJS templates
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── partials/          # Reusable header and footer components
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── user/              # Customer storefront templates
│       ├── cart.ejs
│       ├── checkout.ejs
│       ├── dashboard.ejs
│       ├── orders.ejs
│       ├── orderSuccess.ejs
│       └── product.ejs
├── .env.example           # Template for environment configuration
├── .gitignore             # Git ignore patterns
├── app.js                 # Application entry point & Express configuration
├── LICENSE                # MIT License
├── package.json           # Dependencies and project metadata
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port `27017` (or a remote [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI)
- [Git](https://git-scm.com/)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sivapriyan-Ram/Shopease.git
cd Shopease
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory by copying the example template:

```bash
cp .env.example .env
```

Open `.env` and verify or customize the values:

```env
PORT=2000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerceDB
SESSION_SECRET=ecommerce_secret_key_change_in_production
```

### Step 4: Start MongoDB

Make sure your MongoDB server is active:

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Windows (Command Prompt / Services)
net start MongoDB

# Linux (systemd)
sudo systemctl start mongod
```

### Step 5: Launch the Application

For development with automatic reload on changes:
```bash
npm run dev
```

For production mode:
```bash
npm start
```

Once running, navigate to:
```text
http://localhost:2000
```

---

## 🔑 Creating an Admin Account

By default, new registrations are assigned the `user` role for security. To create an administrator:

1. Register a new account via the `/register` web interface (e.g., `admin@shopease.com`).
2. Open your MongoDB shell (`mongosh`) or MongoDB Compass.
3. Switch to the database and update the user's role:

```javascript
use ecommerceDB;

db.users.updateOne(
  { email: "admin@shopease.com" },
  { $set: { role: "admin" } }
);
```

4. Log in with the updated account credentials. You will be automatically redirected to `/admin`!

---

## 🚦 Routes & API Endpoints

### 🔐 Authentication Routes (`/routes/auth.js`)
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/register` | Render user registration page | Public |
| `POST` | `/register` | Register a new user with hashed password | Public |
| `GET` | `/login` | Render login page | Public |
| `POST` | `/login` | Authenticate user and initialize session | Public |
| `GET` | `/logout` | Terminate session and redirect to login | Authenticated |

### 🛒 Customer Routes (`/routes/user.js`, `/routes/cart.js`, `/routes/order.js`)
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/dashboard` | View all available products | Logged in |
| `GET` | `/product/:id` | View detailed product specifications | Logged in |
| `GET` | `/cart` | View items in shopping cart and total calculation | Logged in |
| `POST` | `/cart/add/:id` | Add product to cart with specified quantity | Logged in |
| `POST` | `/cart/update/:productId` | Update item quantity in cart | Logged in |
| `POST` | `/cart/remove/:productId` | Remove item from cart | Logged in |
| `GET` | `/checkout` | Render checkout form with order summary | Logged in |
| `POST` | `/checkout` | Validate stock, place order, and empty cart | Logged in |
| `GET` | `/orders` | View user's order history & fulfillment statuses | Logged in |

### 🛡️ Admin Routes (`/routes/admin.js`)
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin` | Admin dashboard metrics (products & customers) | Admin only |
| `GET` | `/admin/products` | Manage all products with stock indicators | Admin only |
| `GET` | `/admin/products/add` | Form to create a new product | Admin only |
| `POST` | `/admin/products/add` | Insert new product into catalog | Admin only |
| `GET` | `/admin/products/edit/:id` | Form to edit an existing product | Admin only |
| `PUT` | `/admin/products/:id` | Update product information in database | Admin only |
| `DELETE` | `/admin/products/:id` | Delete product from database | Admin only |
| `GET` | `/admin/orders` | View all orders with customer details & address | Admin only |
| `POST` | `/admin/orders/:id/status` | Update fulfillment status (`placed`/`shipped`/`delivered`) | Admin only |
| `GET` | `/admin/customers` | List all registered customers | Admin only |

---

## 🗄️ Database Schemas

### 1. User (`models/User.js`)
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, hashed via bcrypt)
- `role` (String, enum: `["user", "admin"]`, default: `"user"`)
- `cart` (Array of objects referencing `Product` with `quantity`)
- `timestamps` (`createdAt`, `updatedAt`)

### 2. Product (`models/Product.js`)
- `name` (String, required)
- `description` (String, required)
- `price` (Number, required, min: 0)
- `image` (String, fallback placeholder)
- `stock` (Number, required, min: 0)
- `category` (String)
- `timestamps` (`createdAt`, `updatedAt`)

### 3. Order (`models/Order.js`)
- `user` (ObjectId referencing `User`)
- `items` (Array of products: `product`, `name`, `price`, `quantity`)
- `totalAmount` (Number, required)
- `address` (`fullName`, `address`, `phone`)
- `paymentMethod` (String, default: `"Cash on Delivery"`)
- `status` (String, enum: `["placed", "shipped", "delivered"]`, default: `"placed"`)
- `timestamps` (`createdAt`, `updatedAt`)

---

## 🔮 Roadmap / Future Enhancements

- [ ] Online Payment Gateway integration (Stripe / Razorpay / PayPal).
- [ ] Product search bar with category filters and price range sliders.
- [ ] Customer product reviews and 5-star rating system.
- [ ] Password reset mechanism via email verification tokens.
- [ ] Cloud-based image upload via Cloudinary or AWS S3.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sivapriyan-R**
- GitHub: [@Sivapriyan-Ram](https://github.com/Sivapriyan-Ram)
- Email: [sivapriyan0608@gmail.com](mailto:sivapriyan0608@gmail.com)

---

<div align="center">
  <sub>Built with ❤️ for modern e-commerce web applications.</sub>
</div>
