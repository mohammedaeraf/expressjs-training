let mongoose = require("mongoose");

let customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  creditLimit: Number,
});

module.exports = mongoose.model("Customer", customerSchema);
