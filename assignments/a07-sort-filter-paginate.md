# 📝 Assignment: Advanced Items API (Single Endpoint)

## 🎯 Objective

Create **one single GET endpoint**:

```
GET /items
```

That supports:

* ✅ Get all items
* ✅ Filtering
* ✅ Sorting
* ✅ Pagination

📌 Do NOT create multiple endpoints.

---

# 🧠 Business Context

This simulates a real accounting software like Zoho Books, where:

* Items can be filtered
* Sorted by rate or date
* Viewed page-by-page

---

# 📁 Suggested Project Structure

```
items-app/
├── index.js
├── models/
│   └── Item.js
├── routes/
│   └── items.routes.js
├── .env
└── package.json
```

---

# 📌 Item Model Fields

Use these essential fields:

| Field         | Type    |
| ------------- | ------- |
| name          | String  |
| rate          | Number  |
| unit          | String  |
| isTaxable     | Boolean |
| taxPercentage | Number  |
| isActive      | Boolean |
| createdAt     | Date    |

---

# 🧩 Requirements

---

## ✅ 1️⃣ Base Endpoint

```
GET /items
```

If no query parameters are provided:

* Return all items
* Sort by latest first

---

## ✅ 2️⃣ Filtering

Support filtering using query parameters:

| Feature                   | Example                 |
| ------------------------- | ----------------------- |
| Filter by name (wildcard) | `/items?name=USB`       |
| Filter by tax status      | `/items?isTaxable=true` |
| Filter by min rate        | `/items?minRate=1000`   |
| Filter by max rate        | `/items?maxRate=5000`   |

📌 Name filter must support partial search using `$regex`.

---

## ✅ 3️⃣ Sorting

Support sorting via:

```
/items?sortBy=rate&order=asc
/items?sortBy=createdAt&order=desc
```

Default:

```
sortBy = createdAt
order = desc
```

---

## ✅ 4️⃣ Pagination

Support pagination via:

```
/items?page=1&limit=5
```

Defaults:

```
page = 1
limit = 10
```

Response must include:

* totalItems
* totalPages
* currentPage
* data

---

# 🧪 Example Combined Requests

### 🔹 Get all

```
GET /items
```

### 🔹 Filter + Sort

```
GET /items?name=USB&sortBy=rate&order=asc
```

### 🔹 Filter + Pagination

```
GET /items?isTaxable=true&page=2&limit=5
```

### 🔹 Full Combination

```
GET /items?name=USB&minRate=1000&sortBy=rate&order=desc&page=1&limit=3
```

---

# 📦 Expected Response Format

```json
{
  "totalItems": 25,
  "totalPages": 5,
  "currentPage": 2,
  "data": [
    {
      "_id": "65fa123abc",
      "name": "USB Keyboard",
      "rate": 750
    }
  ]
}
```

---

# 🚦 Rules

✔ Must use only one GET endpoint
✔ Must use query parameters
✔ Must apply sorting before pagination
✔ Must convert numbers using `Number()`
✔ Must handle missing query parameters

---

# ⚠️ Common Mistakes to Avoid

❌ Creating `/items/search`
❌ Sorting after pagination
❌ Not validating numeric inputs
❌ Forgetting default values

