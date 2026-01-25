# 🔁 Nodemon – Beginner Tutorial (with Express)

## 🎯 What You Will Learn

By the end of this tutorial, you will:

* Understand **what nodemon is**
* Know **why nodemon is useful**
* Install and configure **nodemon**
* Run an **Express app using nodemon**
* Avoid common beginner mistakes

---

## 1️⃣ What is Nodemon?

**nodemon** is a development tool that:

* Automatically **restarts your Node.js app**
* When you change any file (JS, JSON, etc.)

📌 In simple words:

> **nodemon saves you from stopping and starting the server again and again**

---

## 2️⃣ Problem Without Nodemon

Normal Express workflow:

1. Change code
2. Stop server (`Ctrl + C`)
3. Run again (`node index.js`)
4. Repeat 😫

---

## 3️⃣ Solution: Nodemon

With nodemon:

1. Change code
2. Save file
3. Server restarts automatically ✅

---

## 4️⃣ Install Nodemon

### ✅ Recommended (Local Install)

```bash
npm install --save-dev nodemon
```

📌 Installed only for development.

---

### ❌ Not Recommended for Beginners (Global)

```bash
npm install -g nodemon
```

---

## 5️⃣ Add Nodemon Script

### 📄 `package.json`

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

---

## 6️⃣ Basic Express App Example

### 📄 `index.js`

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express with Nodemon!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 7️⃣ Run Express App with Nodemon

```bash
npm run dev
```

You will see:

```
[nodemon] starting `node index.js`
Server running on http://localhost:3000
```

---

## 8️⃣ Test Nodemon

1. Open browser:

   ```
   http://localhost:3000
   ```
2. Change response text in `index.js`
3. Save file
4. Refresh browser

🎉 Changes applied without restarting server!

---

## 9️⃣ What Files Does Nodemon Watch?

By default:

* `.js`
* `.json`
* `.env`

Any change → restart server.

---

## ⚠️ Common Beginner Mistakes

❌ Running `node index.js` instead of `nodemon`
❌ Forgetting to add `dev` script
❌ Installing nodemon globally and facing version issues
❌ Using nodemon in production

---

## 🚫 Important Rule

> **Never use nodemon in production**

In production:

* Use `node`

---

## 🎓 Summary

> Nodemon automatically restarts the server when code changes.

---

## 🧠 Interview-Friendly Answer

> Nodemon is a development tool that monitors file changes and automatically restarts Node.js applications.
