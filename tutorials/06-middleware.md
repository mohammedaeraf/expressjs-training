# 🧩 Middleware in Express.js

## 🎯 What You Will Learn

By the end of this tutorial, you will:

* Understand **what middleware is**
* Know **why middleware is important**
* Create a **simple validation middleware**
* Use middleware in an Express route

---

## 🤔 What is Middleware?

In Express.js, **middleware is a function that runs between the request and the response**.

📌 Simple definition:

> **Middleware is code that executes before your API sends a response.**

---

## 🛣️ Request Flow (Very Important Concept)

```
Client Request
      ↓
Middleware
      ↓
Route Handler
      ↓
Response
```

Middleware can:

* Check data
* Modify request or response
* Stop the request
* Allow it to continue

---

## 🧠 Real-Life Analogy

Think of middleware like **security at a building entrance**:

* If rules are followed → allow entry
* If rules fail → stop entry

---

## 🧩 What Does a Middleware Function Look Like?

```js
(req, res, next) => {
  // logic here
}
```

| Parameter | Meaning             |
| --------- | ------------------- |
| `req`     | Request from client |
| `res`     | Response to client  |
| `next()`  | Move to next step   |

📌 If you **don’t call `next()`**, the request **stops there**.

---

## 🧪 Example 1: Simple Logging Middleware

```js
const logger = (req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
};
```

Usage:

```js
app.use(logger);
```

👉 Runs for **every request**

---

## ✅ Why Do We Use Middleware?

| Use Case       | Example               |
| -------------- | --------------------- |
| Validation     | Check required fields |
| Authentication | Verify token          |
| Logging        | Log requests          |
| Security       | CORS, rate-limit      |
| Parsing        | JSON body parsing     |

---

## 🧪 Example 2: Simple Validation Middleware (Beginner)

### 🎯 Goal

Validate that `name` and `email` exist in request body.

---

## 📄 Step 1: Create Validation Middleware

Create file:

```
middlewares/validateCustomer.js
```

### ✨ `validateCustomer.js`

```js
const validateCustomer = (req, res, next) => {
  const { name, email } = req.body;

  // Check name
  if (!name) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  // Check email
  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    });
  }

  // ✅ All checks passed
  next();
};

module.exports = validateCustomer;
```

---

## 🔗 Step 2: Use Middleware in Route

### 📄 `routes/customers.routes.js`

```js
const express = require("express");
const router = express.Router();
const validateCustomer = require("../middlewares/validateCustomer");

router.post("/", validateCustomer, (req, res) => {
  res.status(201).json({
    message: "Customer created successfully",
    data: req.body
  });
});

module.exports = router;
```

---

## 🧪 Step 3: Test Using Thunder Client

### ❌ Invalid Request

```json
{
  "email": "test@gmail.com"
}
```

Response:

```json
{
  "message": "Name is required"
}
```

---

### ✅ Valid Request

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

Response:

```json
{
  "message": "Customer created successfully",
  "data": {
    "name": "Rahul",
    "email": "rahul@gmail.com"
  }
}
```

---

## 🧠 Key Rules

1. Middleware runs **before route logic**
2. `return res.status()` → stops request
3. `next()` → allows request to continue
4. One middleware can be reused across many routes

---

## 🎓 One-Line Summary

> Middleware is a function that executes before the final route handler to process or validate requests.
