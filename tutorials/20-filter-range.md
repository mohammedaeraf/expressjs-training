## 🎯 Filter Customers using Credit Limit Range

### Requirement

Search customers whose **creditLimit falls within a range**

Examples:

- Credit limit between **10,000 and 50,000**
- Greater than **25,000**
- Less than **1,00,000**

---

## 🧠 MongoDB Operators Used

| Operator | Meaning               |
| -------- | --------------------- |
| `$gte`   | Greater than or equal |
| `$lte`   | Less than or equal    |
| `$gt`    | Greater than          |
| `$lt`    | Less than             |

---

## ✅ API Design (Beginner-Friendly)

Use **query parameters**:

```
GET /customers?minCredit=10000&maxCredit=50000
```

---

## 📄 Complete Beginner-Level Code

### `routes/customers.routes.js`

```js
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// ===============================
// GET – Search Customers by Credit Limit Range
// ===============================
router.get("/", async (req, res) => {
  try {
    const { minCredit, maxCredit } = req.query;

    let filter = {};

    if (minCredit || maxCredit) {
      filter.creditLimit = {};
    }

    // Greater than or equal
    if (minCredit) {
      filter.creditLimit.$gte = Number(minCredit);
    }

    // Less than or equal
    if (maxCredit) {
      filter.creditLimit.$lte = Number(maxCredit);
    }

    const customers = await Customer.find(filter);

    res.status(200).json({
      totalResults: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search customers",
    });
  }
});

module.exports = router;
```

---

## 🧪 Example Requests & Results

### 🔹 Between 10,000 and 50,000

```
GET /customers?minCredit=10000&maxCredit=50000
```

---

### 🔹 Greater than 25,000

```
GET /customers?minCredit=25000
```

---

### 🔹 Less than 1,00,000

```
GET /customers?maxCredit=100000
```

---

## 🧠 How This Works (Simple Explanation)

```js
filter.creditLimit = {
  $gte: 10000,
  $lte: 50000,
};
```

Meaning:

> Return customers whose creditLimit is between 10,000 and 50,000.

---

## 🎓 One-Line Student Rule

> Use `$gte` and `$lte` to search numeric ranges in MongoDB.

---

## 🧠 Interview-Friendly Answer

> Range searches in MongoDB are implemented using comparison operators like `$gte` and `$lte`.

---

## ⚠️ Common Beginner Mistakes

❌ Treating numbers as strings
❌ Forgetting `Number()` conversion
❌ Creating multiple endpoints for range search
