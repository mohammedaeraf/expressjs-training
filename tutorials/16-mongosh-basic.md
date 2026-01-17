# 📘 MongoDB Shell Tutorial (Basic Commands)

## 1️⃣ What is MongoDB Shell (`mongosh`)?

**MongoDB Shell** is a **command-line interface** used to:

* Connect to MongoDB
* Run queries
* Insert, update, delete data
* Administer databases

You interact with MongoDB using **JavaScript-like commands**.

---

## 2️⃣ Starting MongoDB Shell

### Local MongoDB

```bash
mongosh
```

### MongoDB Atlas

```bash
mongosh "mongodb+srv://<username>:<password>@cluster0.mongodb.net/"
```

Once connected, you’ll see:

```text
test>
```

This means you are currently inside the **test** database.

---

## 3️⃣ Listing All Databases

### Command

```js
show dbs
```

### Output (example)

```text
admin      40 KB
config     72 KB
local      80 KB
school     120 KB
```

📌 **Note:**
Databases appear **only if they contain data**.

---

## 4️⃣ Switching to a Database

### Command

```js
use school
```

### Output

```text
switched to db school
```

✔️ If the database does not exist, MongoDB **creates it automatically** when data is inserted.

---

## 5️⃣ Viewing Collections in a Database

```js
show collections
```

Example:

```text
students
teachers
```

---

## 6️⃣ Inserting a Single Record

### Insert One Document

```js
db.students.insertOne({
  name: "Rahul",
  age: 20,
  course: "Computer Science"
})
```

### Output

```json
{
  acknowledged: true,
  insertedId: ObjectId("...")
}
```

---

## 7️⃣ Inserting Multiple Records

### Insert Many Documents

```js
db.students.insertMany([
  { name: "Priya", age: 21, course: "IT" },
  { name: "Amit", age: 22, course: "ECE" },
  { name: "Sneha", age: 20, course: "CS" }
])
```

✔️ Faster and preferred for bulk data.

---

## 8️⃣ Finding Records (All Documents)

### Find All

```js
db.students.find()
```

### Pretty Output (Readable)

```js
db.students.find().pretty()
```

---

## 9️⃣ Finding Records with Conditions

### Find Students Aged 20

```js
db.students.find({ age: 20 })
```

### Find One Record

```js
db.students.findOne({ name: "Rahul" })
```

---

## 🔟 Finding Records with Selected Fields (Projection)

### Syntax

```js
db.collection.find(filter, projection)
```

### Example: Show only `name` and `course`

```js
db.students.find(
  {},
  { name: 1, course: 1, _id: 0 }
)
```

✔️ `1` → include field
✔️ `0` → exclude field

---

## 1️⃣1️⃣ Sorting Records

### Sort by Age (Ascending)

```js
db.students.find().sort({ age: 1 })
```

### Sort by Age (Descending)

```js
db.students.find().sort({ age: -1 })
```

📌 `1` = ascending
📌 `-1` = descending

---

## 1️⃣2️⃣ Limiting Records

### Get Only First 2 Records

```js
db.students.find().limit(2)
```

### Sort + Limit (Very Common)

```js
db.students.find().sort({ age: -1 }).limit(2)
```

✔️ Useful for:

* Latest records
* Top results
* Pagination

---

## 1️⃣3️⃣ Combining Filter + Projection + Sort + Limit

```js
db.students.find(
  { course: "CS" },
  { name: 1, age: 1, _id: 0 }
).sort({ age: 1 }).limit(3)
```

---

## 1️⃣4️⃣ Quick Summary Table

| Task             | Command                  |
| ---------------- | ------------------------ |
| List databases   | `show dbs`               |
| Switch database  | `use dbName`             |
| View collections | `show collections`       |
| Insert one       | `insertOne()`            |
| Insert many      | `insertMany()`           |
| Find records     | `find()`                 |
| Find with fields | `find({}, { field: 1 })` |
| Sort             | `sort({ field: 1/-1 })`  |
| Limit            | `limit(n)`               |

---

## 🎯 Best Practices for Beginners

✔️ Always use `.pretty()` while learning
✔️ Use `limit()` to avoid flooding output
✔️ Combine `sort + limit` for performance
✔️ Practice in **Free Tier MongoDB Atlas**

---

## ✅ Final Takeaway

> MongoDB Shell is **simple, powerful, and JavaScript-friendly**.
> Mastering these basics gives you a **strong foundation** for MongoDB, APIs, and backend development.
