# 📘 MongoDB Naming Conventions (Best Practices)

## 🎯 Why Naming Conventions Matter

Good naming:

- Makes code **readable**
- Avoids confusion in large projects
- Matches **industry standards**
- Helps teams work together

MongoDB is flexible — but **discipline is your responsibility**.

---

## 1️⃣ Database Naming Conventions

### ✅ Recommended Rules

- Use **lowercase**
- Use **meaningful names**
- Avoid spaces and special characters
- Use **camelCase** or **snake_case**

### ❌ Avoid

```text
Accounting Database
MyDB!!!
Test123_DB
```

### ✅ Good Examples (Accounting Context)

```text
accountingdb
accounting_db
accountingApp
billingdb
finance_db
```

### ⭐ Recommended for Training

```text
accountingDB
```

📌 Why?
Readable + commonly used in Node/Express projects.

---

## 2️⃣ Collection Naming Conventions

### 🧠 Think of Collections as Tables

Collections usually represent **entities**.

### ✅ Recommended Rules

- Use **plural nouns**
- Use **lowercase**
- No spaces
- Be consistent across the app

### ❌ Avoid

```text
Customer
customerDetails
Customer_Table
```

### ✅ Good Accounting Examples

```text
customers
invoices
payments
expenses
vendors
ledgerEntries
```

### ⭐ Best Practice

> **Collection names should be plural**

```text
customers   // not customer
invoices    // not invoice
```

---

## 3️⃣ Document Naming (Field / Property Names)

Documents are **JSON objects**, so field naming follows **JavaScript conventions**.

### ✅ Recommended Rules

- Use **camelCase**
- Be descriptive but concise
- Avoid spaces
- Avoid special characters

### ❌ Avoid

```json
{
  "Customer Name": "Rahul",
  "credit-limit": 50000,
  "GST_NO": "29ABCDE1234F1Z5"
}
```

---

### ✅ Good Accounting Document Example

```json
{
  "_id": "65fa1234abcd",
  "customerName": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "creditLimit": 50000,
  "gstNumber": "29ABCDE1234F1Z5",
  "isActive": true,
  "createdAt": "2025-01-01T10:30:00.000Z"
}
```

📌 This aligns perfectly with **Express + Mongoose + JS**.

---

## 4️⃣ ID Naming Conventions

### 🔑 `_id` (MongoDB default)

- Always present
- Auto-generated
- Do **not rename or remove**

```json
"_id": "65fa1234abcd"
```

### Custom IDs (Optional)

If needed:

```json
{
  "customerCode": "CUST-1001"
}
```

📌 Still keep `_id` as primary identifier.

---

## 5️⃣ Date & Time Fields

### ✅ Best Practice

- Always use **ISO Date format**
- Use meaningful field names

```json
{
  "createdAt": "2025-01-01T10:30:00.000Z",
  "updatedAt": "2025-01-10T08:15:00.000Z"
}
```

❌ Avoid:

```json
"date": "01/01/25"
```

---

## 6️⃣ Boolean Field Naming

### ✅ Use `is`, `has`, `can`

```json
{
  "isActive": true,
  "hasOutstandingBalance": false,
  "isGstRegistered": true
}
```

This makes code read naturally:

```js
if (customer.isActive) { ... }
```

---

## 7️⃣ Numbers & Money Fields (Accounting-Specific)

### ✅ Best Practice

- Use **numbers**, not strings
- Use clear names

```json
{
  "creditLimit": 50000,
  "outstandingAmount": 12500,
  "totalInvoiceValue": 75000
}
```

❌ Avoid:

```json
"creditLimit": "50k"
```

---

## 8️⃣ Embedded Documents vs Separate Collections

### Example: Address (Embedded)

```json
{
  "customerName": "Rahul",
  "address": {
    "street": "MG Road",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560001"
  }
}
```

### Example: Payments (Separate Collection)

```text
payments
```

📌 Rule of thumb:

- **One-to-one** → embed
- **One-to-many** → separate collection

---

## 9️⃣ Summary Table (Very Useful Slide)

| Level      | Convention            | Example        |
| ---------- | --------------------- | -------------- |
| Database   | lowercase / camelCase | `accountingDB` |
| Collection | plural, lowercase     | `customers`    |
| Fields     | camelCase             | `creditLimit`  |
| Boolean    | is/has prefix         | `isActive`     |
| Dates      | ISO format            | `createdAt`    |

---

## 🎓 One-Line

> If it looks clean in JavaScript, it’s probably correct for MongoDB.

---

## 🧠 Industry Alignment

These conventions align with:

- Node.js
- Express
- Mongoose
- MERN stack
- Real accounting systems
