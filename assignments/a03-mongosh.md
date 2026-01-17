# 📝 MongoDB Shell Assignment

## Topic: Basic Commands (Customers Collection)

---

## 📌 Assignment Overview

**Database Name:** `crm`
**Collection Name:** `customers`

You must perform all operations using **MongoDB Shell (`mongosh`)**.

---

## 🔹 Part A: Database & Collection Setup

1. List all existing databases.
2. Switch to a database named **`crm`**.
3. Verify the current database.
4. Display all collections in the `crm` database.
5. Create a collection named **`customers`** by inserting a document.

---

## 🔹 Part B: Insert Operations

### 1️⃣ Insert One Customer

Insert the following customer:

* Name: Rahul Sharma
* Email: [rahul.sharma@gmail.com](mailto:rahul.sharma@gmail.com)
* Phone: 9876543210
* Credit Limit: 50000

---

### 2️⃣ Insert Multiple Customers

Insert **at least 5 customer documents** with the following fields:

* `name`
* `email`
* `phone`
* `creditLimit`

> Credit limits should be different for each customer.

---

## 🔹 Part C: Find Operations

6. Fetch **all customers** from the collection.
7. Fetch customers with a **credit limit greater than 70,000**.
8. Fetch only the **name and email** of all customers.
9. Fetch customer details whose **name is "Rahul Sharma"**.
10. Fetch customers whose **credit limit is between 50,000 and 1,00,000**.

---

## 🔹 Part D: Sorting & Limiting

11. Display customers sorted by **creditLimit in ascending order**.
12. Display customers sorted by **creditLimit in descending order**.
13. Fetch **top 3 customers** with the highest credit limit.
14. Fetch **first 2 customers** from the collection.

---

## 🔹 Part E: Combined Queries

15. Fetch **only name and creditLimit**, sorted by creditLimit (descending), limited to **5 customers**.
16. Fetch customers with creditLimit > 60,000, sorted in ascending order, limited to **3 records**.

---

## 🔹 Part F: Observation Questions (Write Answers)

17. What happens if you use `use crm` before inserting any data?
18. Why do some databases not appear when running `show dbs`?
19. What is the difference between `find()` and `findOne()`?
20. Why is sorting recommended before using `limit()`?

---

## 🎯 Bonus Task (Optional)

* Add a new field `isActive: true` to all customers with creditLimit above 80,000.
* Display only active customers.

---

## ✅ Evaluation Criteria

| Criteria                 | Marks   |
| ------------------------ | ------- |
| Correct MongoDB commands | 40      |
| Query accuracy           | 30      |
| Sorting & limiting logic | 20      |
| Conceptual answers       | 10      |
| **Total**                | **100** |

---

## 📌 Submission Guidelines

* Submit **MongoDB shell commands** (copy-paste)
* Include outputs where required
* Answer observation questions in text
