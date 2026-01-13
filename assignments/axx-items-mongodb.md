# 📝 Assignment 02: Items (Products) APIs with Validation

## 🎯 Objective

Create **CRUD APIs** for an **Items (Products)** resource used in an **accounting application**, using:

* Express.js
* MongoDB + Mongoose
* Validation middleware
* Clean routing structure
* Proper HTTP status codes

This assignment simulates **real-world item management** in software like **Zoho Books**.

---

## 🧠 Business Context (Explain to Students)

In accounting software, **Items** represent:

* Products sold
* Services offered
* Billable items in invoices

Each item has:

* Name
* Rate (price)
* Unit
* Taxability
* Active status

---

## 📁 Suggested Project Structure

```
items-crud-app/
├── index.js
├── models/
│   └── Item.js
├── routes/
│   └── items.routes.js
├── middlewares/
│   └── validateItem.js
├── .env
├── package.json
└── node_modules/
```

---

## 📌 Item (Product) Fields – Essential Only

| Field         | Type                 | Description           |
| ------------- | -------------------- | --------------------- |
| id            | Auto (MongoDB `_id`) | Unique identifier     |
| name          | String               | Item name             |
| rate          | Number               | Selling price         |
| unit          | String               | pcs, kg, hr, etc.     |
| isTaxable     | Boolean              | GST applicable or not |
| taxPercentage | Number               | 0, 5, 12, 18, 28      |
| isActive      | Boolean              | Item active/inactive  |
| createdAt     | Date                 | Auto-generated        |

---

## 🛠 Task Breakdown

---

## ✅ Task 1: Setup Project

1. Create Express project
2. Install dependencies:

```bash
npm install express mongoose validator dotenv
```

3. Enable JSON middleware
4. Connect MongoDB Atlas

---

## ✅ Task 2: Create Item Model (Mongoose)

### 📄 `models/Item.js`

Students must define:

* Schema with required fields
* Default values where applicable

📌 Requirements:

* `name` → required
* `rate` → required, positive number
* `unit` → required
* `isActive` → default `true`

---

## ✅ Task 3: Create Validation Middleware

### 📄 `middlewares/validateItem.js`

Validate the following:

| Field         | Validation Rule                     |
| ------------- | ----------------------------------- |
| name          | Required, min 2 characters          |
| rate          | Required, number > 0                |
| unit          | Required                            |
| isTaxable     | Must be boolean                     |
| taxPercentage | Required only if `isTaxable = true` |
| taxPercentage | Allowed values: 0, 5, 12, 18, 28    |

📌 If validation fails → return `400 Bad Request`

---

## ✅ Task 4: Create Routes for Items

### 📄 `routes/items.routes.js`

Implement the following APIs:

---

### 1️⃣ Create Item

**POST `/items`**

* Validate request body
* Save item to MongoDB
* Return `201 Created`

---

### 2️⃣ Get All Items

**GET `/items`**

* Fetch all items
* Return array (can be empty)

---

### 3️⃣ Get Item by ID

**GET `/items/:id`**

* If item exists → return item
* Else → `404 Not Found`

---

### 4️⃣ Update Item

**PUT `/items/:id`**

* Validate updated data
* Update item using Mongoose
* Return updated document

---

### 5️⃣ Delete Item

**DELETE `/items/:id`**

* Remove item from DB
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

## ❌ Sample Invalid JSON (For Testing)

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

## 🎯 Bonus Tasks (Optional – Extra Marks)

* Prevent duplicate item names
* Add pagination to GET `/items`
* Add search by item name
* Add soft delete using `isActive`
* Sort items by rate or name

---

## 📊 Evaluation Criteria (For Instructor)

| Criteria           | Marks |
| ------------------ | ----- |
| Folder structure   | ⭐⭐⭐   |
| CRUD functionality | ⭐⭐⭐⭐  |
| Validation logic   | ⭐⭐⭐⭐  |
| MongoDB usage      | ⭐⭐⭐   |
| Code readability   | ⭐⭐    |

---

## 🎓 One-Line Instruction for Students

> This assignment simulates how real accounting software manages products and services.
