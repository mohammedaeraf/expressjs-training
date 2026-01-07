# ✅ Validation in Express using `validator` 

## 🎯 What You Will Learn

By the end of this tutorial, you will be able to:

* Understand **why backend validation is important**
* Use the **validator** library
* Validate customer fields like **email, age, date, phone, GST**
* Create reusable validation middleware

---

## 🤔 Why Do We Need Validation?

Frontend validation **can be bypassed**.

Backend validation ensures:

* Correct data is stored
* App does not crash
* Business rules are enforced

📌 Rule:

> **Never trust data coming from the client**

---

## 📦 Step 1: Install Validator

Inside your Express project:

```bash
npm install validator
```

---

## 📁 Step 2: Customer Fields We Will Validate

| Field       | Rule                        |
| ----------- | --------------------------- |
| name        | Required, min 3 chars       |
| email       | Valid email                 |
| phone       | Valid mobile number         |
| age         | Number (18–100)             |
| dateOfBirth | Valid date, not future      |
| creditLimit | Positive number             |
| gstNumber   | Valid GST format (optional) |

---

## 📄 Step 3: Create Validation Middleware

Create a file:

```
middlewares/validateCustomer.js
```

---

### ✨ `validateCustomer.js`

```js
const validator = require("validator");

const validateCustomer = (req, res, next) => {
  const {
    name,
    email,
    phone,
    age,
    dateOfBirth,
    creditLimit,
    gstNumber
  } = req.body;

  // 1️⃣ Name
  if (!name || name.trim().length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters long"
    });
  }

  // 2️⃣ Email
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      message: "Invalid email format"
    });
  }

  // 3️⃣ Phone
  if (!phone || !validator.isMobilePhone(phone, "en-IN")) {
    return res.status(400).json({
      message: "Invalid mobile number"
    });
  }

  // 4️⃣ Age
  if (
    age === undefined ||
    !Number.isInteger(age) ||
    age < 18 ||
    age > 100
  ) {
    return res.status(400).json({
      message: "Age must be between 18 and 100"
    });
  }

  // 5️⃣ Date of Birth
  if (!dateOfBirth || !validator.isDate(dateOfBirth)) {
    return res.status(400).json({
      message: "Invalid date format (YYYY-MM-DD)"
    });
  }

  if (new Date(dateOfBirth) > new Date()) {
    return res.status(400).json({
      message: "Date of birth cannot be in the future"
    });
  }

  // 6️⃣ Credit Limit
  if (
    creditLimit !== undefined &&
    (isNaN(creditLimit) || creditLimit < 0)
  ) {
    return res.status(400).json({
      message: "Credit limit must be a positive number"
    });
  }

  // 7️⃣ GST Number (Optional)
  if (
    gstNumber &&
    !validator.matches(
      gstNumber,
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    )
  ) {
    return res.status(400).json({
      message: "Invalid GST number format"
    });
  }

  // ✅ All validations passed
  next();
};

module.exports = validateCustomer;
```

---

## 🔗 Step 4: Use Validation in Route

### 📄 `routes/customers.routes.js`

```js
const express = require("express");
const router = express.Router();
const validateCustomer = require("../middlewares/validateCustomer");

router.post("/", validateCustomer, (req, res) => {
  res.status(201).json({
    message: "Customer created successfully",
    customer: req.body
  });
});

module.exports = router;
```

---

## 🧪 Step 5: Test Using Thunder Client or Postman

### ✅ Valid Request (Success)

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "age": 30,
  "dateOfBirth": "1994-05-12",
  "creditLimit": 50000,
  "gstNumber": "29ABCDE1234F1Z5"
}
```

---

### ❌ Invalid Request (Failure)

```json
{
  "name": "Ra",
  "email": "wrongmail",
  "phone": "123",
  "age": 12,
  "dateOfBirth": "2030-01-01"
}
```

Response:

```json
{
  "message": "Name must be at least 3 characters long"
}
```

---

## 🧠 Key Learning Points 

* Validation happens **before route logic**
* Middleware stops request using `return res.status(...)`
* `next()` means “continue to controller”
* One validation failure = stop processing

---

## 🎓 Important Points

> “Frontend validation improves UX.
> Backend validation protects the system.”

