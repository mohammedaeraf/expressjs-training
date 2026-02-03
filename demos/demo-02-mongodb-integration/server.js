require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://appifybrands.com"],
  }),
); // Enable CORS for all routes

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const customerRoutes = require("./routes/customers.routes");
app.use("/customers", customerRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
