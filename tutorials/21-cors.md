# 🌐 CORS in Express.js – Beginner Tutorial

## 🎯 What You Will Learn

By the end of this tutorial, you will:

- Understand **what CORS is**
- Know **why browsers block API requests**
- Identify **when CORS is required**
- Enable CORS in an **Express application**
- Fix common CORS errors

---

## 1️⃣ What is CORS?

**CORS** = **Cross-Origin Resource Sharing**

📌 In simple words:

> CORS is a browser security rule that controls which frontend applications can access your backend APIs.

---

## 2️⃣ What is an “Origin”?

An **origin** is defined by:

```
Protocol + Domain + Port
```

### Examples:

| URL                     | Origin           |
| ----------------------- | ---------------- |
| `http://localhost:3000` | One origin       |
| `http://localhost:5173` | Different origin |
| `https://example.com`   | Different origin |

⚠️ Even different **ports** mean different origins.

---

## 3️⃣ When Does CORS Problem Occur?

### Common Development Setup

```
Frontend (React) → http://localhost:5173
Backend (Express) → http://localhost:3000
```

📌 These are **different origins**
➡️ Browser blocks the request ❌

---

## 4️⃣ Typical CORS Error Message

```
Access to fetch at 'http://localhost:3000/customers'
from origin 'http://localhost:5173'
has been blocked by CORS policy
```

👉 This error is thrown by the **browser**, not Express.

---

## 5️⃣ Important Clarification (Very Important for Students)

| Tool           | Needs CORS? |
| -------------- | ----------- |
| Browser        | ✅ Yes      |
| Postman        | ❌ No       |
| Thunder Client | ❌ No       |
| Curl           | ❌ No       |

📌 CORS is enforced **only by browsers**.

---

## 6️⃣ Why Browsers Enforce CORS?

Security reasons:

- Prevent malicious websites
- Protect user data
- Stop unauthorized API access

---

## 7️⃣ How Do We Fix CORS in Express?

👉 **CORS must be enabled on the backend (Express)**
❌ Not in frontend

---

## 8️⃣ Enable CORS in Express (Recommended Way)

### 📦 Step 1: Install CORS Package

```bash
npm install cors
```

---

### 📄 Step 2: Use CORS Middleware

```js
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.get("/customers", (req, res) => {
  res.json([
    { id: 1, name: "Rahul" },
    { id: 2, name: "Ameen" },
  ]);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

✅ Now frontend apps can access APIs.

---

## 9️⃣ Allow Only Specific Frontend (Best Practice)

Instead of allowing everyone:

```js
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
```

✔ Only React app allowed
❌ Others blocked

---

## 🔒 10️⃣ Allow Multiple Frontends

```js
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
  }),
);
```

---

## 1️⃣1️⃣ CORS for Specific Routes Only

```js
app.get("/customers", cors(), (req, res) => {
  res.json([]);
});
```

📌 Useful for public APIs.

---

## 1️⃣2️⃣ What Happens Behind the Scenes?

Browser sends:

```
Origin: http://localhost:5173
```

Express replies with:

```
Access-Control-Allow-Origin: http://localhost:5173
```

If origin matches → request allowed ✅
If not → blocked ❌

---

## 1️⃣3️⃣ Common Beginner Mistakes

❌ Trying to fix CORS in frontend
❌ Expecting Postman error to mean CORS issue
❌ Forgetting to install `cors` package
❌ Enabling CORS after routes

📌 Always enable CORS **before routes**.

---

## 1️⃣4️⃣ One-Line Rule for Students

> If frontend and backend run on different origins, CORS must be enabled on the backend.

---

## 🧠 Interview-Friendly Answer

> CORS is a browser security mechanism that restricts cross-origin requests, and it is enabled on the server using appropriate response headers.

---

## 🧪 Mini Practice Task

1. Create a GET `/test` API
2. Call it from browser fetch
3. Observe CORS error
4. Enable CORS
5. Verify fix
