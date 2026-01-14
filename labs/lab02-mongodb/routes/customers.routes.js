const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: error,
    });
  }
});

// ===============================
// POST – Create Customer
// ===============================
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      data: savedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { email, phone } = req.query;

    let filter = {};

    if (email) {
      filter.email = email;
    }

    if (phone) {
      filter.phone = phone;
    }

    const customers = await Customer.find(filter);

    res.status(200).json({
      totalResults: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
    });
  }
});

// ===============================
// GET – Customer by ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({
      message: "Invalid customer ID",
    });
  }
});

// ===============================
// PUT – Update Customer
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
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
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid customer ID",
    });
  }
});

module.exports = router;
