### 📄 `README.md`

```markdown
# 📦 ExpressJS + MongoDB API Samples

This repository contains beginner-friendly code samples to demonstrate how to create RESTful APIs using **ExpressJS**, **Mongoose**, and **MongoDB**.

---

## 📚 Topics Covered

- Setup of an ExpressJS server
- Connecting to MongoDB (via Mongoose)
- Defining Mongoose models
- Creating API endpoints (GET, POST, PUT, DELETE)
- Using environment variables
- Project structure and organization

---

## 📁 Project Structure

```

express-mongo-api/
│
├── models/             # Mongoose schemas
│   └── Post.js
├── .env                # Environment variables (MongoDB URI, Port)
├── .gitignore
├── index.js            # Main server file
├── package.json

````

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/express-mongo-api.git
cd express-mongo-api
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

> Replace `your_mongodb_connection_string` with your actual MongoDB URI (from MongoDB Atlas or local instance).

---

## 🚀 Run the Server

### Development (with auto-reload using nodemon)

```bash
npm run dev
```

### Production

```bash
npm start
```

Once running, visit:
📍 `http://localhost:3000/api/posts` to test the API.

---

## 📬 Sample API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/posts`     | Get all posts       |
| POST   | `/api/posts`     | Create a new post   |
| PUT    | `/api/posts/:id` | Update a post by ID |
| DELETE | `/api/posts/:id` | Delete a post by ID |

> Note: POST/PUT require JSON body (e.g. `{ "title": "Post Title", "body": "Post Body" }`)

---

## 🧰 Tools Used

* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [Nodemon](https://www.npmjs.com/package/nodemon) (for dev)

---

## 🙌 Contributions

Feel free to fork, raise issues, or submit pull requests to improve the examples and add new features.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

```
