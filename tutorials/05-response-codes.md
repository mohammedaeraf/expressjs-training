# 🌐 Important HTTP Response Codes for APIs

## ✅ 2xx – Success Responses

### **200 OK**

* Request successful
* Common for **GET**, **PUT**, **DELETE**

📌 Example:

```json
{
  "message": "Data fetched successfully"
}
```

---

### **201 Created**

* New resource created successfully
* Used after **POST**

📌 Example:

```json
{
  "message": "User created"
}
```

---

### **204 No Content**

* Request successful but no response body
* Often used after DELETE

---

## ⚠️ 4xx – Client Errors (Request Issues)

### **400 Bad Request**

* Invalid input from client
* Missing fields, wrong data type

📌 Example:

```json
{
  "message": "Name and email are required"
}
```

---

### **401 Unauthorized**

* Authentication required or failed
* Missing or invalid token

📌 Example:

```json
{
  "message": "Unauthorized access"
}
```

---

### **403 Forbidden**

* Authenticated but **not allowed**
* User role does not have permission

---

### **404 Not Found**

* Resource does not exist
* Invalid API route or ID

📌 Example:

```json
{
  "message": "User not found"
}
```

---


## ❌ 5xx – Server Errors

### **500 Internal Server Error**

* Something went wrong on server
* Unhandled exceptions

📌 Example:

```json
{
  "message": "Something went wrong"
}
```

---

### **503 Service Unavailable**

* Server is down or overloaded
* Temporary issue

---

## 🧠 Most Common API Codes (Memorize These)

| Code | Meaning      | Used When             |
| ---- | ------------ | --------------------- |
| 200  | OK           | Data fetched          |
| 201  | Created      | Data added            |
| 400  | Bad Request  | Invalid input         |
| 401  | Unauthorized | Login / token missing |
| 403  | Forbidden    | No permission         |
| 404  | Not Found    | Wrong ID / route      |
| 500  | Server Error | Code crash            |

---

## 🎓 Useful Tip

> “If your API always returns 200, it’s not a good API.”

Correct status codes:

* Help frontend developers
* Improve debugging
* Make APIs professional

---

## 🧪 Express Usage Example

```js
res.status(201).json({ message: "User created" });

res.status(400).json({ message: "Invalid data" });

res.status(404).json({ message: "User not found" });
```

---

## 📌 One-Line Rule

> Status codes tell the frontend **what happened**, not just **what data came back**.
