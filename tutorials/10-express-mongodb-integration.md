# 📘 Express + Mongoose Tutorial

## Create & Retrieve Customers from MongoDB

---

## 🎯 What You Will Learn

By the end of this tutorial, you will be able to:

- Install required libraries
- Connect Express to MongoDB using Mongoose
- Create a **Customer model**
- Create a **POST API** to save customers
- Create a **GET API** to retrieve customers

---

## 1️⃣ Prerequisites

Make sure you have:

- Node.js installed
- MongoDB running locally **or** MongoDB Atlas connection
- Basic knowledge of Express.js

---

## 2️⃣ Create Express Project

```bash
mkdir express-mongoose-app
cd express-mongoose-app
npm init -y
```

---

## 3️⃣ Install Required Libraries

```bash
npm install express mongoose dotenv
```

### What these libraries do:

| Package  | Purpose                         |
| -------- | ------------------------------- |
| express  | Create APIs                     |
| mongoose | Connect & interact with MongoDB |
| dotenv   | Read environment variables      |

---

## 4️⃣ Project Structure

```
express-mongoose-app/
├── index.js
├── models/
│   └── Customer.js
├── routes/
│   └── customers.routes.js
├── .env
├── package.json
└── node_modules/
```

---

## 5️⃣ Add MongoDB Connection String

### 📄 `.env`

```env
MONGO_URL=mongodb://127.0.0.1:27017/accountingDB
```

👉 If using MongoDB Atlas, paste the Atlas connection string instead.

📌 Add `.env` to `.gitignore`.

---

## 6️⃣ Setup Express & Connect MongoDB

### 📄 `index.js`

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Routes
const customerRoutes = require("./routes/customers.routes");
app.use("/customers", customerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 7️⃣ Create Customer Model (Mongoose)

### 📄 `models/Customer.js`

```js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    creditLimit: Number,
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Customer", customerSchema);
```

### Key Concepts

- **Schema** → structure of data
- **Model** → represents MongoDB collection
- **timestamps** → adds `createdAt`, `updatedAt`

---

## 8️⃣ Create Routes for Customers

### 📄 `routes/customers.routes.js`

```js
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// ===============================
// POST – Create Customer
// ===============================
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      data: savedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
});

// ===============================
// GET – Retrieve All Customers
// ===============================
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
});

module.exports = router;
```

---

## 9️⃣ Run the Application

```bash
node index.js
```

Expected output:

```
MongoDB connected
Server running on http://localhost:3000
```

---

## 1️⃣0️⃣ Test APIs (Using Thunder Client / Postman)

### ✅ Create Customer (POST)

```
POST http://localhost:3000/customers
```

**Body (JSON):**

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "creditLimit": 50000
}
```

---

### ✅ Get All Customers (GET)

```
GET http://localhost:3000/customers
```

**Sample Response:**

```json
[
  {
    "_id": "65fa123abc",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "phone": "9876543210",
    "creditLimit": 50000,
    "isActive": true,
    "createdAt": "2025-01-01T10:30:00.000Z"
  }
]
```

---

## 🧠 Key Concepts to Explain to Students

| Concept  | Meaning            |
| -------- | ------------------ |
| Mongoose | ODM for MongoDB    |
| Schema   | Data structure     |
| Model    | Collection handler |
| Document | One record         |
| `save()` | Insert data        |
| `find()` | Retrieve data      |

---

## 🎓 One-Line Summary

> Express handles APIs, Mongoose handles MongoDB, and together they allow us to store and retrieve data easily.
