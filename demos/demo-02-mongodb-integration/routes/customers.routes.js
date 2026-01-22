const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const validateCustomer = require("../middlewares/validateCustomer");

// This file defines the routes for customer-related operations in the Express.js application.
// It handles CRUD (Create, Read, Update, Delete) operations for customers using MongoDB via Mongoose.
// Each route uses async/await for handling asynchronous database operations.

// ===============================
// POST – Create Customer
// ===============================
router.post("/", validateCustomer, async (req, res) => {
  try {
    // Create a new Customer instance using the data from the request body
    const customer = new Customer(req.body);
    // Save the customer to the MongoDB database
    await customer.save();
    // Respond with the created customer and a 201 Created status
    res.status(201).json(customer);
  } catch (error) {
    // If an error occurs (e.g., validation error), respond with a 400 Bad Request status and the error message
    res.status(400).json({ error: error.message });
  }
});

// ===============================
// GET – GET All Customers
// ===============================
router.get("/", async (req, res) => {
  try {
    // Retrieve all customers from the database using the Customer model's find method
    const customers = await Customer.find();
    // Respond with the list of customers and a 200 OK status
    res.status(200).json(customers);
  } catch (error) {
    // If an error occurs during the database query, respond with a 500 Internal Server Error status and the error message
    res.status(500).json({ error: error.message });
  }
});

// ===============================
// GET – GET Customer by ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    // Find a customer by their ID using the Customer model's findById method
    // The ID is extracted from the URL parameters (req.params.id)
    const customer = await Customer.findById(req.params.id);

    // If no customer is found with the given ID, return a 404 Not Found status
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // If the customer is found, respond with the customer data and a 200 OK status
    res.status(200).json(customer);
  } catch (error) {
    // If an error occurs (e.g., invalid ObjectId format), respond with a 400 Bad Request status
    res.status(400).json({
      message: "Invalid Customer ID",
    });
  }
});

// ===============================
// PUT – Update Customer
// ===============================
router.put("/:id", validateCustomer, async (req, res) => {
  try {
    // Update the customer with the given ID using the data from the request body
    // findByIdAndUpdate returns the updated document if 'new: true' is set
    // runValidators: true ensures that Mongoose validators are run on the update
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    // If no customer is found with the given ID, return a 404 Not Found status
    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // If the update is successful, respond with a success message and the updated customer data
    res.status(200).json({
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    // If an error occurs (e.g., validation error or invalid ID), respond with a 400 Bad Request status
    res.status(400).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

// ===============================
// DELETE – Customer
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    // Delete the customer with the given ID from the database
    // findByIdAndDelete returns the deleted document if found
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    // If no customer is found with the given ID, return a 404 Not Found status
    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // If the deletion is successful, respond with a success message
    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    // If an error occurs (e.g., invalid ID format), respond with a 400 Bad Request status
    res.status(400).json({
      message: "Invalid customer ID",
    });
  }
});

// Export the router so it can be used in other parts of the application (e.g., in server.js)
module.exports = router;
