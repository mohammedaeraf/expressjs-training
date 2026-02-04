// Load environment variables from a .env file (e.g. MONGO_URL, PORT)
require("dotenv").config();

// Core framework and middleware imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Create the Express application
const app = express();

// Parse incoming JSON requests and limit payload size to mitigate large body attacks
app.use(express.json({ limit: "10kb" }));

// Secure HTTP headers (helps protect against some well-known web vulnerabilities)
app.use(helmet());

// Enable CORS for specific origins used by the frontend(s)
// Adjust the list as needed for production deployments
app.use(
  cors({
    origin: ["http://localhost:5173", "http://appifybrands.com"],
  }),
);

// Basic rate limiter to prevent brute-force or excessive requests
// Here we limit to 3 requests per minute per IP (tweak for your needs)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per `windowMs`
});
app.use(limiter);

// Connect to MongoDB using Mongoose. Connection string is read from `process.env.MONGO_URL`.
// The promise chain logs success or failure to the console.
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Start the HTTP server on the port defined in env or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Mount routers for different resource groups. The route files define endpoints.
const customerRoutes = require("./routes/customers.routes");
app.use("/customers", customerRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
