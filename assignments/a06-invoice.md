# 📝 Assignment 06: Invoices API (Customers + Items + Calculations)

## 🎯 Objective

Create **Invoice APIs** that:

* Link **Customers** and **Items**
* Perform **amount, tax, and total calculations**
* Store computed values in MongoDB
* Reflect how **real accounting software (Zoho Books–style)** works

---

## 🧠 Business Context (Explain to Students)

An **Invoice**:

* Is issued to a **Customer**
* Contains **multiple Items**
* Calculates:

  * Subtotal
  * Tax
  * Grand Total

📌 This assignment introduces **relationships and calculations**, not just CRUD.

---

## 🛠 Tech Stack

* Express.js
* MongoDB
* Mongoose
* Existing **Customer** & **Item** models

---

## 📁 Suggested Project Structure

```
accounting-app/
├── index.js
├── models/
│   ├── Customer.js
│   ├── Item.js
│   └── Invoice.js
├── routes/
│   ├── customers.routes.js
│   ├── items.routes.js
│   └── invoices.routes.js
├── middlewares/
│   └── validateInvoice.js
├── .env
└── package.json
```

---

## 📌 Invoice Model (Required Fields)

| Field            | Type                    | Description         |
| ---------------- | ----------------------- | ------------------- |
| customer         | ObjectId (ref Customer) | Invoice customer    |
| items            | Array                   | Line items          |
| items[].item     | ObjectId (ref Item)     | Product             |
| items[].quantity | Number                  | Qty                 |
| items[].rate     | Number                  | Snapshot price      |
| items[].amount   | Number                  | qty × rate          |
| subTotal         | Number                  | Sum of item amounts |
| taxTotal         | Number                  | Total tax           |
| grandTotal       | Number                  | subTotal + tax      |
| status           | String                  | draft / sent / paid |
| createdAt        | Date                    | Auto                |

📌 Use `timestamps: true`

---

## 🧩 Tasks to Complete

---

## ✅ Task 1: Create Invoice Model

Students must:

* Use `ObjectId` references
* Store **calculated fields**
* Not calculate totals on frontend

---

## ✅ Task 2: Create POST Invoice API

### Endpoint

```
POST /invoices
```

### Request Body (Sample)

```json
{
  "customer": "CUSTOMER_ID",
  "items": [
    {
      "item": "ITEM_ID",
      "quantity": 2
    },
    {
      "item": "ITEM_ID",
      "quantity": 1
    }
  ]
}
```

---

### Calculation Rules (Mandatory)

For each item:

```
amount = quantity × rate
```

Invoice totals:

```
subTotal = sum of all amounts
tax = amount × (taxPercentage / 100)
grandTotal = subTotal + taxTotal
```

📌 Rates & tax must be fetched from **Item model**, not request body.

---

## ✅ Task 3: Add Validation Middleware

Validate:

* Customer exists
* Items array is not empty
* Quantity > 0
* Item exists
* Duplicate items not allowed

---

## ✅ Task 4: GET All Invoices

### Endpoint

```
GET /invoices
```

Requirements:

* Populate customer name
* Populate item name
* Sort by latest first

---

## ✅ Task 5: GET Invoice by ID

### Endpoint

```
GET /invoices/:id
```

Requirements:

* Populate customer & items
* Return full invoice
* 404 if not found

---

## 🧪 Sample Invoice Response

```json
{
  "_id": "65fb456def",
  "customer": {
    "_id": "65fa123abc",
    "name": "Rahul Sharma"
  },
  "items": [
    {
      "item": {
        "_id": "65fa999xyz",
        "name": "USB Keyboard"
      },
      "quantity": 2,
      "rate": 750,
      "amount": 1500
    }
  ],
  "subTotal": 1500,
  "taxTotal": 270,
  "grandTotal": 1770,
  "status": "draft"
}
```

---

## 🚦 Expected HTTP Status Codes

| Scenario         | Status |
| ---------------- | ------ |
| Invoice created  | 201    |
| Fetch success    | 200    |
| Validation error | 400    |
| Not found        | 404    |

---

## 🧠 Rules to Follow (Very Important)

* Never trust frontend calculations
* Always calculate totals in backend
* Do not store floating-point errors (round to 2 decimals)
* Use `populate()` properly

---

> This assignment connects data, logic, and business rules into one real feature.