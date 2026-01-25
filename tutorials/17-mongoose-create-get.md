# 📁 Customer CRUD APIs using Express + Mongoose

## 📄 1️⃣ Customer Model (`models/Customer.js`)

```js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    age: Number,
    dateOfBirth: Date,
    creditLimit: Number,
    gstNumber: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
```

---

## 📄 2️⃣ Customer Routes (`routes/customers.routes.js`)

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
// GET – Customer by ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({
      message: "Invalid customer ID",
    });
  }
});

// ===============================
// PUT – Update Customer
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

// ===============================
// DELETE – Customer
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid customer ID",
    });
  }
});

module.exports = router;
```

---

## 📄 3️⃣ Mount Routes (`index.js`)

```js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const customerRoutes = require("./routes/customers.routes");
app.use("/customers", customerRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## 🧪 API Summary (Quick Reference)

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | `/customers`     | Create customer |
| GET    | `/customers/:id` | Fetch customer  |
| PUT    | `/customers/:id` | Update customer |
| DELETE | `/customers/:id` | Delete customer |

---

## 🧪 Sample POST Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "age": 30,
  "dateOfBirth": "1994-05-12",
  "creditLimit": 50000,
  "gstNumber": "29ABCDE1234F1Z5"
}
```

---

## 🎓 Notes (Very Important)

- `findById()` → fetch one
- `findByIdAndUpdate()` → update
- `findByIdAndDelete()` → delete
- `{ new: true }` → returns updated document
- MongoDB `_id` is always a string

---

## 🧠 One-Line Rule

> Express handles routes, Mongoose handles database logic.
