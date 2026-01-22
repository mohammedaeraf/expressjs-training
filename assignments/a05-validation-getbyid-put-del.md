# 📝 Assignment 05: Items API – Validation + Full CRUD (Mongoose)

## 🎯 Objective

Enhance the existing **Items (Products) API** by adding:

- Validation middleware
- GET Item by ID
- Update Item (PUT)
- Delete Item (DELETE)

This assignment mirrors **real-world backend development** in accounting software like **Zoho Books**.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Validator (for validation)

---

## 📁 Suggested Project Structure

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
└── node_modules/
```

---

## 📌 Item Model (Reference Fields)

Use the **same model** from Assignment 02.

| Field         | Type    | Required    |
| ------------- | ------- | ----------- |
| name          | String  | ✅          |
| rate          | Number  | ✅          |
| unit          | String  | ✅          |
| isTaxable     | Boolean | ✅          |
| taxPercentage | Number  | Conditional |
| isActive      | Boolean | Optional    |

---

## 🧩 Tasks to Complete

---

## ✅ Task 1: Add Validation Middleware

### 📄 `middlewares/validateItem.js`

Students must validate:

| Field         | Rule                             |
| ------------- | -------------------------------- |
| name          | Required, min 2 characters       |
| rate          | Required, number > 0             |
| unit          | Required                         |
| isTaxable     | Must be boolean                  |
| taxPercentage | Required if `isTaxable = true`   |
| taxPercentage | Allowed values: 0, 5, 12, 18, 28 |

📌 On validation failure → return `400 Bad Request`

---

## ✅ Task 2: Apply Validation Middleware

Apply validation to:

- **POST `/items`**
- **PUT `/items/:id`**

Validation must run **before controller logic**.

---

## ✅ Task 3: GET Item by ID

### Endpoint

```
GET /items/:id
```

### Requirements

- Fetch item using `findById`
- If item exists → return item
- If not found → return `404 Not Found`
- Handle invalid ObjectId gracefully

---

## ✅ Task 4: Update Item (PUT)

### Endpoint

```
PUT /items/:id
```

### Requirements

- Validate request body
- Update item using Mongoose
- Return updated item
- If item not found → `404 Not Found`

📌 Use:

```js
findByIdAndUpdate();
```

---

## ✅ Task 5: Delete Item (DELETE)

### Endpoint

```
DELETE /items/:id
```

### Requirements

- Delete item using `findByIdAndDelete`
- If item exists → delete and return success message
- If item not found → `404 Not Found`

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

## ❌ Sample Invalid Item JSON

```json
{
  "name": "",
  "rate": -200,
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
| Item fetched     | 200    |
| Item updated     | 200    |
| Item deleted     | 200    |
| Validation error | 400    |
| Item not found   | 404    |

---

## 🧠 Rules to Follow (Important)

- Do NOT store data in arrays
- Use **Mongoose only**
- Do NOT define `_id` manually
- Use middleware properly
- Handle invalid IDs without crashing server

---

> This assignment teaches how real APIs validate, update, and safely delete data.
