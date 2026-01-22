# ✅ Sample Solution: Invoice API (Express + Mongoose)

## 📁 Folder Structure (Reference)

```
accounting-app/
├── index.js
├── models/
│   ├── Customer.js
│   ├── Item.js
│   └── Invoice.js
├── routes/
│   └── invoices.routes.js
└── package.json
```

---

## 1️⃣ Invoice Model

### 📄 `models/Invoice.js`

```js
const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  rate: Number,
  amount: Number
});

const invoiceSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    items: [invoiceItemSchema],
    subTotal: Number,
    taxTotal: Number,
    grandTotal: Number,
    status: {
      type: String,
      enum: ["draft", "sent", "paid"],
      default: "draft"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
```

---

## 2️⃣ Invoice Routes

### 📄 `routes/invoices.routes.js`

```js
const express = require("express");
const router = express.Router();

const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const Item = require("../models/Item");

// ===============================
// POST – Create Invoice
// ===============================
router.post("/", async (req, res) => {
  try {
    const { customer, items } = req.body;

    // 1️⃣ Validate customer
    const customerExists = await Customer.findById(customer);
    if (!customerExists) {
      return res.status(400).json({ message: "Customer not found" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Invoice must have items" });
    }

    let invoiceItems = [];
    let subTotal = 0;
    let taxTotal = 0;

    // 2️⃣ Process items
    for (let line of items) {
      const itemData = await Item.findById(line.item);
      if (!itemData) {
        return res.status(400).json({ message: "Item not found" });
      }

      const amount = line.quantity * itemData.rate;
      const tax = itemData.isTaxable
        ? (amount * itemData.taxPercentage) / 100
        : 0;

      invoiceItems.push({
        item: itemData._id,
        quantity: line.quantity,
        rate: itemData.rate,
        amount
      });

      subTotal += amount;
      taxTotal += tax;
    }

    const invoice = new Invoice({
      customer,
      items: invoiceItems,
      subTotal,
      taxTotal,
      grandTotal: subTotal + taxTotal
    });

    const savedInvoice = await invoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      data: savedInvoice
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create invoice" });
  }
});

// ===============================
// GET – All Invoices
// ===============================
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer", "name")
      .populate("items.item", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
});

// ===============================
// GET – Invoice by ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("customer", "name")
      .populate("items.item", "name");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ message: "Invalid invoice ID" });
  }
});

module.exports = router;
```

---

## 3️⃣ Sample POST Invoice Request

```
POST /invoices
```

```json
{
  "customer": "CUSTOMER_ID",
  "items": [
    {
      "item": "ITEM_ID",
      "quantity": 2
    }
  ]
}
```

---

## 4️⃣ Sample Invoice Response

```json
{
  "_id": "65fb456def",
  "customer": {
    "_id": "65fa123abc",
    "name": "Rahul Sharma"
  },
  "items": [
    {
      "item": {
        "_id": "65fa999xyz",
        "name": "USB Keyboard"
      },
      "quantity": 2,
      "rate": 750,
      "amount": 1500
    }
  ],
  "subTotal": 1500,
  "taxTotal": 270,
  "grandTotal": 1770,
  "status": "draft",
  "createdAt": "2025-01-01T10:30:00.000Z"
}
```

---

## 🧠 Important Points 

* Rates & tax come from **Item model**, not request
* Totals are **always calculated on backend**
* `populate()` is used for readable responses
* Invoice stores **snapshot values** (rate, amount)

---

## 🎓 Summary

> An invoice connects customers and items and calculates totals securely on the backend.

---

## 🔜 Optional Improvements (Advanced)

* Add invoice number (`INV-001`)
* Add PUT / DELETE invoice
* Prevent edits if status = paid
* Add pagination

