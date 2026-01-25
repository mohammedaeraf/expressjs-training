# 📘 MongoDB Pagination Tutorial

## Using `skip()` and `limit()`

---

## 1️⃣ What is Pagination?

**Pagination** means fetching data in **small chunks (pages)** instead of loading everything at once.

### Why Pagination is Important

* Improves performance
* Reduces memory usage
* Faster response time
* Essential for APIs & UIs (page 1, page 2, etc.)

---

## 2️⃣ Sample Collection

Assume we have a collection called `posts`:

```js
{
  title: "Post 1",
  body: "Sample content"
}
```

Assume total documents = **100**

---

## 3️⃣ Basic Pagination Formula

```text
skip = (pageNumber - 1) × pageSize
```

| Page   | skip | limit |
| ------ | ---- | ----- |
| Page 1 | 0    | 10    |
| Page 2 | 10   | 10    |
| Page 3 | 20   | 10    |

---

## 4️⃣ `limit()` – Restrict Number of Records

### Get First 5 Documents

```js
db.posts.find().limit(5)
```

---

## 5️⃣ `skip()` – Skip Records

### Skip First 5 Documents

```js
db.posts.find().skip(5)
```

---

## 6️⃣ Pagination Example (Page-wise)

### Page 1 (Records 1–5)

```js
db.posts.find().skip(0).limit(5)
```

### Page 2 (Records 6–10)

```js
db.posts.find().skip(5).limit(5)
```

### Page 3 (Records 11–15)

```js
db.posts.find().skip(10).limit(5)
```

---

## 7️⃣ Pagination with Sorting (Very Important)

⚠️ Pagination without sorting can return **unpredictable results**.

### Correct Way

```js
db.posts.find()
  .sort({ _id: -1 })
  .skip(10)
  .limit(5)
```

✔️ Always **sort first**, then skip + limit.

---

## 8️⃣ Pagination with Filter

### Example: CS posts, page 2

```js
db.posts.find({ category: "CS" })
  .sort({ createdAt: -1 })
  .skip(5)
  .limit(5)
```

---

## 9️⃣ Pagination in Node.js (Express Example)

```js
const page = Number(req.query.page) || 1;
const limit = 10;
const skip = (page - 1) * limit;

const posts = await Post.find()
  .sort({ _id: -1 })
  .skip(skip)
  .limit(limit);

res.json(posts);
```

---

## 🔟 Getting Total Count (For UI Page Numbers)

```js
const totalRecords = await Post.countDocuments();
const totalPages = Math.ceil(totalRecords / limit);
```

---

## 1️⃣1️⃣ Common Mistakes ❌

❌ Using `skip()` on very large datasets
❌ Not using `sort()`
❌ Forgetting to calculate total count
❌ Large `skip` values → slow queries

---

## 1️⃣2️⃣ Performance Consideration ⚠️

`skip()` becomes **slow for large page numbers** because MongoDB must walk past skipped documents.

### Better Alternative (Cursor-based Pagination)

```js
db.posts.find({ _id: { $lt: lastSeenId } })
  .sort({ _id: -1 })
  .limit(10)
```

✔️ Much faster for large datasets
✔️ Used by social media feeds

---

## 1️⃣3️⃣ When to Use skip + limit?

| Use Case           | Recommended |
| ------------------ | ----------- |
| Small datasets     | ✔️ Yes      |
| Admin dashboards   | ✔️ Yes      |
| Large public feeds | ❌ No        |
| Infinite scroll    | ❌ No        |

---

## 📌 Quick Summary

| Concept     | Key Point                  |
| ----------- | -------------------------- |
| limit       | Number of records per page |
| skip        | Records to skip            |
| Formula     | `(page - 1) * limit`       |
| Sort        | Always required            |
| Performance | Skip is costly on big data |

---

## ✅ Final Takeaway

> `skip()` + `limit()` is **perfect for learning, dashboards, and small datasets**.
> For large-scale apps, prefer **cursor-based pagination**.