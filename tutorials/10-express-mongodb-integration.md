# 🧪 Lab: Express + MongoDB (GET Customers API using Mongoose)

## 🎯 Objective

By the end of this lab, you will:

* Connect Express to MongoDB (Atlas)
* Understand **Mongoose models**
* Fetch customer data from MongoDB
* Create a **GET /customers** API

---

## 🛠 Prerequisites

* Express app already created
* MongoDB Atlas account & cluster ready
* Basic Express routing knowledge

---

## 📦 Step 1: Install Required Packages

Inside your Express project:

```bash
npm install mongoose dotenv
```

---

## 📁 Step 2: Project Structure (Minimal & Clean)

```
express-mongo-app/
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

## 🔐 Step 3: Add MongoDB Connection String

### 📄 `.env`

```env
MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/accountingDB
```

⚠️ Replace:

* `username`
* `password`
* `accountingDB`

📌 Also ensure `.env` is added to `.gitignore`.

---

## 🔌 Step 4: Connect MongoDB in Express

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
  .catch(err => console.error("MongoDB error:", err));

// Routes
const customerRoutes = require("./routes/customers.routes");
app.use("/customers", customerRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

✅ If connection is correct, you’ll see:

```
MongoDB connected
```

---

## 📄 Step 5: Create Customer Model (Mongoose)

### 📁 `models/Customer.js`

```js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  creditLimit: Number
});

module.exports = mongoose.model("Customer", customerSchema);
```

📌 This tells MongoDB **how Customer data looks**.

---

## 🛣️ Step 6: Create GET Customers API

### 📁 `routes/customers.routes.js`

```js
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers"
    });
  }
});

module.exports = router;
```

---

## 🧪 Step 7: Add Sample Data (One Time)

Using **MongoDB Atlas → Browse Collections → Insert Document**

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "creditLimit": 50000
}
```

Add **2–3 customers** for testing.

---

## ▶️ Step 8: Run Server

```bash
node index.js
```

---

## 🌐 Step 9: Test GET API

### Using Browser or Thunder Client

```
GET http://localhost:3000/customers
```

### ✅ Sample Response

```json
[
  {
    "_id": "65fa1234abcd",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "phone": "9876543210",
    "creditLimit": 50000
  }
]
```

🎉 **You are now fetching data from MongoDB using Express!**

---

## 🧠 Important Concepts

| Concept     | Meaning                 |
| ----------- | ----------------------- |
| MongoDB     | Stores data             |
| Mongoose    | Talks to MongoDB        |
| Model       | Represents a collection |
| `find()`    | Fetches documents       |
| Async/Await | Handles DB operations   |

---

## 🎓 Important Tip

> Express does not talk to MongoDB directly — **Mongoose is the translator**.

---

## 🧪 Mini Assignment (Very Important)

1. Add one more customer in Atlas
2. Refresh `/customers`
3. Verify data appears without code change

---

