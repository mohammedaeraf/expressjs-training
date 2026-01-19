# 📘 MongoDB Tutorial

## Filtering Records in a Range (MongoDB Shell)

---

## 1️⃣ What Does “Filter in a Range” Mean?

Filtering in a range means retrieving documents where a field value lies **between two values**.

Examples:

- Price between 500 and 1000
- Age between 18 and 25
- Rating between 7 and 9
- Date between two dates

MongoDB uses **comparison operators** for this.

---

## 2️⃣ MongoDB Comparison Operators

| Operator | Meaning               |
| -------- | --------------------- |
| `$gt`    | Greater than          |
| `$gte`   | Greater than or equal |
| `$lt`    | Less than             |
| `$lte`   | Less than or equal    |
| `$eq`    | Equal                 |
| `$ne`    | Not equal             |

---

## 3️⃣ Sample Collection (books)

Assume we have this collection:

```js
db.books.insertMany([
  { title: "Hamlet", pages: 342, rating: 9 },
  { title: "Macbeth", pages: 249, rating: 8 },
  { title: "Othello", pages: 314, rating: 8 },
  { title: "Romeo and Juliet", pages: 295, rating: 9 },
  { title: "A Midsummer Night's Dream", pages: 280, rating: 8 },
]);
```

---

## 4️⃣ Filter Using Greater Than (`$gt`)

### Example: Books with rating greater than 8

```js
db.books.find({ rating: { $gt: 8 } });
```

---

## 5️⃣ Filter Using Less Than (`$lt`)

### Example: Books with less than 300 pages

```js
db.books.find({ pages: { $lt: 300 } });
```

---

## 6️⃣ Filter Using Greater Than or Equal (`$gte`)

### Example: Books with rating ≥ 8

```js
db.books.find({ rating: { $gte: 8 } });
```

---

## 7️⃣ Filter Using Less Than or Equal (`$lte`)

### Example: Books with pages ≤ 280

```js
db.books.find({ pages: { $lte: 280 } });
```

---

## 8️⃣ Filter Between Two Values (Most Common)

### Example: Books with pages between 250 and 320

```js
db.books.find({
  pages: { $gte: 250, $lte: 320 },
});
```

✔️ This is the **range filter** most developers use.

---

## 9️⃣ Filter Between Values (Rating Range)

### Example: Rating between 8 and 9

```js
db.books.find({
  rating: { $gte: 8, $lte: 9 },
});
```

---

## 🔟 Range Filter with Projection (Selected Fields)

### Show only title and rating

```js
db.books.find({ rating: { $gte: 8 } }, { title: 1, rating: 1, _id: 0 });
```

---

## 1️⃣1️⃣ Range Filter with Sorting

### Highest-rated books first

```js
db.books.find({ rating: { $gte: 8 } }).sort({ rating: -1 });
```

---

## 1️⃣2️⃣ Range Filter with Limit

### Top 2 books with rating ≥ 8

```js
db.books
  .find({ rating: { $gte: 8 } })
  .sort({ rating: -1 })
  .limit(2);
```

---

## 1️⃣3️⃣ Range Filter on Dates (Important)

### Insert sample data

```js
db.orders.insertMany([
  { orderId: 1, orderDate: ISODate("2025-01-01") },
  { orderId: 2, orderDate: ISODate("2025-02-10") },
  { orderId: 3, orderDate: ISODate("2025-03-15") },
]);
```

### Orders between Jan and Feb 2025

```js
db.orders.find({
  orderDate: {
    $gte: ISODate("2025-01-01"),
    $lte: ISODate("2025-02-28"),
  },
});
```

---

## ⚠️ Common Beginner Mistakes

❌ Using strings instead of numbers
❌ Forgetting `$` before operators
❌ Not using `ISODate()` for dates
❌ Forgetting sorting before limiting

---

## ✅ Best Practices

✔️ Always ensure correct data types
✔️ Combine `$gte` and `$lte` for range queries
✔️ Add indexes on frequently ranged fields
✔️ Use projection to reduce payload

---

## 📌 Quick Summary

| Task          | Command                           |
| ------------- | --------------------------------- |
| Greater than  | `{ field: { $gt: value } }`       |
| Less than     | `{ field: { $lt: value } }`       |
| Between       | `{ field: { $gte: x, $lte: y } }` |
| Range + sort  | `.sort()`                         |
| Range + limit | `.limit()`                        |

---

## 🎯 Final Takeaway

> MongoDB range queries are **simple, powerful, and extremely common**.
> Mastering `$gt`, `$gte`, `$lt`, and `$lte` is essential for **real-world querying**.
