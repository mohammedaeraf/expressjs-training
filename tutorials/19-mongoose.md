# 🧩 Mongoose – Beginner Tutorial

## 🎯 What You Will Learn

By the end of this tutorial, you will be able to:

* Understand **what Mongoose is and why it is used**
* Connect Express to MongoDB using Mongoose
* Understand **Schema, Model, and Document**
* Create a simple **Customer model**
* Perform a basic **GET API using Mongoose**

---

## 1️⃣ What is Mongoose?

**Mongoose** is an **ODM (Object Data Modeling) library** for MongoDB and Node.js.

📌 In simple words:

> **Mongoose helps Express talk to MongoDB in a structured way**

---

## 2️⃣ Why Do We Need Mongoose?

MongoDB by itself:

* Is schema-less
* Allows any data shape
* Can lead to inconsistent data

Mongoose provides:

* Schema (structure)
* Validation
* Easy CRUD methods
* Cleaner, readable code

✔ Industry standard for **Node + MongoDB**

---

## 3️⃣ MongoDB vs Mongoose (Clear Difference)

| MongoDB     | Mongoose         |
| ----------- | ---------------- |
| Database    | Library          |
| Stores data | Talks to DB      |
| Schema-less | Schema-based     |
| Raw queries | Clean JS methods |

📌 Express **does not talk to MongoDB directly** — Mongoose is the bridge.

---

## 4️⃣ Install Mongoose

Inside your Express project:

```bash
npm install mongoose
```

---

## 5️⃣ Connect MongoDB Using Mongoose

### 📄 `index.js`

```js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/accountingDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

📌 If connection is successful, you’ll see:

```
MongoDB connected
```

---

## 6️⃣ Core Mongoose Concepts (Very Important)

### 1️⃣ Schema

Defines **structure of data**

### 2️⃣ Model

Represents a **collection**

### 3️⃣ Document

Represents **one record**

---

## 7️⃣ Create Your First Schema (Customer)

### 📁 Create folder

```
models/
```

### 📄 `models/Customer.js`

```js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    creditLimit: Number,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", customerSchema);
```

---

## 8️⃣ What Just Happened? (Explain Clearly)

| Code                    | Meaning                       |
| ----------------------- | ----------------------------- |
| `new mongoose.Schema()` | Defines structure             |
| `type`                  | Data type                     |
| `default`               | Default value                 |
| `timestamps: true`      | Adds `createdAt`, `updatedAt` |
| `mongoose.model()`      | Creates model                 |

📌 Model name **Customer** → collection **customers**

---

## 9️⃣ Insert Data Using Mongoose (POST)

```js
const Customer = require("./models/Customer");

app.post("/customers", async (req, res) => {
  const customer = new Customer(req.body);
  const savedCustomer = await customer.save();

  res.status(201).json(savedCustomer);
});
```

---

## 🔍 10️⃣ Fetch Data Using Mongoose (GET)

```js
app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});
```

---

## 🧪 Sample Customer JSON

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "creditLimit": 50000
}
```

---

## 1️⃣1️⃣ Common Mongoose Methods (Must Know)

| Method                | Purpose |
| --------------------- | ------- |
| `find()`              | Get all |
| `findById()`          | Get one |
| `save()`              | Insert  |
| `findByIdAndUpdate()` | Update  |
| `findByIdAndDelete()` | Delete  |

---

## ⚠️ Common Beginner Mistakes

❌ Forgetting `await`
❌ Sending MongoDB connection object in response
❌ Not handling async errors
❌ Expecting Mongoose to auto-validate without schema rules

---

## 🎓 One-Line Summary for Students

> Mongoose adds structure, validation, and convenience on top of MongoDB.

---

## 🧠 Interview-Friendly Answer

> Mongoose is an ODM library that provides schema-based data modeling and simplifies MongoDB interactions in Node.js applications.
