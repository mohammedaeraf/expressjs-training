# 📝 Assignment 02: Items (Products) APIs with Validation

## 🎯 Objective

Create **CRUD APIs** for an **Items (Products)** resource used in an **accounting application**, using:

* Express.js
* In-memory data (`JavaScript array`)
* Validation middleware
* Clean routing structure
* Proper HTTP status codes

This simulates **item management** in software like **Zoho Books**, without a database.

---

## 🧠 Business Context

Items represent:

* Products
* Services
* Billable entries in invoices

---

## 📁 Suggested Project Structure

```
items-crud-app/
├── index.js
├── routes/
│   └── items.routes.js
├── middlewares/
│   └── validateItem.js
├── package.json
└── node_modules/
```

---

## 📌 Item (Product) Fields – Essential Only

| Field         | Type    | Description       |
| ------------- | ------- | ----------------- |
| id            | Number  | Auto-generated    |
| name          | String  | Item name         |
| rate          | Number  | Selling price     |
| unit          | String  | pcs, kg, hr       |
| isTaxable     | Boolean | GST applicable    |
| taxPercentage | Number  | 0, 5, 12, 18, 28  |
| isActive      | Boolean | Active / Inactive |
| createdAt     | Date    | Auto-generated    |

---

## 🛠 Task Breakdown

---

## ✅ Task 1: Setup Express Project

1. Initialize Node project
2. Install dependencies:

```bash
npm install express validator
```

3. Enable JSON middleware

---

## ✅ Task 2: Create In-Memory Data Store

Inside `items.routes.js`:

```js
let items = [];
```

IDs must be **auto-incremented**.

---

## ✅ Task 3: Create Validation Middleware

### 📄 `middlewares/validateItem.js`

Validate:

| Field         | Rule                           |
| ------------- | ------------------------------ |
| name          | Required, min 2 chars          |
| rate          | Required, number > 0           |
| unit          | Required                       |
| isTaxable     | Must be boolean                |
| taxPercentage | Required if `isTaxable = true` |
| taxPercentage | Allowed: 0, 5, 12, 18, 28      |

📌 On failure → return `400 Bad Request`

---

## ✅ Task 4: Create Routes for Items

### 📄 `routes/items.routes.js`

---

### 1️⃣ Create Item

**POST `/items`**

* Validate request body
* Generate `id`
* Add item to array
* Return `201 Created`

---

### 2️⃣ Get All Items

**GET `/items`**

* Return all items
* Return empty array if none

---

### 3️⃣ Get Item by ID

**GET `/items/:id`**

* If item exists → return item
* Else → `404 Not Found`

---

### 4️⃣ Update Item

**PUT `/items/:id`**

* Validate updated data
* Update item in array
* If item not found → `404`

---

### 5️⃣ Delete Item

**DELETE `/items/:id`**

* Remove item from array
* Return success message

---

## 🧪 Sample Valid Item JSON

```json
{
  "name": "USB Keyboard",
  "rate": 750,
  "unit": "pcs",
  "isTaxable": true,
  "taxPercentage": 18,
  "isActive": true
}
```

---

## ❌ Sample Invalid JSON

```json
{
  "name": "",
  "rate": -100,
  "unit": "",
  "isTaxable": true,
  "taxPercentage": 10
}
```

Expected response:

```json
{
  "message": "Invalid item data"
}
```

---

## 🚦 Expected HTTP Status Codes

| Scenario         | Status |
| ---------------- | ------ |
| Item created     | 201    |
| Validation error | 400    |
| Item not found   | 404    |
| Fetch success    | 200    |
| Delete success   | 200    |

---

## 🎯 Bonus Tasks (Optional)

* Prevent duplicate item names
* Add pagination to GET `/items`
* Add search by name
* Add soft delete using `isActive`
* Sort items by rate

---

## 📊 Evaluation Criteria

| Criteria     | Marks |
| ------------ | ----- |
| Structure    | ⭐⭐⭐   |
| CRUD APIs    | ⭐⭐⭐⭐  |
| Validation   | ⭐⭐⭐⭐  |
| Code quality | ⭐⭐    |

---

## 🎓 One-Line Instruction for Students

> This assignment helps you understand backend logic before using databases.