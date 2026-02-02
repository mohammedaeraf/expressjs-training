# 📝 Assignment: Full Stack Items Module (CORS + React Integration)

## 🎯 Objective

Build a full-stack feature where:

1. Express Items API enables CORS for a local React app
2. React fetches Items from API
3. React displays Items in table/card layout
4. React supports:

   * Filtering
   * Sorting
   * Pagination

---

# 🧠 Architecture Overview

```
React App (http://localhost:5173)
        ↓
CORS Enabled
        ↓
Express API (http://localhost:3000)
        ↓
MongoDB
```

---

# PART 1️⃣ – Backend (Express)

---

## ✅ Task 1: Enable CORS for Local React App

Install CORS:

```bash
npm install cors
```

In `index.js`:

```js
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
```

📌 Only allow React frontend.

---

## ✅ Task 2: Ensure GET /items Supports

Your existing endpoint must support:

```
GET /items
```

With query params:

| Feature    | Query Example                  |
| ---------- | ------------------------------ |
| Filtering  | `?name=USB`                    |
| Sorting    | `?sortBy=rate&order=asc`       |
| Pagination | `?page=1&limit=5`              |
| Combined   | `?name=USB&sortBy=rate&page=1` |

---

## ✅ Expected API Response

```json
{
  "totalItems": 25,
  "totalPages": 5,
  "currentPage": 1,
  "data": [
    {
      "_id": "123",
      "name": "USB Keyboard",
      "rate": 750,
      "unit": "pcs",
      "isTaxable": true
    }
  ]
}
```

---

# PART 2️⃣ – Frontend (React)

---

## 🛠 Setup React App

```bash
npm create vite@latest items-ui
cd items-ui
npm install
npm run dev
```

---

# 🎯 Task Requirements (React)

Create a component:

```
ItemsPage.jsx
```

It must:

✔ Fetch items from API
✔ Display in table OR card layout
✔ Filter by name
✔ Sort by rate
✔ Paginate

---

# 📄 Sample React Component Structure

### `ItemsPage.jsx`

```jsx
import { useEffect, useState } from "react";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  useEffect(() => {
    fetchItems();
  }, [name, sortBy, order, page]);

  const fetchItems = async () => {
    const response = await fetch(
      `http://localhost:3000/items?name=${name}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`
    );

    const data = await response.json();

    setItems(data.data);
    setTotalPages(data.totalPages);
  };

  return (
    <div>
      <h2>Items</h2>

      {/* Filter */}
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Sorting */}
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt">Newest</option>
        <option value="rate">Rate</option>
      </select>

      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      {/* Table Layout */}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rate</th>
            <th>Unit</th>
            <th>Taxable</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.rate}</td>
              <td>{item.unit}</td>
              <td>{item.isTaxable ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span> Page {page} of {totalPages} </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default ItemsPage;
```

---

# 🎨 Optional: Card Layout Instead of Table

Replace table with:

```jsx
<div>
  {items.map((item) => (
    <div key={item._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{item.name}</h3>
      <p>Rate: {item.rate}</p>
      <p>Unit: {item.unit}</p>
      <p>Taxable: {item.isTaxable ? "Yes" : "No"}</p>
    </div>
  ))}
</div>
```

---

# 🧪 What Students Must Demonstrate

✔ CORS works (no browser error)
✔ Data loads successfully
✔ Filtering works
✔ Sorting works
✔ Pagination works
✔ UI updates automatically
