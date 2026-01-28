## ❓ If we don’t provide any sort order, what is the default sorting?

### ✅ Short Answer

👉 **There is NO guaranteed default sort order in MongoDB**

---

## 🧠 What Actually Happens

If you write:

```js
Customer.find();
```

MongoDB returns documents in **natural order**.

### ❓ What is natural order?

* The order in which documents are **stored internally**
* Usually insertion order
* But **NOT guaranteed**

---

## ⚠️ Why Natural Order Is Dangerous

Natural order can change when:

* Documents are updated
* Documents are deleted
* Indexes are created or rebuilt
* MongoDB restarts
* Collection is compacted

📌 So relying on natural order is **unsafe**.

---

## ❌ Common Wrong Assumption

> “MongoDB returns data sorted by `_id` by default”

❌ **This is NOT guaranteed**

It may *appear* sorted by `_id` sometimes because:

* `_id` contains a timestamp
* Insertions usually happen in order

But this is **coincidental**, not a rule.

---

## ✅ Best Practice (Always Teach This)

👉 **Always specify a sort field explicitly**

Example:

```js
.sort({ createdAt: -1 })
```

or

```js
.sort({ _id: -1 })
```

---

## 🧠 Why `_id` Is Often Used

* `_id` is indexed
* ObjectId contains a timestamp
* Sorting by `_id: -1` usually means “latest first”

Example:

```js
Customer.find().sort({ _id: -1 });
```

📌 But remember: **this is a design choice**, not default behavior.

---

## 🎓 One-Line Student Rule

> MongoDB does not guarantee any default sorting order.

---

## 🧠 Interview-Friendly Answer

> If no sort is specified, MongoDB returns documents in natural order, which is not guaranteed and should not be relied upon.

---

## 🧭 Summary Table

| Scenario                | Behavior                   |
| ----------------------- | -------------------------- |
| No sort provided        | Natural order (unreliable) |
| Explicit sort           | Predictable & safe         |
| Pagination without sort | ❌ Bug-prone                |

---

## 🔜 Teaching Tip

Tell students:

> Pagination without explicit sorting is a bug, not a feature.
