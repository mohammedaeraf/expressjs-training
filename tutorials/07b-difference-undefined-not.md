# Difference between `if(!age)` and `if(age === undefined)`

## 🧠 The Core Difference

```js
if (age === undefined)
```

✔ Checks **only one thing**
➡️ “Was `age` NOT provided at all?”

```js
if (!age)
```

✔ Checks **many things**
➡️ “Is `age` missing OR falsy?”

---

## 🔍 What Does `!age` Actually Mean?

In JavaScript, these values are **falsy**:

| Value               | Result of `!value` |
| ------------------- | ------------------ |
| `undefined`         | true               |
| `null`              | true               |
| `0`                 | true               |
| `""` (empty string) | true               |
| `NaN`               | true               |
| `false`             | true               |

So:

```js
if (!age)
```

will be `true` for **all of the above**.

---

## 🧪 Practical Examples

### Example Input

```js
const age = 0;
```

| Check               | Result   |
| ------------------- | -------- |
| `age === undefined` | ❌ false |
| `!age`              | ✅ true  |

⚠️ This is dangerous for numeric fields like **age**, **price**, **quantity**.

---

### Example Input

```js
const age = 25;
```

| Check               | Result   |
| ------------------- | -------- |
| `age === undefined` | ❌ false |
| `!age`              | ❌ false |

✔ Both work here.

---

### Example Input

```js
const age = undefined;
```

| Check               | Result  |
| ------------------- | ------- |
| `age === undefined` | ✅ true |
| `!age`              | ✅ true |

✔ Both catch missing value.

---

## 🧠 Why This Matters in Validation

### ❌ Bad Validation (Common Beginner Mistake)

```js
if (!age) {
  return res.status(400).json({ message: "Age is required" });
}
```

This will **incorrectly reject**:

```json
{ "age": 0 }
```

---

### ✅ Correct Validation for Numbers

```js
if (age === undefined) {
  return res.status(400).json({ message: "Age is required" });
}
```

or even better:

```js
if (typeof age !== "number") {
  return res.status(400).json({ message: "Age must be a number" });
}
```

---

## 🧠 Best Practice Summary

| Field Type      | Use                        |
| --------------- | -------------------------- |
| Strings         | `if (!name)`               |
| Numbers         | `if (age === undefined)`   |
| Booleans        | `if (value === undefined)` |
| Optional fields | Explicit checks            |

---

## 🎓 One-Line Rule for Students

> Use `!value` for strings, **never for numbers**.

---

## 🧪 Recommended Pattern (Production-Safe)

```js
if (age === undefined || !Number.isInteger(age) || age < 18) {
  return res.status(400).json({ message: "Invalid age" });
}
```

---

## 🧠 Interview-Friendly Answer

> `age === undefined` checks if the value is missing,
> `!age` checks if the value is falsy, including 0.
