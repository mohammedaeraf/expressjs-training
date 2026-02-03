# 🔐 Securing Express APIs – Beginner Tutorial

## 🎯 What You Will Learn

By the end of this tutorial, you will:
 
* Understand **why API security is important**
* Identify **common security risks**
* Apply **basic security best practices** in Express
* Protect APIs using **middleware**
* Prepare APIs for **production use**

---

## 1️⃣ Why Do We Need to Secure APIs?

APIs are exposed to the internet and can be:

* Misused
* Attacked
* Overloaded
* Accessed by unauthorized users

📌 **Unsecured APIs can lead to:**

* Data leaks
* Unauthorized access
* Server crashes
* Financial loss

---

## 2️⃣ Common Security Risks (Beginner View)

| Risk                | Example                 |
| ------------------- | ----------------------- |
| Unauthorized access | Anyone can delete data  |
| Malicious requests  | Invalid or harmful data |
| Too many requests   | Server overload         |
| Exposed secrets     | DB password in code     |
| CORS misuse         | Any website calling API |

---

## 3️⃣ Basic Security Checklist (Must Follow)

✔ Use environment variables
✔ Validate input data
✔ Limit request size
✔ Enable CORS properly
✔ Hide sensitive fields
✔ Add authentication (later stage)

---

## 4️⃣ Use Environment Variables (VERY IMPORTANT)

### ❌ Wrong (Insecure)

```js
mongoose.connect("mongodb+srv://user:pass@cluster");
```

### ✅ Correct (Secure)

#### Install dotenv

```bash
npm install dotenv
```

#### `.env`

```env
MONGO_URL=mongodb+srv://user:pass@cluster
```

#### Use in code

```js
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
```

📌 Never push `.env` to GitHub.

---

## 5️⃣ Input Validation (First Line of Defense)

### Why?

To prevent:

* Invalid data
* Injection attacks
* App crashes

### Example Validation Middleware

```js
module.exports = (req, res, next) => {
  const { name, rate } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: "Invalid name" });
  }

  if (rate === undefined || rate <= 0) {
    return res.status(400).json({ message: "Invalid rate" });
  }

  next();
};
```

📌 Never trust frontend data.

---

## 6️⃣ Limit Request Body Size

Prevents **large payload attacks**.

```js
app.use(express.json({ limit: "10kb" }));
```

✔ Blocks unusually large requests
✔ Protects memory

---

## 7️⃣ Enable CORS Properly

### ❌ Insecure

```js
app.use(cors());
```

### ✅ Secure

```js
app.use(cors({
  origin: "http://localhost:5173"
}));
```

📌 Allow only trusted frontends.

---

## 8️⃣ Hide Sensitive Fields from Response

Example: Remove `__v`

```js
schema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});
```

📌 Clean API responses = safer APIs.

---

## 9️⃣ Use HTTP Status Codes Correctly

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 201  | Created      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 500  | Server Error |

📌 Never return `200` for errors.

---

## 🔟 Prevent Too Many Requests (Rate Limiting)

### Install rate limiter

```bash
npm install express-rate-limit
```

### Apply globally

```js
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

✔ Protects from brute-force attacks
✔ Prevents server abuse

---

## 1️⃣1️⃣ Secure Headers (Helmet)

### Install Helmet

```bash
npm install helmet
```

### Use in app

```js
const helmet = require("helmet");
app.use(helmet());
```

📌 Helmet adds security-related HTTP headers automatically.

---

## 1️⃣2️⃣ Error Handling (Do Not Leak Details)

### ❌ Insecure

```js
res.json(error);
```

### ✅ Secure

```js
res.status(500).json({
  message: "Something went wrong"
});
```

📌 Never expose stack traces in production.

---

## 1️⃣3️⃣ Authentication (High-Level Intro)

Authentication ensures:

* Only logged-in users access APIs

Common methods:

* JWT (most common)
* Sessions
* OAuth

📌 Authentication is usually taught **after this tutorial**.

---

## 🧠 Beginner Security Flow

```
Request
 ↓
Validation
 ↓
Auth (later)
 ↓
Controller
 ↓
Response
```

---

## ⚠️ Common Beginner Mistakes

❌ Trusting frontend
❌ Hardcoding secrets
❌ Returning raw errors
❌ No validation
❌ Allowing all origins

---

## 🎓 One-Line Summary for Students

> API security starts with validation, configuration, and safe defaults.

---

## 🧠 Interview-Friendly Answer

> Express API security involves validating input, protecting secrets, limiting requests, enabling secure headers, and controlling access.