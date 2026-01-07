const express = require("express");
const router = express.Router();

let users = [];

router.post("/", (request, response) => {
  const userData = request.body;

  if (!userData.email || !userData.name) {
    return response.status(400).json({
      message: "User name and email are required!",
    });
  }

  const validator = require("validator");

  if (!validator.isEmail(userData.email)) {
    return response.status(400).json({
      message: "Email is not in correct format",
    });
  }

  const age = userData.age;
  if (age === undefined || !Number.isInteger(age) || age < 18 || age > 100)
  {
    return response.status(400).json({
      message: "Age should be a number between 18 to 100"
    })
  }

  dob = userData.dob;
  if (!dob || !validator.isDate(dob)) {
    return response.status(400).json({
      message: "Invalid Date of Birth"
    })
  }

  userData.id = users.length + 1;
  users.push(userData);

  response.status(201).json({
    message: "User created successfully",
    user: userData,
  });
});

router.get("/", (req, res) => {
  res.json(users);
});

// GET Single User
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

// Update User
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userData = req.body;
  if (userData.name == null || userData.email == null) {
    return res.status(400).json({
      message: "User name and email are required",
    });
  } else if (!String(userData.name).trim() || !String(userData.email).trim()) {
    return res.status(400).json({
      message: "User name and email cannot be empty",
    });
  }

  user.name = userData.name;
  user.email = userData.email;

  res.json({
    message: "User updated successfully",
    user: user,
  });
});

// Delete Users
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    users = users.filter((user) => user.id !== userId);
    res.json({
      message: "User deleted successfully!",
    });
  }
});

module.exports = router;
