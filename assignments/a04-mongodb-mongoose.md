# 📝 Assignment: Items API (POST & GET using Mongoose)

## 🎯 Objective

Create **POST** and **GET** APIs for an **Items (Products)** resource using:

* Express.js
* MongoDB
* Mongoose

This simulates how **accounting software (like Zoho Books)** stores and retrieves items.

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (local or Atlas)
* Mongoose

---

## 📁 Suggested Project Structure

```
items-mongoose-app/
├── index.js
├── models/
│   └── Item.js
├── routes/
│   └── items.routes.js
├── .env
├── package.json
└── node_modules/
```

---

## 📌 Item Model (Fields to Use)

Use **only essential accounting fields**.

| Field         | Type    | Required |
| ------------- | ------- | -------- |
| name          | String  | ✅        |
| rate          | Number  | ✅        |
| unit          | String  | ✅        |
| isTaxable     | Boolean | ✅        |
| taxPercentage | Number  | Optional |
| isActive      | Boolean | Optional |

---

## 🧩 Tasks to Complete

---

## ✅ Task 1: Setup Project

1. Create Express project
2. Install dependencies:

```bash
npm install express mongoose dotenv
```

3. Enable JSON parsing
4. Connect MongoDB using Mongoose

---

## ✅ Task 2: Create Item Model

### 📄 `models/Item.js`

Students must:

* Create a Mongoose schema
* Enable timestamps
* Export the model

📌 Model name: **Item**
📌 Collection name: **items** (auto-generated)

---

## ✅ Task 3: Create POST API (Create Item)

### Endpoint

```
POST /items
```

### Requirements

* Read data from `req.body`
* Create a new Item document
* Save it using `save()`
* Return `201 Created`

---

### 📦 Sample Request Body

```json
{
  "name": "Wireless Mouse",
  "rate": 1200,
  "unit": "pcs",
  "isTaxable": true,
  "taxPercentage": 18
}
```

---

## ✅ Task 4: Create GET API (Fetch Items)

### Endpoint

```
GET /items
```

### Requirements

* Fetch all items using `find()`
* Return an array of items
* Return empty array if no items exist

---

## 🧪 Sample GET Response

```json
[
  {
    "_id": "65fa123abc",
    "name": "Wireless Mouse",
    "rate": 1200,
    "unit": "pcs",
    "isTaxable": true,
    "taxPercentage": 18,
    "createdAt": "2025-01-01T10:30:00.000Z"
  }
]
```

---

## 🚦 Expected HTTP Status Codes

| Operation        | Status |
| ---------------- | ------ |
| Item created     | 201    |
| Fetch success    | 200    |
| Validation error | 400    |
| Server error     | 500    |

---

## 🧠 Rules to Follow (Important)

* Do **NOT** store data in arrays
* Use **Mongoose model only**
* Do **NOT** define `_id`
* Do **NOT** hardcode MongoDB URL
* Use environment variables

---

## 🎯 Bonus Tasks (Optional)

* Add `isActive` default value
* Sort items by `createdAt` (latest first)
* Hide `__v` field from response

---

> This assignment teaches how real backend applications store and retrieve data using MongoDB.
