const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

app.post("/users", (request, response) => {
  const userData = request.body;

  if (!userData.name || !userData.email) {
    response.status(400).json({
      message: "User name and email are required",
    });
  }

  userData.id = users.length + 1;
  users.push(userData);

  response.status(201).json({
    message: "User created successfully",
    user: userData,
  });
});

// GET Users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET Single User
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

// Update User
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const userData = req.body;
  if (!userData.name || !userData.email) {
    response.status(400).json({
      message: "User name and email are required",
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
app.delete("/users/:id", (req, res) => {
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

app.listen(3000, () => {
  console.log("Backend Express JS Server started at Port 3000");
});

// app.get("/", (request, response) => {
//   response.send(
//     "Welcome to first Express App! It's going to be fun and exciting"
//   );
// });

// app.get("/about", (request, response) => {
//   response.send(
//     "About Express JS.. Express JS is a framework to create backend"
//   );
// });

// app.get("/users", (request, response) => {
//   response.json([
//     {
//       id: 1,
//       name: "Aeraf",
//     },
//     {
//       id: 2,
//       name: "Nadeem",
//     },
//   ]);
// });
