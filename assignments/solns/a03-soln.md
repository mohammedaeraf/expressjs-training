# ✅ MongoDB Shell Assignment – Answer Key

---

## 🔹 Part A: Database & Collection Setup

### 1️⃣ List all databases

```js
show dbs
```

---

### 2️⃣ Switch to `crm` database

```js
use crm
```

---

### 3️⃣ Verify current database

```js
db
```

**Output:**

```text
crm
```

---

### 4️⃣ Show collections

```js
show collections
```

---

### 5️⃣ Create `customers` collection (by inserting a record)

```js
db.customers.insertOne({
  name: "Initial User",
  email: "init@gmail.com",
  phone: "9999999999",
  creditLimit: 40000
})
```

---

## 🔹 Part B: Insert Operations

### 6️⃣ Insert One Customer (Rahul Sharma)

```js
db.customers.insertOne({
  name: "Rahul Sharma",
  email: "rahul.sharma@gmail.com",
  phone: "9876543210",
  creditLimit: 50000
})
```

---

### 7️⃣ Insert Multiple Customers

```js
db.customers.insertMany([
  {
    name: "Priya Mehta",
    email: "priya.mehta@gmail.com",
    phone: "9823456789",
    creditLimit: 75000
  },
  {
    name: "Amit Verma",
    email: "amit.verma@gmail.com",
    phone: "9765432109",
    creditLimit: 60000
  },
  {
    name: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    phone: "9887766554",
    creditLimit: 90000
  },
  {
    name: "Suresh Iyer",
    email: "suresh.iyer@gmail.com",
    phone: "9845012345",
    creditLimit: 120000
  },
  {
    name: "Anjali Nair",
    email: "anjali.nair@gmail.com",
    phone: "9898765432",
    creditLimit: 85000
  }
])
```

---

## 🔹 Part C: Find Operations

### 8️⃣ Fetch all customers

```js
db.customers.find().pretty()
```

---

### 9️⃣ Credit limit greater than 70,000

```js
db.customers.find({ creditLimit: { $gt: 70000 } })
```

---

### 🔟 Fetch only name and email

```js
db.customers.find(
  {},
  { name: 1, email: 1, _id: 0 }
)
```

---

### 1️⃣1️⃣ Find Rahul Sharma

```js
db.customers.findOne({ name: "Rahul Sharma" })
```

---

### 1️⃣2️⃣ Credit limit between 50,000 and 1,00,000

```js
db.customers.find({
  creditLimit: { $gte: 50000, $lte: 100000 }
})
```

---

## 🔹 Part D: Sorting & Limiting

### 1️⃣3️⃣ Sort by creditLimit (ascending)

```js
db.customers.find().sort({ creditLimit: 1 })
```

---

### 1️⃣4️⃣ Sort by creditLimit (descending)

```js
db.customers.find().sort({ creditLimit: -1 })
```

---

### 1️⃣5️⃣ Top 3 customers with highest credit limit

```js
db.customers.find()
  .sort({ creditLimit: -1 })
  .limit(3)
```

---

### 1️⃣6️⃣ First 2 customers

```js
db.customers.find().limit(2)
```

---

## 🔹 Part E: Combined Queries

### 1️⃣7️⃣ Name + creditLimit, sorted desc, limit 5

```js
db.customers.find(
  {},
  { name: 1, creditLimit: 1, _id: 0 }
)
.sort({ creditLimit: -1 })
.limit(5)
```

---

### 1️⃣8️⃣ creditLimit > 60,000, sorted asc, limit 3

```js
db.customers.find({ creditLimit: { $gt: 60000 } })
  .sort({ creditLimit: 1 })
  .limit(3)
```

---

## 🔹 Part F: Observation Answers

### 1️⃣9️⃣ What happens if you use `use crm` before inserting data?

✔️ MongoDB **switches to the database**, but it is **created only after data is inserted**.

---

### 2️⃣0️⃣ Why do some databases not appear in `show dbs`?

✔️ MongoDB shows **only databases that contain data**.

---

### 2️⃣1️⃣ Difference between `find()` and `findOne()`?

| find()           | findOne()               |
| ---------------- | ----------------------- |
| Returns cursor   | Returns single document |
| Multiple records | First matching record   |

---

### 2️⃣2️⃣ Why sort before limit?

✔️ Without sorting, MongoDB may return records in **unpredictable order**.

---

## 🔹 Bonus Task – Solution

### Add `isActive: true` where creditLimit > 80,000

```js
db.customers.updateMany(
  { creditLimit: { $gt: 80000 } },
  { $set: { isActive: true } }
)
```

---

### Fetch only active customers

```js
db.customers.find({ isActive: true })
```

---

## ✅ End of Answer Key
