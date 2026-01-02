# 🧪 Lab 03: GET + POST (In-Memory CRUD with Express)

## 🎯 **Objective**

By the end of this lab, students will:

* Store data temporarily in memory (array)
* Create **GET** and **POST** APIs
* Understand basic **CRUD** operations
* Prepare for MongoDB integration

---

## 🧠 What is In-Memory Data?

* Data stored in a JavaScript array
* Lost when server restarts
* Used for learning before databases

📌 Example:

```js
let users = [];
```

---

## 🛠 Prerequisites

* Lab 01 & Lab 02 completed
* Express server running
* Thunder Client installed

---

## 📁 Project Structure

```
express-basic-app/
├── node_modules/
├── package.json
└── index.js
```

---

## 🔹 Step 1: Create In-Memory Data Store

Open `index.js` and add **below `app.use(express.json())`**:

```js
let users = [];
```

---

## 🔹 Step 2: POST API – Create User

```js
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});
```

---

## 🔹 Step 3: GET API – Fetch All Users

```js
app.get("/users", (req, res) => {
  res.json(users);
});
```

---

## ▶️ Step 4: Restart Server

```bash
node index.js
```

(or `npm run dev`)

---

## 🧪 Step 5: Test APIs Using Thunder Client

### 🔸 Create User (POST)

```
POST http://localhost:3000/users
```

Body → JSON:

```json
{
  "name": "Ameen",
  "email": "ameen@example.com"
}
```

---

### 🔸 Get Users (GET)

```
GET http://localhost:3000/users
```

Response:

```json
[
  {
    "id": 1,
    "name": "Ameen",
    "email": "ameen@example.com"
  }
]
```

---

## 🔹 Step 6: GET User by ID

```js
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
});
```

Test:

```
GET http://localhost:3000/users/1
```

---

## 🧠 CRUD Mapping

| Operation | HTTP Method | Endpoint     |
| --------- | ----------- | ------------ |
| Create    | POST        | `/users`     |
| Read All  | GET         | `/users`     |
| Read One  | GET         | `/users/:id` |

---

## 🧪 Step 7: Add Simple Update (PUT)

```js
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name) user.name = name;
  if (email) user.email = email;

  res.json({
    message: "User updated successfully",
    user
  });
});
```

---

## 🧪 Step 8: Add Delete API

```js
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  users = users.filter(u => u.id !== userId);

  res.json({
    message: "User deleted successfully"
  });
});
```

---

## 📄 Final `index.js` (Complete)

```js
const express = require("express");
const app = express();

app.use(express.json());

let users = [];

// CREATE
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});

// READ ALL
app.get("/users", (req, res) => {
  res.json(users);
});

// READ ONE
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json({ message: "User updated", user });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## 📌 Lab Assignment (Student Task)

1. Create a new resource: `products`
2. Fields:

   * id
   * name
   * price
3. Implement:

   * POST `/products`
   * GET `/products`
   * GET `/products/:id`