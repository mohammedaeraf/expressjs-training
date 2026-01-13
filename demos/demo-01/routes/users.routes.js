// Demo router: simple in-memory CRUD for learning purposes.
// NOTE: This is for demo only — it does NOT persist data to a database and is not suitable for production.
const express = require("express");
// Middleware that validates incoming customer data (used by POST and PUT handlers)
const validateCustomer = require("../middlewares/validateCustomer");
const router = express.Router();

// In-memory users store (array of user objects with at least `id`, `name`, `email`)
let users = []; // In-memory storage for users (simulates a database)

// GET /users - Return all users as JSON
// Using `res.json()` sets Content-Type: application/json and stringifies the array
router.get("/", (req, res) => {
  res.json(users);
});

// GET /users/:id: Retrieve a specific user by ID
router.get("/:id", (req, res) => {
  // Parse the user ID from the URL parameters
  const id = parseInt(req.params.id);
  // Find the user object with the matching ID
  const userObj = users.find((user) => user.id === id);
  // If user not found, return a 404 error with a message
  if (!userObj) {
    res.statusCode = 404;
    res.json({
      message: "User not found!",
    });
  } else {
    // If found, return the user object with 200 status
    res.statusCode = 200;
    res.json(userObj);
  }
});

// DELETE /users/:id: Delete a user by ID
router.delete("/:id", (req, res) => {
  // Parse the user ID from the URL parameters
  const id = parseInt(req.params.id);
  // Find the user object with the matching ID
  const userObj = users.find((user) => user.id === id);
  // If user not found, return a 404 error with a message
  if (!userObj) {
    res.statusCode = 404;
    res.json({
      message: "User not found!",
    });
  } else {
    // Find the index of the user in the array and remove it
    const index = users.indexOf(userObj); // [1,2,3]
    users.splice(index, 1);
    // Respond with a success message
    res.json({
      message: "User deleted successfully",
    });
  }
});

// POST /users: Create a new user
// validateCustomer middleware ensures required fields (e.g., name, email) are present and valid
router.post("/", validateCustomer, (req, res) => {
  // Extract user data from the JSON request body (provided by express.json() in app)
  const userData = req.body;

  // Assign a simple incremental id (okay for demo, not for real concurrency)
  userData.id = users.length + 1; // Assign a unique ID to the new user
  // Add the new user to the in-memory array
  users.push(userData);

  // Respond with 201 Created status and JSON containing success message and user data
  res.status(201).json({
    message: "User created successfully",
    user: userData,
  });
});

// PUT /users/:id: Update an existing user
router.put("/:id", validateCustomer, (req, res) => {
  // Parse the user ID from the URL parameters
  const id = parseInt(req.params.id);

  // Find the user object with the matching ID
  const userObj = users.find((user) => user.id === id);
  // If user not found, return a 404 error with a message
  if (!userObj) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  // Update user details from the request body (validated by middleware)
  const userRequest = req.body;
  // Overwrite allowed fields (name and email) from the request
  userObj.name = userRequest.name;
  userObj.email = userRequest.email;

  // Respond with a success message and the updated user object
  res.json({
    message: "User updated successfully",
    user: userObj,
  });
});

// Export the configured router to be mounted by the main app (e.g., app.use('/users', usersRouter))
module.exports = router;

// logging, validation, authentication => middleware
