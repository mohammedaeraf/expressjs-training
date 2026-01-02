# 🧪 Lab 04: Express Router & Proper Project Structure

## 🎯 **Objective**

By the end of this lab, students will:

* Understand **Express Router**
* Split routes into separate files
* Create a clean, scalable folder structure
* Prepare codebase for MongoDB integration

---

## 🧠 Why Express Router?

So far, everything is in `index.js`.
That’s fine for learning—but **real projects don’t work like that**.

Express Router allows us to:

* Organize code better
* Separate concerns
* Scale applications cleanly

---

## 📁 Step 1: Create Folder Structure

Inside your project root, create:

```
express-basic-app/
├── index.js
├── routes/
│   └── users.routes.js
└── package.json
```

---

## 🔹 Step 2: Move Users Logic to Router File

### 📄 `routes/users.routes.js`

```js
const express = require("express");
const router = express.Router();

// In-memory data
let users = [];

// CREATE user
router.post("/", (req, res) => {
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
    message: "User created",
    user: newUser
  });
});

// READ all users
router.get("/", (req, res) => {
  res.json(users);
});

// READ user by id
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// UPDATE user
router.put("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json({ message: "User updated", user });
});

// DELETE user
router.delete("/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

module.exports = router;
```

---

## 🔹 Step 3: Update `index.js`

### 📄 `index.js`

```js
const express = require("express");
const app = express();

// middleware
app.use(express.json());

// import routes
const userRoutes = require("./routes/users.routes");

// use routes
app.use("/users", userRoutes);

// base route
app.get("/", (req, res) => {
  res.send("Express Router Lab");
});

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## ▶️ Step 4: Restart Server

```bash
node index.js
```

---

## 🧪 Step 5: Test APIs (Thunder Client)

All APIs still work exactly the same:

| Method | URL          |
| ------ | ------------ |
| GET    | `/users`     |
| POST   | `/users`     |
| GET    | `/users/:id` |
| PUT    | `/users/:id` |
| DELETE | `/users/:id` |

📌 Students will realize **folder structure does NOT change API behavior**.

---

## 🧠 Key Concept Explained Simply

```js
const router = express.Router();
```

👉 Creates a mini-Express app just for `/users`

```js
app.use("/users", userRoutes);
```

👉 Prefixes all routes with `/users`

---

## 🧪 Mini Assignment (Important)

1. Create another router:

```
routes/products.routes.js
```

2. Implement:

* POST `/products`
* GET `/products`

3. Mount it in `index.js`:

```js
app.use("/products", productRoutes);
```
