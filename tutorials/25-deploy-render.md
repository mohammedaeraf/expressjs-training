# 🚀 Deploying an Express App on Render (Begininer Tutorial)

## 🎯 What You Will Learn

By the end of this tutorial, you will be able to:

* Understand what **Render** is
* Prepare an Express app for deployment
* Push code to **GitHub**
* Deploy Express app on **Render**
* Access your **live API URL**

---

## 1️⃣ What is Render?

**Render** is a **cloud platform** that allows you to deploy:

* Node.js / Express apps
* Static websites
* APIs
* Background services

### Why Render?

* Free tier available
* Easy GitHub integration
* Automatic redeploy on code changes
* Beginner friendly

📌 Think of Render as **Heroku’s modern alternative**.

---

## 2️⃣ Prerequisites (Must Have)

Before deploying:

* Express app working locally
* Code pushed to **GitHub**
* Render account (free)

---

## 3️⃣ Prepare Your Express App for Deployment

### ✅ Step 1: Use Dynamic Port (Very Important)

❌ Wrong (local-only):

```js
app.listen(3000);
```

✅ Correct (Render-friendly):

```js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Render provides the `PORT` automatically.

---

### ✅ Step 2: Ensure `package.json` is Correct

```json
{
  "name": "express-render-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

📌 Render runs `npm start`.

---

### ✅ Step 3: Environment Variables

❌ Do NOT hardcode secrets:

```js
mongoose.connect("mongodb+srv://user:pass@...");
```

✅ Use environment variables:

```js
mongoose.connect(process.env.MONGO_URL);
```

---

## 4️⃣ Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial Express app"
git branch -M main
git remote add origin https://github.com/username/express-render-app.git
git push -u origin main
```

---

## 5️⃣ Create a Render Account

![Image](https://us1.discourse-cdn.com/flex016/uploads/render/original/2X/6/6b26c3de2ab93622f35b48cb934010a2dbbf2a05.png)

![Image](https://render.com/docs-assets/369450362213601ab924a4b14b79cf6bbf01ec6c84558b9fba2e861833a69d4f/render-dashboard.webp)

Steps:

1. Go to Render website
2. Sign up using **GitHub**
3. Authorize access

---

## 6️⃣ Deploy Express App on Render

![Image](https://render.com/docs-assets/79336b21bd3a9df721a1dcad52fb19de066c44d8bfc1b8273031a37b85e7be47/new-web-service.png)

![Image](https://render.com/docs-assets/9b15bc6c97d02a8c865c96cf2cea326b450cb7c1f96eea9c436b8cd785fa47bb/deploy-events.png)

### Step-by-Step:

1. Go to Render Dashboard

2. Click **New → Web Service**

3. Select your **GitHub repository**

4. Configure:

   * **Name**: express-api
   * **Environment**: Node
   * **Branch**: main
   * **Build Command**:

     ```
     npm install
     ```
   * **Start Command**:

     ```
     npm start
     ```

5. Click **Create Web Service**

⏳ Deployment takes 2–5 minutes.

---

## 7️⃣ Add Environment Variables in Render

1. Open your service
2. Go to **Environment**
3. Add variables:

| Key       | Value                  |
| --------- | ---------------------- |
| MONGO_URL | your MongoDB Atlas URL |
| NODE_ENV  | production             |

Click **Save Changes**

---

## 8️⃣ Verify Deployment

After deployment, Render provides a **public URL**:

```
https://your-app-name.onrender.com
```

Test:

```
GET https://your-app-name.onrender.com/customers
```

🎉 Your Express API is live!

---

## 9️⃣ Common Deployment Errors & Fixes

### ❌ App crashes immediately

✔ Check logs
✔ Ensure `npm start` exists

---

### ❌ MongoDB connection error

✔ Check `MONGO_URL`
✔ Atlas IP whitelist → `0.0.0.0/0`

---

### ❌ Port error

✔ Use `process.env.PORT`

---

## 1️⃣0️⃣ Free Tier Limitations (Explain to Students)

* App sleeps after inactivity
* First request may take 20–30 seconds
* Not for heavy production use

📌 Fine for learning & demos.

---

## 🎓 Summary 

> Render allows us to deploy Express apps to the internet with minimal configuration.

---

## 🧠 Interview-Friendly Answer

> Render is a cloud platform that hosts Node.js applications and deploys them automatically from GitHub.