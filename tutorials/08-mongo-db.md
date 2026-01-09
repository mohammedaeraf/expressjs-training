# 📘 Introduction to MongoDB

## 🎯 Learning Objectives

By the end of this session, you will:

- Understand **NoSQL databases**
- Know why **MongoDB** is popular
- Install MongoDB **locally** or use **MongoDB Atlas (Cloud)**
- Understand **database, collection, document**
- Use **Mongo Shell** and **MongoDB Compass**

---

## 1️⃣ What is NoSQL?

### ❓ Traditional Databases (SQL)

Examples: MySQL, PostgreSQL

- Data stored in **tables**
- Fixed **schema**
- Rows & columns
- Difficult to change structure later

### ❓ NoSQL Databases

- Data stored in **flexible formats**
- Schema-less or schema-flexible
- Designed for **scalability & speed**

📌 Examples of NoSQL types:

- Document (MongoDB)
- Key-Value (Redis)
- Column (Cassandra)
- Graph (Neo4j)

---

## 2️⃣ What is MongoDB?

**MongoDB** is a **NoSQL document-based database**.

- Stores data as **JSON-like documents**
- Uses **BSON** (Binary JSON)
- Very popular with **Node.js & Express**

### Example MongoDB Document

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "age": 30
}
```

📌 Looks exactly like a JavaScript object → easy for JS developers.

---

## 3️⃣ Advantages of MongoDB

### ✅ Why Developers Love MongoDB

| Advantage        | Explanation               |
| ---------------- | ------------------------- |
| Flexible Schema  | Fields can change anytime |
| JSON-like Data   | Natural for JS / Express  |
| Scalable         | Handles large data easily |
| Fast Development | Less boilerplate          |
| Cloud Friendly   | Easy hosting with Atlas   |

📌 Perfect match for **MERN stack**.

---

## 4️⃣ MongoDB Core Concepts

![Image](what-is-mongodb.jpg)

![Image](mongodb-introduction-architecture.jpeg)

### 🗄️ Database

- A container for collections
  Example:

```
accountingDB
```

---

### 📂 Collection

- Group of documents (similar to a table)

```
customers
invoices
payments
```

---

### 📄 Document

- A single record (JSON object)

```json
{
  "_id": "64ab23...",
  "name": "Ameen",
  "email": "ameen@gmail.com",
  "creditLimit": 50000
}
```

---

### 🔑 `_id`

- Automatically generated unique identifier
- Similar to **primary key**

---

## 5️⃣ Installing MongoDB

### Option A: Install MongoDB Locally

✔ Best if:

- Offline work
- Local development practice

Steps:

1. Download from official MongoDB website
2. Install **MongoDB Community Server**
3. MongoDB runs on:

```
mongodb://localhost:27017
```

📌 MongoDB service runs in background.

---

### Option B: MongoDB Atlas (Cloud – Recommended)

**MongoDB Atlas** is MongoDB’s **cloud database service**.

✔ Best for:

- Beginners
- No installation issues
- Easy Express integration
- Production-like setup

Steps (High level):

1. Create free account
2. Create a **Free Cluster**
3. Create DB user & password
4. Get **connection string**

Example:

```text
mongodb+srv://username:password@cluster0.mongodb.net/accountingDB
```

---

## 6️⃣ Mongo Shell (mongosh)

![Image](https://webassets.mongodb.com/_com_assets/cms/mongosh-blog-header-0oh8tmrmkv.png)

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20240308101324/Connecting-to-MongoDB-Server.png)

Mongo Shell allows you to **interact with MongoDB using commands**.

### Start Shell

```bash
mongosh
```

### Common Commands

```js
show dbs
use accountingDB
show collections
```

Insert document:

```js
db.customers.insertOne({
  name: "Rahul",
  email: "rahul@gmail.com",
});
```

Find documents:

```js
db.customers.find();
```

📌 Great for **learning & debugging**.

---

## 7️⃣ MongoDB Compass (GUI Tool)

![Image](mongodb-compass.png)

MongoDB Compass is a **visual GUI** for MongoDB.

### What You Can Do:

- Connect to local or Atlas DB
- View databases & collections
- Insert / update / delete documents
- Run queries visually

✔ Perfect for **beginners**.

---

## 8️⃣ MongoDB vs SQL (Quick Comparison)

| SQL          | MongoDB         |
| ------------ | --------------- |
| Table        | Collection      |
| Row          | Document        |
| Column       | Field           |
| Schema-based | Schema-flexible |
| JOINs        | Embedded data   |

---

## 🧠 Important Tip

> “MongoDB stores data exactly the way your Express API sends it.”

This creates an instant **mental connection**.

---

## 🧪 Mini Practice (5–10 Minutes)

1. Open MongoDB Compass
2. Create database: `trainingDB`
3. Create collection: `students`
4. Insert:

```json
{
  "name": "Ameen",
  "course": "Express + MongoDB",
  "duration": "30 days"
}
```
