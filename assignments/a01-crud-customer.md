# 📝 Assignment: Customer CRUD APIs with Validation (In-Memory)

## 🎯 Objective

Create a set of **CRUD APIs** for a **Customer entity** using:

- **Express.js**
- **In-memory data (array)**
- **Validation using `validator` library**
- Proper **HTTP status codes**

---

## 🧠 Scenario

You are building a **simple accounting backend**.
Customers can be added, viewed, updated, and deleted.

⚠️ Data will be stored **in memory** (no database).

---

## 🛠️ Requirements

### 🔹 Tech Stack

- Node.js
- Express.js
- validator
- Thunder Client / Postman (for testing)

---

## 📁 Suggested Project Structure

```
customer-crud-app/
├── index.js
├── routes/
│   └── customers.routes.js
├── middlewares/
│   └── validateCustomer.js
├── package.json
└── node_modules/
```

---

## 📌 Customer Fields

| Field       | Rules                  |
| ----------- | ---------------------- |
| id          | Auto-generated number  |
| name        | Required, min 3 chars  |
| email       | Required, valid email  |
| phone       | Required, valid mobile |
| age         | 18–100                 |
| dateOfBirth | Valid date, not future |
| creditLimit | Positive number        |
| gstNumber   | Optional, valid GST    |

---

## 🧪 Tasks to Implement

### ✅ Task 1: Setup Express App

- Initialize Node project
- Install dependencies:

```bash
npm install express validator
```

- Enable JSON parsing middleware

---

### ✅ Task 2: In-Memory Data Store

Create an array to store customers:

```js
let customers = [];
```

---

### ✅ Task 3: Validation Middleware

Create middleware to validate:

- name
- email
- phone
- age
- dateOfBirth
- creditLimit
- gstNumber

📌 If validation fails → return `400 Bad Request`

---

### ✅ Task 4: Create APIs (CRUD)

#### 1️⃣ Create Customer

**POST /customers**

- Validate request body
- Generate `id`
- Add customer to array
- Return `201 Created`

---

#### 2️⃣ Get All Customers

**GET /customers**

- Return all customers
- Return empty array if none

---

#### 3️⃣ Get Customer by ID

**GET /customers/:id**

- If customer exists → return data
- Else → `404 Not Found`

---

#### 4️⃣ Update Customer

**PUT /customers/:id**

- Update allowed fields
- Re-validate updated data
- If customer not found → `404`

---

#### 5️⃣ Delete Customer

**DELETE /customers/:id**

- Remove customer from array
- Return success message

---

## 📄 Sample Valid Customer JSON

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "age": 30,
  "dateOfBirth": "1994-05-12",
  "creditLimit": 50000,
  "gstNumber": "29ABCDE1234F1Z5"
}
```

---

## 🚦 Expected Status Codes

| API                | Status |
| ------------------ | ------ |
| POST success       | 201    |
| Validation error   | 400    |
| Customer not found | 404    |
| GET success        | 200    |
| DELETE success     | 200    |

---

## 🧪 Testing Instructions

Students must test:

- Valid request
- Missing required fields
- Invalid email
- Invalid age
- Future dateOfBirth
- Invalid ID

📌 Use **Thunder Client** pr **Postman** collections.

---

> “This assignment simulates how real accounting software validates and manages customers.”
