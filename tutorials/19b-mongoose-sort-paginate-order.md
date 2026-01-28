#  Order of Filter, Sort and Pagination

## ✅ Correct Order of Filter, Sort and Pagination
👉 **ALWAYS sort first, then paginate**

---

## 🧠 Why Sorting Must Come First

Pagination depends on **order**.

If data is not sorted:

- Page 1 may show random records
- Page 2 may repeat records
- Records may “jump” between pages

📌 This causes **data inconsistency**.

---

## 🔁 Correct Logical Flow

```
FILTER (optional)
  ↓
SORT
  ↓
PAGINATE (skip + limit)
```

---

## ❌ What Goes Wrong If You Paginate First

Imagine records in DB (unsorted):

```
A, D, B, C, E
```

### Page size = 2

#### ❌ Paginate first

- Page 1 → A, D
- Page 2 → B, C

Now sort each page:

- Page 1 → A, D
- Page 2 → B, C

❌ Combined result is still wrong.

---

## ✅ Correct Way (Sort First)

Sort full dataset:

```
A, B, C, D, E
```

Then paginate:

- Page 1 → A, B
- Page 2 → C, D

✔ Correct & predictable.

---

## 🧠 How MongoDB Handles This Internally

Even if code looks like this:

```js
Customer.find().skip(skip).limit(limit).sort({ createdAt: -1 });
```

MongoDB internally applies:

```
SORT → SKIP → LIMIT
```

So order is preserved.

---

## 🧪 Real Code Example (Best Practice)

```js
const customers = await Customer.find(filter)
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);
```

---

## 🎓 One-Line Rule

> Pagination without sorting leads to inconsistent results.

---

## 🧠 Interview-Friendly Answer

> Sorting must be applied before pagination to ensure consistent and predictable page results.

---

## ⚠️ Common Beginner Mistake

❌ Paginating without sorting
❌ Sorting after fetching paginated data
❌ Sorting in JavaScript instead of DB

---

## 🧭 Final Takeaway

| Step     | Mandatory   |
| -------- | ----------- |
| Filter   | Optional    |
| Sort     | ✅ Required |
| Paginate | Optional    |
