# 🌐 REST API Naming Conventions & HTTP Methods 

## 🎯 Learning Objectives

By the end of this tutorial, students will:

* Understand **what REST APIs are**
* Learn **standard URL naming conventions**
* Use correct **HTTP methods**
* Avoid common beginner mistakes

---

## 1️⃣ What is a REST API?

**REST** = Representational State Transfer

### Let's Breakdown the Term

* `Representational` → You don’t send the actual resource (like a database row or a file). Instead, you send a representation of it (JSON, XML, HTML, etc.).

* `State` → The resource has a current condition or "state" (e.g., a student record with name, age, grade).

* `Transfer` → That representation of the resource’s state is transferred between client and server over HTTP.

👉 Example:
If a student record exists in the database, a GET /students/1 request transfers a representation of that student’s state (like {"name":"Ana","grade":"A"}) to the client.

A REST API:

* Uses **HTTP**
* Works with **resources** (data)
* Uses **standard methods** to perform actions

📌 Example resource:

```
customers
items
invoices
```

---

## 2️⃣ Think in Terms of Resources (Most Important Rule)

In REST:

* URLs represent **things (nouns)**
* Actions are represented by **HTTP methods**

❌ Bad thinking:

```
createCustomer
getAllCustomers
```

✅ Correct thinking:

```
customers
```

---

## 3️⃣ Standard REST Naming Conventions (URLs)

### ✅ Use Nouns, Not Verbs

| ❌ Bad URL        | ✅ Good URL      |
| ---------------- | --------------- |
| `/getCustomers`  | `/customers`    |
| `/addItem`       | `/items`        |
| `/deleteInvoice` | `/invoices/:id` |

---

### ✅ Use Plural Resource Names

| ❌           | ✅            |
| ----------- | ------------ |
| `/customer` | `/customers` |
| `/item`     | `/items`     |
| `/invoice`  | `/invoices`  |

---

### ✅ Use Lowercase & Hyphens

| ❌                | ✅                 |
| ---------------- | ----------------- |
| `/CustomerList`  | `/customers`      |
| `/salesInvoices` | `/sales-invoices` |

📌 Avoid underscores in URLs.

---

## 4️⃣ HTTP Methods & Their Purpose

| Method | Purpose          |
| ------ | ---------------- |
| GET    | Read data        |
| POST   | Create data      |
| PUT    | Update (replace) |
| PATCH  | Update (partial) |
| DELETE | Delete data      |

---

## 5️⃣ CRUD Mapping (Must Memorize)

### Resource: `customers`

| Operation | Method | URL              |
| --------- | ------ | ---------------- |
| Create    | POST   | `/customers`     |
| Read all  | GET    | `/customers`     |
| Read one  | GET    | `/customers/:id` |
| Update    | PUT    | `/customers/:id` |
| Delete    | DELETE | `/customers/:id` |

📌 **Same URL, different methods**

---

## 6️⃣ Accounting App Examples (Real World)

### Customers

```
GET     /customers
POST    /customers
GET     /customers/:id
PUT     /customers/:id
DELETE  /customers/:id
```

### Items (Products)

```
GET     /items
POST    /items
GET     /items/:id
PUT     /items/:id
DELETE  /items/:id
```

### Invoices

```
GET     /invoices
POST    /invoices
GET     /invoices/:id
PUT     /invoices/:id
DELETE  /invoices/:id
```

---

## 7️⃣ Query Parameters (Filtering, Search, Pagination)

Use **query params**, not URL changes.

### ✅ Correct

```
/customers?page=1&limit=10
/customers?search=rahul
/items?isActive=true
```

### ❌ Wrong

```
/customers/page/1
/customers/search/rahul
```

---

## 8️⃣ Nested Resources (Relationships)

### Example: Customer → Invoices

```
GET /customers/:customerId/invoices
```

📌 Use nesting only when relationship is clear.

---

## 9️⃣ HTTP Status Codes (Quick Reminder)

| Code | Meaning      |
| ---- | ------------ |
| 200  | OK           |
| 201  | Created      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 404  | Not Found    |
| 500  | Server Error |

---

## 1️⃣0️⃣ Common Beginner Mistakes (Avoid These)

❌ Using verbs in URLs
❌ Using GET for create/update
❌ Mixing camelCase in URLs
❌ Returning 200 for everything
❌ Creating different URLs for each action

---

## 1️⃣1️⃣ Good vs Bad API Design (Comparison)

### ❌ Bad Design

```
POST /createCustomer
POST /updateCustomer
POST /deleteCustomer
```

### ✅ RESTful Design

```
POST /customers
PUT /customers/:id
DELETE /customers/:id
```

---

## 🎓 One-Line Rule 

> URLs represent resources, HTTP methods represent actions.

---

## 🧠 Interview-Friendly Answer

> REST APIs use nouns for URLs and HTTP methods to define actions on those resources.

---

## 🧪 Mini Assignment (Optional)

Design REST APIs for:

* `vendors`
* `payments`
* `expenses`
