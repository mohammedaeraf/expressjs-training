# 🔐 Introduction to JWT (JSON Web Token)

## 🎯 What You Will Learn

By the end of this tutorial, you will:

- Understand what JWT is
- Know why JWT is used
- Understand JWT architecture
- See how JWT fits into Express apps
- Learn the complete authentication flow

---

# 1️⃣ What is JWT?

JWT (JSON Web Token) is a **secure token-based authentication mechanism**.

It allows:

✔ Stateless authentication
✔ Secure data exchange
✔ Protected API access

---

# 2️⃣ Why Do We Need JWT?

Without JWT:

- Server stores sessions
- Hard to scale
- More memory usage

With JWT:

- No session storage
- Token contains user identity
- Scales easily

---

# 3️⃣ JWT Architecture Overview

## 🧠 High-Level Architecture

```
+-------------+        Login Request        +-------------+
|             | --------------------------> |             |
|  React App  |                             |  Express    |
|  (Client)   | <-------------------------- |  Server     |
|             |       JWT Token              |             |
+-------------+                              +-------------+
        |                                              |
        |                                              |
        |        Protected API Request                 |
        |--------------------------------------------->|
        |   Authorization: Bearer <token>              |
        |                                              |
        | <-------------------------------------------|
        |       Protected Data (if token valid)        |
```

---

# 4️⃣ Step-by-Step JWT Flow

## Step 1 – User Logs In

```
POST /auth/login
```

User sends:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

---

## Step 2 – Server Verifies Credentials

- Check user exists
- Compare password
- If valid → generate JWT

---

## Step 3 – Server Generates JWT

Token contains:

- User ID
- Expiry time
- Signature

Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 4 – Client Stores Token

Usually stored in:

- Memory
- LocalStorage (basic apps)
- HTTP-only cookies (secure apps)

---

## Step 5 – Client Accesses Protected Route

Client sends:

```
GET /customers
Authorization: Bearer <token>
```

---

## Step 6 – Server Verifies Token

If valid:
✔ Access granted

If invalid:
❌ 401 Unauthorized

---

# 5️⃣ JWT Internal Structure

A JWT has **3 parts** separated by dots:

```
HEADER.PAYLOAD.SIGNATURE
```

Example:

```
xxxxx.yyyyy.zzzzz
```

---

## 🔹 Header

Contains:

- Algorithm used
- Token type

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

---

## 🔹 Payload

Contains:

- User ID
- Custom data
- Expiry time

Example:

```json
{
  "userId": "123456",
  "exp": 1712345678
}
```

⚠️ Payload is NOT encrypted — only encoded.

---

## 🔹 Signature

Created using:

- Secret key
- Header
- Payload

Ensures:
✔ Token not tampered

---

# 6️⃣ JWT Architecture Inside Express App

```
index.js
   ↓
auth.routes.js  →  Login API
   ↓
JWT generated
   ↓
authMiddleware.js
   ↓
Protected routes (customers, items, invoices)
```

---

# 7️⃣ Full JWT Architecture Diagram (Backend Flow)

```
Client
  |
  | 1. Login Request
  v
Express Server
  |
  | 2. Validate Credentials
  | 3. Generate JWT
  v
Return Token
  |
  | 4. Send Token in Header
  v
Auth Middleware
  |
  | 5. Verify Token
  v
Protected Controller
```

---

# 8️⃣ Where JWT Is Used in Real Projects

- Banking apps
- E-commerce
- SaaS platforms
- Admin dashboards
- Mobile apps

---

# 9️⃣ Advantages of JWT

✔ Stateless
✔ Scalable
✔ Compact
✔ Secure (if used properly)

---

# 🔟 Limitations of JWT

❌ Cannot easily revoke token
❌ If secret leaked → all tokens compromised
❌ Must handle expiry properly

---

# 1️⃣1️⃣ Beginner-Level Example in Express

### Generate Token

```js
const jwt = require("jsonwebtoken");

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: "1h",
});
```

---

### Verify Token

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

# 🎓 One-Line Student Rule

> JWT allows stateless authentication by sending a signed token with every request.

---

# 🧠 Interview-Friendly Answer

> JWT is a stateless authentication mechanism where the server issues a signed token that clients send with each protected request.
