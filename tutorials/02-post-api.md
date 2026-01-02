# 🧪 Lab 02: Creating a POST API with Express

## 🎯 **Objective**

By the end of this lab, students will:

* Understand what a POST request is
* Send data from client to server
* Read JSON data using `req.body`
* Test POST APIs using Thunder Client

---

## 🧠 Concept Recap (2 Minutes)

* **GET** → Fetch data
* **POST** → Send data to server
* POST data is usually sent as **JSON**

---

## 🛠 Prerequisites

* Lab 01 completed
* Express project already created
* Server running successfully

---

## 🔹 Step 1: Enable JSON Parsing Middleware

Open `index.js` and add **below app creation**:

```js
const express = require("express");
const app = express();

// Middleware to read JSON data
app.use(express.json());
```

📌 Without this, `req.body` will be `undefined`.

---

## 🔹 Step 2: Create a POST API

Add this **before `app.listen()`**:

```js
app.post("/users", (req, res) => {
  const userData = req.body;

  res.json({
    message: "User created successfully",
    user: userData
  });
});
```

---

## ▶️ Step 3: Restart Server

```bash
node index.js
```

(or `npm run dev` if using nodemon)

---

## 🔹 Step 4: Test POST API Using Thunder Client

### Steps in Thunder Client:

1. Open **Thunder Client**
2. Click **New Request**
3. Method → `POST`
4. URL:

```
http://localhost:3000/users
```

5. Go to **Body → JSON**
6. Enter:

```json
{
  "name": "Ameen",
  "email": "ameen@example.com",
  "age": 22
}
```

7. Click **Send**

---

## ✅ Expected Response

```json
{
  "message": "User created successfully",
  "user": {
    "name": "Ameen",
    "email": "ameen@example.com",
    "age": 22
  }
}
```

---

## 🧠 Understanding the Code

| Code                      | Meaning              |
| ------------------------- | -------------------- |
| `app.use(express.json())` | Reads JSON body      |
| `req.body`                | Data sent by client  |
| `res.json()`              | Sends JSON response  |
| `POST /users`             | Creates new resource |

---

## 🧪 Step 5: Add Validation (Simple Check)

Add this inside POST route:

```js
if (!userData.name || !userData.email) {
  return res.status(400).json({
    message: "Name and Email are required"
  });
}
```

Full route:

```js
app.post("/users", (req, res) => {
  const userData = req.body;

  if (!userData.name || !userData.email) {
    return res.status(400).json({
      message: "Name and Email are required"
    });
  }

  res.status(201).json({
    message: "User created successfully",
    user: userData
  });
});
```

---

## 🧪 Test Validation

Send:

```json
{
  "name": "Ameen"
}
```

Response:

```json
{
  "message": "Name and Email are required"
}
```

---

## 📌 Lab Assignment

1. Create a POST API `/login`
2. Accept:

```json
{
  "username": "admin",
  "password": "1234"
}
```

3. If username & password exist, return:

```json
{
  "message": "Login successful"
}
```

4. Else return status `400`
