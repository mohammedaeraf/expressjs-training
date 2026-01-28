/**
 * Customer Routes Module
 *
 * This file defines all RESTful API routes for customer-related operations.
 * It handles CRUD (Create, Read, Update, Delete) operations for customers stored in MongoDB.
 * Uses Mongoose ODM for data persistence and validation.
 *
 * Dependencies:
 *   - express: Framework for building the API routes
 *   - Customer: Mongoose model for interacting with the customers collection
 *   - validateCustomer: Middleware to validate customer input data
 */

const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const validateCustomer = require("../middlewares/validateCustomer");

/**
 * POST /customers
 * Create a new customer
 *
 * - Validates input data using validateCustomer middleware
 * - Creates a new Customer document in MongoDB
 * - Returns 201 Created with the new customer data
 * - Returns 400 Bad Request if validation fails
 */
router.post("/", validateCustomer, async (req, res) => {
  try {
    // Instantiate a new Customer with data from the request body
    const customer = new Customer(req.body);
    // Persist the customer to MongoDB database
    await customer.save();
    // Return the created customer with HTTP 201 status
    res.status(201).json(customer);
  } catch (error) {
    // Handle validation or database errors
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /customers
 * Retrieve all customers with optional filtering and sorting
 *
 * Query Parameters:
 *   - name: Filter by customer name (case-insensitive regex search)
 *   - email: Filter by customer email (case-insensitive regex search)
 *   - sortBy: Field to sort by (default: "createdAt")
 *   - order: Sort order - "asc" for ascending, anything else for descending (default: descending)
 *
 * Returns:
 *   - 200 OK with array of customers and metadata (sortOrder, totalCount)
 *   - 500 Internal Server Error if database query fails
 */
router.get("/", async (req, res) => {
  try {
    // Extract query parameters for filtering and sorting
    const queryString = req.query;

    // Build MongoDB filter object based on query parameters
    let filter = {};

    // Name filter: case-insensitive regex search using MongoDB $regex operator
    if (queryString.name) {
      filter.name = {
        $regex: queryString.name,
        $options: "i", // "i" flag makes regex case-insensitive
      };
    }

    // Email filter: case-insensitive regex search
    if (queryString.email) {
      filter.email = {
        $regex: queryString.email,
        $options: "i",
      };
    }

    // Determine sort field and sort order (1 = ascending, -1 = descending)
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order == "asc" ? 1 : -1;

    // Query database with filter and sort, then convert to array
    const customers = await Customer.find(filter).sort({
      [sortBy]: order,
    });

    // Return results with metadata about the query
    res.status(200).json({
      sortOrder: sortBy,
      order: order === 1 ? "asc" : "desc",
      totalCustomers: customers.length,
      data: customers,
    });
  } catch (error) {
    // Handle database or query errors
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /customers/:id
 * Retrieve a specific customer by their MongoDB ObjectId
 *
 * URL Parameters:
 *   - id: MongoDB ObjectId of the customer (must be valid 24-character hex string)
 *
 * Returns:
 *   - 200 OK with the customer object
 *   - 404 Not Found if customer doesn't exist
 *   - 400 Bad Request if ID format is invalid
 */
router.get("/:id", async (req, res) => {
  try {
    // Query MongoDB for a customer matching the provided ID
    const customer = await Customer.findById(req.params.id);

    // If no customer found, return 404 error
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Return the found customer document
    res.status(200).json(customer);
  } catch (error) {
    // Handle invalid ObjectId format or other database errors
    res.status(400).json({
      message: "Invalid Customer ID",
    });
  }
});

/**
 * PUT /customers/:id
 * Update an existing customer
 *
 * - Validates updated data using validateCustomer middleware
 * - Updates the customer document with new data
 * - Runs Mongoose validators on the updated data
 * - Returns 200 OK with updated customer object
 * - Returns 404 Not Found if customer doesn't exist
 * - Returns 400 Bad Request if validation fails or ID is invalid
 */
router.put("/:id", validateCustomer, async (req, res) => {
  try {
    // Find and update the customer in a single atomic operation
    // Options:
    //   - new: true: Returns the updated document instead of the original
    //   - runValidators: true: Runs Mongoose schema validators on the update
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    // If customer not found, return 404 error
    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Return success response with the updated customer data
    res.status(200).json({
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    // Handle validation errors or invalid ObjectId format
    res.status(400).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

/**
 * DELETE /customers/:id
 * Delete a customer
 *
 * - Removes the customer document from MongoDB
 * - Returns 200 OK with success message
 * - Returns 404 Not Found if customer doesn't exist
 * - Returns 400 Bad Request if ID format is invalid
 */
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the customer in a single atomic operation
    // Returns the deleted document if found, null if not found
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    // If customer not found, return 404 error
    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Return success response
    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    // Handle invalid ObjectId format or other database errors
    res.status(400).json({
      message: "Invalid customer ID",
    });
  }
});

/**
 * Export the router module
 * This router is used in server.js and mounted at a base path (e.g., /customers)
 * making all routes accessible at /customers, /customers/:id, etc.
 */
module.exports = router;
