# Items API

Below is a **complete, clean, beginner-friendly Items API** based on Mongoose model.

This includes:

- Create Item (POST)
- Get All Items (GET)
- Get Item by ID (GET)
- Update Item (PUT)
- Delete Item (DELETE)

---

## 📁 Project Structure

```
project/
├── index.js
├── models/
│   └── Item.js
├── routes/
│   └── items.routes.js
├── .env
└── package.json
```

---

## 1️⃣ Item Model (Your Given Model)

📄 `models/Item.js`

```js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    isTaxable: { type: Boolean, required: true },
    taxPercentage: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Item", itemSchema);
```

---

## 2️⃣ Items Routes

📄 `routes/items.routes.js`

```js
const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// ==========================================
// POST /items – Create Item
// ==========================================
router.post("/", async (req, res) => {
  try {
    const { name, rate, isTaxable, taxPercentage } = req.body;

    if (!name || rate === undefined || typeof isTaxable !== "boolean") {
      return res.status(400).json({
        message: "Name, rate and isTaxable are required",
      });
    }

    const item = new Item({
      name,
      rate,
      isTaxable,
      taxPercentage: isTaxable ? taxPercentage : 0,
    });

    const savedItem = await item.save();

    res.status(201).json({
      message: "Item created successfully",
      data: savedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create item",
    });
  }
});

// ==========================================
// GET /items – Get All Items
// ==========================================
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch items",
    });
  }
});

// ==========================================
// GET /items/:id – Get Item By ID
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Invalid item ID",
    });
  }
});

// ==========================================
// PUT /items/:id – Update Item
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    const { name, rate, isTaxable, taxPercentage } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        rate,
        isTaxable,
        taxPercentage: isTaxable ? taxPercentage : 0,
      },
      { new: true, runValidators: true },
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update item",
    });
  }
});

// ==========================================
// DELETE /items/:id – Delete Item
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid item ID",
    });
  }
});

module.exports = router;
```

---

## 3️⃣ Register Routes in index.js

📄 `index.js`

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const itemRoutes = require("./routes/items.routes");
app.use("/items", itemRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 🧪 Sample POST Request

```
POST /items
```

```json
{
  "name": "USB Keyboard",
  "rate": 750,
  "isTaxable": true,
  "taxPercentage": 18
}
```

---

# 🧠 Important Teaching Points

✔ Always validate required fields
✔ Use `runValidators: true` in update
✔ Sort by `createdAt` for latest first
✔ Return proper status codes

---

## 🚦 HTTP Status Codes Used

| Action     | Status |
| ---------- | ------ |
| Create     | 201    |
| Get        | 200    |
| Update     | 200    |
| Delete     | 200    |
| Invalid ID | 400    |
| Not found  | 404    |

---

## 🎓 One-Line Summary

> This API provides complete CRUD operations for Items using Mongoose.
