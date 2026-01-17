
# 📘 MongoDB CRUD Tutorial

## UPDATE & DELETE Operations (MongoDB Shell)

---

## 1️⃣ Setup (Sample Data)

Assume we are working in a database called `school` and a collection called `students`.

```js
use school
```

Sample document:

```json
{
  "name": "Rahul",
  "age": 20,
  "course": "CS"
}
```

---

## 🔁 UPDATE OPERATIONS

---

## 2️⃣ `updateOne()` – Update a Single Document

### 🔹 Syntax

```js
db.collection.updateOne(filter, update, options)
```

### Example: Update Rahul’s age

```js
db.students.updateOne(
  { name: "Rahul" },
  { $set: { age: 21 } }
)
```

### Output

```json
{
  acknowledged: true,
  matchedCount: 1,
  modifiedCount: 1
}
```

📌 Updates **only the first matching document**.

---

## 3️⃣ `updateMany()` – Update Multiple Documents

### Example: Add `isActive` to all CS students

```js
db.students.updateMany(
  { course: "CS" },
  { $set: { isActive: true } }
)
```

✔️ All matching documents are updated.

---

## 4️⃣ Updating Multiple Fields

```js
db.students.updateOne(
  { name: "Priya" },
  {
    $set: {
      age: 22,
      course: "IT"
    }
  }
)
```

---

## 5️⃣ Incrementing a Value (`$inc`)

### Example: Increase age by 1

```js
db.students.updateOne(
  { name: "Amit" },
  { $inc: { age: 1 } }
)
```

✔️ Useful for counters, stock, points.

---

## 6️⃣ Adding New Field if Not Exists

```js
db.students.updateOne(
  { name: "Sneha" },
  { $set: { city: "Bangalore" } }
)
```

MongoDB automatically adds the field.

---

## 7️⃣ Upsert (Update or Insert)

If document doesn’t exist, MongoDB inserts it.

```js
db.students.updateOne(
  { name: "Karan" },
  { $set: { age: 23, course: "ECE" } },
  { upsert: true }
)
```

✔️ Very useful in sync operations.

---

## 8️⃣ Replace a Document (`replaceOne()`)

⚠️ **Replaces the entire document except `_id`**

```js
db.students.replaceOne(
  { name: "Rahul" },
  { name: "Rahul", age: 22, course: "CS", city: "Mumbai" }
)
```

❌ Fields not included are removed.

---

## 🗑️ DELETE OPERATIONS

---

## 9️⃣ `deleteOne()` – Delete Single Document

### Example: Delete Rahul

```js
db.students.deleteOne({ name: "Rahul" })
```

Output:

```json
{
  acknowledged: true,
  deletedCount: 1
}
```

---

## 🔟 `deleteMany()` – Delete Multiple Documents

### Example: Delete all IT students

```js
db.students.deleteMany({ course: "IT" })
```

⚠️ Use carefully!

---

## 1️⃣1️⃣ Delete All Documents (⚠️ Dangerous)

```js
db.students.deleteMany({})
```

✔️ Deletes **all records**
❌ Collection remains

---

## 1️⃣2️⃣ Drop a Collection

```js
db.students.drop()
```

✔️ Deletes data + structure

---

## ⚠️ Common Beginner Mistakes

❌ Forgetting filter → deletes everything
❌ Using `replaceOne()` instead of `$set`
❌ Not checking matchedCount
❌ Running delete without preview (`find()`)

---

## ✅ Best Practices

✔️ Always run `find()` before `update` or `delete`
✔️ Use `updateOne()` unless bulk update is needed
✔️ Avoid `replaceOne()` unless required
✔️ Use `upsert` carefully
✔️ Backup before bulk delete in production

---

## 📌 Quick Reference Table

| Operation       | Command            |
| --------------- | ------------------ |
| Update one      | `updateOne()`      |
| Update many     | `updateMany()`     |
| Increment       | `$inc`             |
| Add field       | `$set`             |
| Upsert          | `{ upsert: true }` |
| Delete one      | `deleteOne()`      |
| Delete many     | `deleteMany()`     |
| Drop collection | `drop()`           |

---

## 🎯 Final Takeaway

> MongoDB updates are **powerful but dangerous if misused**.
> Always **filter carefully** and **verify before deleting**.