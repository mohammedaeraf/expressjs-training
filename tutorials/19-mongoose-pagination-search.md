# 📘 Customer APIs – Pagination & Search (Stepwise)

> **Base Route:** `GET /customers`

---

## 1️⃣ ONLY Pagination

### 🎯 Goal

Fetch customers **page by page**, without search.

---

### 📄 Code: Pagination Only

```js
router.get("/pagination", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const customers = await Customer.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCustomers = await Customer.countDocuments();

    res.status(200).json({
      page,
      limit,
      totalCustomers,
      totalPages: Math.ceil(totalCustomers / limit),
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
});
```

### 🧪 Example Request

```
GET /customers/pagination?page=2&limit=5
```

---

## 2️⃣ ONLY Search

### 🎯 Goal

Search customers by **name, email, or phone**, without pagination.

---

### 📄 Code: Search Only

```js
router.get("/search", async (req, res) => {
  try {
    const search = req.query.search || "";

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    const customers = await Customer.find(filter);

    res.status(200).json({
      totalResults: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
    });
  }
});
```

### 🧪 Example Request

```
GET /customers/search?search=rahul
```

---

## 3️⃣ PAGINATION + SEARCH (Real-World API)

### 🎯 Goal

Combine **search + pagination** (used in real applications).

---

### 📄 Code: Pagination + Search

```js
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    const customers = await Customer.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCustomers = await Customer.countDocuments(filter);

    res.status(200).json({
      page,
      limit,
      search,
      totalCustomers,
      totalPages: Math.ceil(totalCustomers / limit),
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
});
```

### 🧪 Example Requests

```
GET /customers?page=1&limit=5
```

```
GET /customers?search=gmail
```

```
GET /customers?page=2&limit=3&search=rahul
```

---

## 🧠 Teaching Breakdown (Very Important)

| Feature     | MongoDB Method       |
| ----------- | -------------------- |
| Pagination  | `skip()` + `limit()` |
| Search      | `$regex`             |
| Total Count | `countDocuments()`   |
| Sorting     | `sort()`             |

---

## 🎓 One-Line Student Rule

> Pagination controls **how many records**, search controls **which records**.

---

## ⚠️ Common Beginner Mistakes

❌ Forgetting `parseInt()`
❌ Applying `countDocuments()` without filter
❌ Returning full data without pagination info
