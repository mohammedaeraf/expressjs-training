# findByIdAndUpdate Params explanation

## 📌 The Code

```js
const updatedCustomer = await Customer.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true, runValidators: true }
);
```

The **3rd argument** is an **options object** that controls how the update behaves.

---

## 🧠 What Does the 3rd Parameter Do?

It customizes:

- **What data is returned**
- **Whether validation runs or not**

---

## 1️⃣ `new: true`

### ❓ What happens without it?

Default behavior:

```js
{ new: false }
```

➡️ Mongoose returns the **OLD document** (before update).

---

### 🔍 Example (Without `new: true`)

```js
// Name in DB: Rahul
Customer.findByIdAndUpdate(id, { name: "Ameen" });
```

Returned value:

```json
{
  "name": "Rahul"
}
```

❌ Confusing for APIs.

---

### ✅ With `new: true`

```js
{ new: true }
```

➡️ Returns the **UPDATED document**.

Returned value:

```json
{
  "name": "Ameen"
}
```

📌 This is why APIs almost always use `new: true`.

---

## 2️⃣ `runValidators: true`

### ❓ Why is this needed?

By default:

```js
findByIdAndUpdate();
```

❌ **does NOT run schema validation**

---

### ❌ Problem Example

```js
rate: -100;
```

Even if schema says:

```js
min: 0;
```

➡️ MongoDB will still update ❌

---

### ✅ With `runValidators: true`

```js
{
  runValidators: true;
}
```

➡️ Mongoose enforces schema rules:

- required fields
- min / max
- enum
- custom validators

Invalid data → update blocked ❌

---

## 🧠 Why Mongoose Skips Validation by Default

- Performance reasons
- Update queries don’t load full document

📌 That’s why we must explicitly enable validation.

---

## 🧪 Side-by-Side Comparison

| Option        | Without      | With             |
| ------------- | ------------ | ---------------- |
| Return value  | Old document | Updated document |
| Validation    | ❌ Skipped   | ✅ Enforced      |
| Safe for APIs | ❌ No        | ✅ Yes           |

---

## 🧠 Best Practice

```js
Customer.findByIdAndUpdate(id, data, {
  new: true,
  runValidators: true,
});
```

---

## 🎓 One-Line Rule

> `new: true` returns updated data, `runValidators: true` ensures data is valid.

---

## 🧠 Interview-Friendly Answer

> The third parameter in `findByIdAndUpdate` is an options object that controls the returned document and enables schema validation during updates.
