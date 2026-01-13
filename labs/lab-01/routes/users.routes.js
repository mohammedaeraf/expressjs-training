// Router for handling simple in-memory user CRUD operations
// NOTE: This is a learning/example route and uses an in-memory array `users`.
// In production you'd persist users in a database instead of this array.
const express = require("express");
const router = express.Router();

// Import a small middleware used to validate incoming customer/user data
const validateCustomer = require("../middlewares/validateCustomer");

// In-memory store for users (used for demo purposes only)
let users = [];

// POST / - Create a new user
// Uses `validateCustomer` middleware to ensure request body is valid
router.post("/", validateCustomer, (req, res) => {
  // Read user data from request body (validated by middleware)
  const userData = req.body;

  // Assign a simple incremental id (not safe for concurrent/real apps)
  userData.id = users.length + 1;
  // Add the new user to the in-memory store
  users.push(userData);

  // Respond with 201 Created and the created user
  res.status(201).json({
    message: "User created successfully",
    user: userData,
  });
});

// GET / - Return the list of all users
router.get("/", (req, res) => {
  res.json(users);
});

// GET /:id - Return a single user by numeric id
// We use parseInt to convert the route param to a number and then find the user
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    // If not found, respond with 404 Not Found
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

// PUT /:id - Update an existing user's name and email
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    // User must exist to be updated
    return res.status(404).json({ message: "User not found" });
  }

  const userData = req.body;

  // Basic validation: ensure both fields are present and not empty strings
  if (userData.name == null || userData.email == null) {
    return res.status(400).json({
      message: "User name and email are required",
    });
  } else if (!String(userData.name).trim() || !String(userData.email).trim()) {
    // The String(...).trim() pattern ensures values are non-empty and not just whitespace
    return res.status(400).json({
      message: "User name and email cannot be empty",
    });
  }

  // Apply the updates to the found user object
  user.name = userData.name;
  user.email = userData.email;

  res.json({
    message: "User updated successfully",
    user: user,
  });
});

// DELETE /:id - Remove a user by id
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    // Filter the users array to exclude the deleted user
    users = users.filter((user) => user.id !== userId);
    res.json({
      message: "User deleted successfully!",
    });
  }
});

// Export the configured router to be mounted by the parent app
module.exports = router;
