# 🛑 Rate Limiting in Express – Practice Tutorial

## 🎯 Learning Goals

By the end of this lab, students will:

- Understand what rate limiting is
- Install and configure rate limiting
- Apply it globally
- Apply it to specific routes
- Test and observe blocking behavior

---

# 🧠 What is Rate Limiting?

Rate limiting:

> Restricts how many requests a user can make within a specific time period.

Example:

- Only 5 requests per minute
- After that → block user temporarily

---

# 🛠 Lab Setup

---

## Step 1️⃣ – Create Project

```bash
mkdir rate-limit-demo
cd rate-limit-demo
npm init -y
npm install express express-rate-limit
```

---

## Step 2️⃣ – Create Basic Express App

📄 `index.js`

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rate Limit Practice" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Run:

```bash
node index.js
```

Test in browser:

```
http://localhost:3000
```

---

# 🔥 Step 3️⃣ – Add Rate Limiter

Modify `index.js`:

```js
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Create limiter
const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 3, // allow only 3 requests
  message: {
    message: "Too many requests. Please wait 30 seconds.",
  },
});

// Apply globally
app.use(limiter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rate Limit Practice" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# 🧪 Step 4️⃣ – Test It

1. Open browser
2. Refresh more than 3 times within 30 seconds

You will see:

```json
{
  "message": "Too many requests. Please wait 30 seconds."
}
```

🎉 Rate limiting is working.

---

# 🧠 What Just Happened?

- Server tracks IP address
- Counts requests
- After 3 → blocks for 30 seconds

---

# 🎯 Step 5️⃣ – Apply Rate Limit Only to Login Route

Update code:

```js
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

// Login limiter
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: {
    message: "Too many login attempts. Try again later.",
  },
});

app.get("/", (req, res) => {
  res.json({ message: "Home page – no limit" });
});

// Apply limiter only here
app.post("/login", loginLimiter, (req, res) => {
  res.json({ message: "Login attempt successful" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 🧪 Test Login Route

Use Thunder Client or Postman:

```
POST http://localhost:3000/login
```

After 2 attempts → blocked.

But `/` route still works.

---

# 🧠 Real-World Use Case

Rate limiting is commonly applied to:

- Login routes
- Password reset routes
- Public APIs
- OTP verification endpoints

---

# 📊 Understanding Important Options

```js
rateLimit({
  windowMs: 60000, // time window
  max: 5, // max requests
  message: "Blocked",
});
```

| Option   | Meaning                      |
| -------- | ---------------------------- |
| windowMs | Time window                  |
| max      | Max requests allowed         |
| message  | Response when limit exceeded |

---

# 🧪 Practice Exercises for Students

## Exercise 1

Change:

- `windowMs` to 10 seconds
- `max` to 5

Test behavior.

---

## Exercise 2

Create a new route:

```
GET /items
```

Apply rate limit only to this route.

---

## Exercise 3

Create:

```
GET /admin
```

Allow only 1 request per 20 seconds.

---

# 🎓 One-Line Student Rule

> Rate limiting controls how many times a user can call an API in a given time window.

---

# ⚠️ Important Notes

- Rate limiting is based on IP address
- It is not authentication
- It helps prevent brute-force attacks

---

# 🧠 Interview-Friendly Answer

> Rate limiting restricts the number of requests a client can make in a defined time window to prevent abuse and protect server resources.
