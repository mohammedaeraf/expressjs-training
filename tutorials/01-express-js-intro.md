Here’s a **beginner-friendly, classroom-ready tutorial** you can directly use with students who already know **JavaScript / TypeScript**.

---

# 🚀 Express.js – Beginner Tutorial

## 🎯 What You Will Learn

By the end of this tutorial, you will be able to:

- Understand what **Express.js** is
- Create a new Express project manually
- Run an Express server
- Create **2 basic APIs**

---

## 🤔 What is Express.js?

**Express.js** is a **minimal and flexible web framework for Node.js**.

It helps us:

- Create web servers easily
- Build REST APIs (GET, POST, PUT, DELETE)
- Handle requests and responses cleanly

📌 In simple words:

> **Express.js = Easy way to build backend APIs using JavaScript**

---

## 🧠 Why Use Express.js?

- Lightweight and fast
- Easy to learn
- Widely used in real-world projects
- Perfect for REST API development

---

## 🛠 Prerequisites

- Node.js installed
- Basic JavaScript knowledge
- VS Code
- Terminal / Command Prompt

---

## 📁 Step 1: Create a New Project Folder

Open terminal and run:

```bash
mkdir express-basic-app
cd express-basic-app
```

---

## 📦 Step 2: Initialize Node Project

```bash
npm init -y
```

📌 This creates a `package.json` file.

---

## 📥 Step 3: Install Express

```bash
npm install express
```

Express is now added as a dependency.

---

## 📄 Step 4: Create Server File

Create a file named:

```text
index.js
```

Add the following code:

```js
const express = require("express");

// create express app
const app = express();

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## ▶️ Step 5: Run the Server

```bash
node index.js
```

Output:

```text
Server running on http://localhost:3000
```

🎉 Your Express server is now running!

---

## 🔌 Step 6: Create Your First API (GET /)

Add this **above `app.listen()`**:

```js
app.get("/", (req, res) => {
  res.send("Welcome to Express JS!");
});
```

### Test in Browser

Open:

```
http://localhost:3000/
```

✅ Output:

```
Welcome to Express JS!
```

---

## 🔌 Step 7: Create Second API (GET /about)

Add another route:

```js
app.get("/about", (req, res) => {
  res.send("This is the About API");
});
```

### Test in Browser

```
http://localhost:3000/about
```

✅ Output:

```
This is the About API
```

---

## 📄 Final `index.js` Code

```js
const express = require("express");

const app = express();

// API 1
app.get("/", (req, res) => {
  res.send("Welcome to Express JS!");
});

// API 2
app.get("/about", (req, res) => {
  res.send("This is the About API");
});

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## 🧠 Understanding the Code

| Code           | Meaning                 |
| -------------- | ----------------------- |
| `express()`    | Creates Express app     |
| `app.get()`    | Handles GET requests    |
| `req`          | Request from client     |
| `res`          | Response sent to client |
| `app.listen()` | Starts server           |

---

## 🧪 Student Practice Task

Ask students to:

1. Add a new route `/contact`
2. Display a contact message
3. Restart the server and test

Example:

```js
app.get("/contact", (req, res) => {
  res.send("Contact us at support@example.com");
});
```

---

## 🎓 What’s Next?

After this tutorial, students are ready to learn:

- JSON responses
- POST APIs
- Middleware
- MongoDB integration
