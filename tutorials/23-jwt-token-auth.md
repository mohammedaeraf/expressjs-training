# 🔐 JWT Authentication in Express.js – Beginner Tutorial

## 🎯 What You Will Learn

By the end of this tutorial, you will:

- Understand **what JWT is and why it is used**
- Implement **Login API**
- Generate **JWT tokens**
- Protect APIs using **JWT middleware**
- Access **secured routes**

---

## 1️⃣ What is Authentication?

**Authentication** answers one question:

> ❓ _Who is the user?_

Examples:

- Login using email & password
- API verifies credentials
- Server allows or denies access

---

## 2️⃣ What is JWT?

**JWT** = **JSON Web Token**

A JWT is:

- A **secure token**
- Sent by server after login
- Stored by frontend
- Sent with every protected request

📌 JWT is **stateless** (no session stored on server).

---

## 3️⃣ Why JWT is Popular

✔ Scalable
✔ Works well with APIs
✔ No server-side session storage
✔ Used in React, Angular, Mobile apps

---

## 4️⃣ How JWT Works (Flow)

```
User logs in
   ↓
Server verifies credentials
   ↓
JWT token generated
   ↓
Frontend stores token
   ↓
Token sent in Authorization header
   ↓
Server verifies token
   ↓
Access granted
```

---

## 5️⃣ Install Required Libraries

```bash
npm install jsonwebtoken bcrypt dotenv
```

| Package      | Purpose               |
| ------------ | --------------------- |
| jsonwebtoken | Create & verify JWT   |
| bcrypt       | Hash passwords        |
| dotenv       | Environment variables |

---

## 6️⃣ Create User Model

### 📄 `models/User.js`

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
```

📌 Password must **never** be stored as plain text.

---

## 7️⃣ Hash Password Before Saving

### 📄 `routes/auth.routes.js` (Register API)

```js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Registration failed" });
  }
});
```

---

## 8️⃣ Create Login API (Generate JWT)

```js
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
```

---

## 9️⃣ Add JWT Secret

### 📄 `.env`

```env
JWT_SECRET=supersecretkey123
```

📌 Never commit this to GitHub.

---

## 🔟 How Token is Sent from Frontend

Every protected request must include:

```
Authorization: Bearer <JWT_TOKEN>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 1️⃣1️⃣ Create JWT Middleware (Protect APIs)

### 📄 `middlewares/authMiddleware.js`

```js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

---

## 1️⃣2️⃣ Protect a Route Using JWT

```js
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});
```

---

## 🧪 Testing JWT Flow (Thunder Client)

### Step 1: Login

```
POST /login
```

➡️ Copy token

### Step 2: Access protected route

```
GET /profile
Authorization: Bearer <token>
```

✔ Access granted

---

## ⚠️ Common Beginner Mistakes

❌ Storing password in plain text
❌ Forgetting `Bearer` keyword
❌ Sending token in body instead of headers
❌ Not handling token expiry

---

## 🎓 Summary

> JWT allows stateless authentication by securely sending a token with every request.

---

## 🧠 Interview-Friendly Answer

> JWT is a stateless authentication mechanism where the server issues a signed token that the client sends with each request for authorization.
