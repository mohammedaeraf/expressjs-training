# ✅ Sample Solution

## Items API – Validation + Full CRUD (Mongoose)

---

## 📁 Project Structure

```
items-mongoose-app/
├── index.js
├── models/
│   └── Item.js
├── routes/
│   └── items.routes.js
├── middlewares/
│   └── validateItem.js
├── .env
├── package.json
```

---

## 1️⃣ Item Model

### 📄 `models/Item.js`

```js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    rate: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      required: true
    },
    isTaxable: {
      type: Boolean,
      required: true
    },
    taxPercentage: {
      type: Number,
      enum: [0, 5, 12, 18, 28],
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Item", itemSchema);
```

---

## 2️⃣ Validation Middleware

### 📄 `middlewares/validateItem.js`

```js
const validator = require("validator");

module.exports = (req, res, next) => {
  const { name, rate, unit, isTaxable, taxPercentage } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: "Item name is required" });
  }

  if (rate === undefined || isNaN(rate) || rate <= 0) {
    return res.status(400).json({ message: "Rate must be greater than 0" });
  }

  if (!unit) {
    return res.status(400).json({ message: "Unit is required" });
  }

  if (typeof isTaxable !== "boolean") {
    return res.status(400).json({ message: "isTaxable must be boolean" });
  }

  if (isTaxable) {
    const allowedTaxes = [0, 5, 12, 18, 28];
    if (!allowedTaxes.includes(taxPercentage)) {
      return res.status(400).json({
        message: "Invalid tax percentage"
      });
    }
  }

  next();
};
```

---

## 3️⃣ Items Routes (Full CRUD)

### 📄 `routes/items.routes.js`

```js
const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const validateItem = require("../middlewares/validateItem");


// ===============================
// POST – Create Item
// ===============================
router.post("/", validateItem, async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();

    res.status(201).json({
      message: "Item created successfully",
      data: savedItem
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create item" });
  }
});


// ===============================
// GET – All Items
// ===============================
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});


// ===============================
// GET – Item by ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: "Invalid item ID" });
  }
});


// ===============================
// PUT – Update Item
// ===============================
router.put("/:id", validateItem, async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item updated successfully",
      data: updatedItem
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update item" });
  }
});


// ===============================
// DELETE – Item
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully"
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid item ID" });
  }
});

module.exports = router;
```

---

## 4️⃣ App Entry Point

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
  .catch(err => console.error(err));

// Routes
const itemRoutes = require("./routes/items.routes");
app.use("/items", itemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 🧪 Sample Test Data

### ✅ Valid Item

```json
{
  "name": "USB Keyboard",
  "rate": 750,
  "unit": "pcs",
  "isTaxable": true,
  "taxPercentage": 18
}
```

### ❌ Invalid Item

```json
{
  "name": "",
  "rate": -100,
  "unit": "",
  "isTaxable": true,
  "taxPercentage": 10
}
```

---

## 🚦 Status Codes Used

| Scenario         | Code |
| ---------------- | ---- |
| Create success   | 201  |
| Fetch success    | 200  |
| Update success   | 200  |
| Delete success   | 200  |
| Validation error | 400  |
| Not found        | 404  |

---

## 🧠 Key Points

* Validation is handled via **middleware**
* `save()` → insert
* `findByIdAndUpdate()` → update
* `findByIdAndDelete()` → delete
* Backend controls **data integrity**

---

## 🎓 Summary

> This assignment demonstrates how real APIs validate, update, and delete data safely using Mongoose.
