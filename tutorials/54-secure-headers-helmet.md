# 🛡 Secure Headers with Helmet – Practice Tutorial

## 🎯 Learning Objectives

By the end of this session, students will:

* Understand what secure HTTP headers are
* Install and use Helmet
* Compare headers before and after Helmet
* Configure basic Helmet options
* Understand what problems Helmet solves

---

# 🧠 What Are Secure Headers?

When a browser sends a request to your server:

```
GET /items
```

The server responds with:

* Response body
* Response headers

Headers control:

* Security policies
* Browser behavior
* Content restrictions

---

# 🚨 Problem Without Secure Headers

Without secure headers, your app is vulnerable to:

* Clickjacking
* XSS attacks
* MIME-type sniffing
* Data leakage

---

# 🛠 LAB PART 1 – Without Helmet

---

## Step 1️⃣ Create Basic Express App

```bash
mkdir helmet-demo
cd helmet-demo
npm init -y
npm install express
```

---

## Step 2️⃣ Create `index.js`

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Helmet Demo - Without Security Headers");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Run:

```bash
node index.js
```

---

## Step 3️⃣ Inspect Headers

1. Open browser:

   ```
   http://localhost:3000
   ```
2. Open DevTools → Network tab
3. Click the request
4. Check **Response Headers**

You will see:

* Very few security headers

---

# 🛡 LAB PART 2 – Add Helmet

---

## Step 4️⃣ Install Helmet

```bash
npm install helmet
```

---

## Step 5️⃣ Enable Helmet

Modify `index.js`:

```js
const express = require("express");
const helmet = require("helmet");

const app = express();

// Enable Helmet
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Helmet Demo - With Security Headers");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Restart server.

---

## Step 6️⃣ Inspect Headers Again

Open DevTools → Network → Headers.

Now you will see additional headers like:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: ...
Referrer-Policy: no-referrer
```

🎉 Helmet is working!

---

# 🧠 What Helmet Does Automatically

Helmet adds:

| Header                  | Protects Against     |
| ----------------------- | -------------------- |
| X-Content-Type-Options  | MIME sniffing        |
| X-Frame-Options         | Clickjacking         |
| Referrer-Policy         | Data leakage         |
| Content-Security-Policy | XSS                  |
| Cross-Origin policies   | Cross-origin attacks |

---

# 🎓 Simple Explanation for Students

> Helmet automatically adds security-related HTTP headers to protect your Express app.

---

# 🔎 Understanding One Important Header

## Example: X-Frame-Options

Without Helmet:
Your website can be embedded in an iframe by another site.

With Helmet:

```
X-Frame-Options: SAMEORIGIN
```

Prevents clickjacking.

---

# ⚙ Optional: Custom Helmet Configuration

You can configure Helmet:

```js
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
```

This disables CSP if it breaks your frontend during development.

---

# 🧪 Practice Exercises

## Exercise 1

Disable one protection:

```js
app.use(
  helmet({
    frameguard: false
  })
);
```

Check if `X-Frame-Options` disappears.

---

## Exercise 2

Combine Helmet with CORS.

```js
app.use(helmet());
app.use(cors());
```

Observe headers.

---

# 🧠 Where Helmet Should Be Placed

Correct order:

```js
app.use(helmet());
app.use(rateLimit());
app.use(cors());
app.use(express.json());
```

Helmet should be applied early.

---

# ⚠ Important Teaching Notes

* Helmet does NOT replace validation
* Helmet does NOT replace JWT
* Helmet does NOT replace rate limiting
* It is only one security layer

---

# 🎓 One-Line Student Rule

> Helmet secures your Express app by setting safe HTTP headers.

---

# 🧠 Interview-Friendly Answer

> Helmet is a middleware that helps secure Express applications by setting various HTTP headers automatically.

---

# 🛡 Real-Life Analogy

Helmet is like:

> Installing CCTV cameras and security locks in your building — it strengthens basic security.