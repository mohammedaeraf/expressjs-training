const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const validateCustomer = require("../middlewares/validateCustomer");

// ===============================
// GET – Customers (Pagination Only)
// ===============================
// router.get("/", async (req, res) => {
//   try {
//     // 1️⃣ Read query params
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     // 2️⃣ Calculate skip value
//     const skip = (page - 1) * limit;

//     // 3️⃣ Fetch paginated data
//     const customers = await Customer.find()
//       .skip(skip)
//       .limit(limit)
//       .sort({ _id: -1 });

//     // 4️⃣ Get total count
//     const totalCustomers = await Customer.countDocuments();

//     // 5️⃣ Send response
//     res.status(200).json({
//       page,
//       limit,
//       totalCustomers,
//       totalPages: Math.ceil(totalCustomers / limit),
//       data: customers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch customers",
//       error: error.message,
//     });
//   }
// });

// ===============================
// GET – Customers (Sorting Only)
// ===============================
// router.get("/", async (req, res) => {
//   try {
//     // Read query params
//     const sortBy = req.query.sortBy || "createdAt";
//     const order = req.query.order === "asc" ? 1 : -1;

//     // Fetch sorted customers
//     const customers = await Customer.find().sort({
//       [sortBy]: order,
//     });

//     res.status(200).json({
//       sortBy,
//       order: order === 1 ? "asc" : "desc",
//       totalCustomers: customers.length,
//       data: customers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch customers",
//       error: error.message,
//     });
//   }
// });

// ===============================
// GET – Customers (Sorting + Pagination)
// ===============================
// router.get("/", async (req, res) => {
//   try {
//     // 1️⃣ Read query params
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const sortBy = req.query.sortBy || "createdAt";
//     const order = req.query.order === "asc" ? 1 : -1;

//     // 2️⃣ Calculate skip
//     const skip = (page - 1) * limit;

//     // 3️⃣ Fetch data
//     const customers = await Customer.find()
//       .sort({ [sortBy]: order })
//       .skip(skip)
//       .limit(limit);

//     // 4️⃣ Total count
//     const totalCustomers = await Customer.countDocuments();

//     // 5️⃣ Send response
//     res.status(200).json({
//       page,
//       limit,
//       sortBy,
//       order: order === 1 ? "asc" : "desc",
//       totalCustomers,
//       totalPages: Math.ceil(totalCustomers / limit),
//       data: customers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch customers",
//       error: error.message,
//     });
//   }
// });

// Code below for Search
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
// GET – Customers (Simple Fetch without Sort, Filter or Pagination)
// ===============================
router.get("/", async (req, res) => {
  try {
    const { email, phone } = req.query;

    let filter = {};

    if (email) {
      filter.email = email;
    }

    if (phone) {
      filter.phone = phone;
    }
    console.log(filter);

    const customers = await Customer.find(filter);

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
router.post("/", validateCustomer, async (req, res) => {
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
router.put("/:id", validateCustomer, async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
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
