# 🧾 Invoices API

(Customers + Items + Calculations)

This version includes:

* Proper Mongoose models
* Backend calculations
* Validation checks
* Populate usage
* Clean structure

---

# 📁 Suggested Project Structure

```
accounting-app/
├── index.js
├── models/
│   ├── Customer.js
│   ├── Item.js
│   └── Invoice.js
├── routes/
│   └── invoices.routes.js
├── .env
└── package.json
```

---

# 1️⃣ Customer Model (Reference)

📄 `models/Customer.js`

```js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
```

---

# 2️⃣ Item Model (Reference)

📄 `models/Item.js`

```js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    isTaxable: { type: Boolean, required: true },
    taxPercentage: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
```

---

# 3️⃣ Invoice Model

📄 `models/Invoice.js`

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
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
```

---

# 4️⃣ Invoice Routes (Core Logic)

📄 `routes/invoices.routes.js`

```js
const express = require("express");
const router = express.Router();

const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const Item = require("../models/Item");


// ==========================================
// POST /invoices – Create Invoice
// ==========================================
router.post("/", async (req, res) => {
  try {
    const { customer, items } = req.body;

    // 1️⃣ Validate customer
    const existingCustomer = await Customer.findById(customer);
    if (!existingCustomer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Invoice must contain items" });
    }

    let invoiceItems = [];
    let subTotal = 0;
    let taxTotal = 0;

    // 2️⃣ Process each item
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

    const grandTotal = subTotal + taxTotal;

    const invoice = new Invoice({
      customer,
      items: invoiceItems,
      subTotal,
      taxTotal,
      grandTotal
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


// ==========================================
// GET /invoices – Get All Invoices
// ==========================================
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer", "name email")
      .populate("items.item", "name rate")
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
});


// ==========================================
// GET /invoices/:id – Get Invoice By ID
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("customer", "name email")
      .populate("items.item", "name rate");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: "Invalid invoice ID" });
  }
});

module.exports = router;
```

---

# 5️⃣ Register Routes in index.js

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

const invoiceRoutes = require("./routes/invoices.routes");
app.use("/invoices", invoiceRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# 🧮 Example POST Request

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

# 🧠 Important Points

✔ Always fetch item rate from DB
✔ Never trust frontend totals
✔ Always calculate tax on backend
✔ Store snapshot rate in invoice
✔ Use populate for readable response

---

# 🎓 One-Line Summary

> An invoice connects customers and items and calculates totals securely on the backend.
