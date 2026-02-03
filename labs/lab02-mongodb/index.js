require("dotenv").config();

let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let mongoDBUrl = process.env.MONGODB_URL_ACCOUNTING_DB;

let app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

mongoose
  .connect(mongoDBUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Routes
const customerRoutes = require("./routes/customers.routes");
app.use("/customers", customerRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
