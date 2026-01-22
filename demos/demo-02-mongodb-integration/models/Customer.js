// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the Customer model
// This schema specifies the structure and validation rules for customer documents in MongoDB
const customerSchema = new mongoose.Schema(
  {
    // Customer's full name - required field
    name: {
      type: String,
      required: true,
    },
    // Customer's email address - required field
    email: {
      type: String,
      required: true,
    },
    // Customer's phone number - required field
    phone: {
      type: String,
      required: true,
    },
    // Customer's credit limit - required number between 10,000 and 1,000,000
    creditLimit: {
      type: Number,
      required: true,
      min: 10000,
      max: 1000000,
    },
    // Flag indicating if the customer is active - defaults to true
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  // Enable automatic timestamps (createdAt and updatedAt fields)
  { timestamps: true },
);

// Create and export the Customer model based on the schema
// This model provides methods for interacting with the customers collection in MongoDB
module.exports = mongoose.model("Customer", customerSchema);

// Note: Mongoose automatically pluralizes "Customer" to create the "customers" collection in MongoDB
