/**
 * Simple Express demo server
 * - Demonstrates: creating the app, defining routes, and sending text and JSON responses
 * - Start: node index.js  (listens on port 3000)
 */

const express = require("express"); // Import the Express module

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies

// Start the server and listen on port 3000. The callback runs once the server is ready.
app.listen(3000, () => {
  console.log("Express JS Backend running on http://localhost:3000");
});

let users = []; // In-memory storage for users (simulates a database)

// Users route: responds with a JSON array of user objects.
// Using `response.json()` automatically sets the Content-Type to application/json
// GET /users: Retrieve all users as a JSON array
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
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

app.delete("/users/:id", (req, res) => {
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
app.post("/users", (request, response) => {
  // Extract user data from the JSON request body
  let userData = request.body; // Extract user data from the request body
  // console.log("User Data Received:", userData); // Log received data for debugging
  // Assign a unique ID based on the current length of the users array
  userData.id = users.length + 1; // Assign a unique ID to the new user
  // Add the new user to the in-memory array
  users.push(userData); // Add the user to the in-memory array

  // Respond with 201 Created status and JSON containing success message and user data
  response.status(201).json({
    // Respond with 201 Created status and JSON
    message: "User created successfully",
    user: userData,
  });
});


app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Find the user object with the matching ID
  const userObj = users.find((user) => user.id === id);
  // If user not found, return a 404 error with a message
  if (!userObj) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  const userRequest = req.body;
  userObj.name = userRequest.name;
  userObj.email = userRequest.email;

  res.json({
    message: "User updated succesffuly",
    user: userObj,
  });
});

// GET /: Root endpoint that returns a welcome message
// app.get("/", (request, response) => {
//   response.send("Welcome to Express JS!!");
// });

// // GET /about: About page endpoint
// app.get("/about", (request, response) => {
//   response.send("Response from About API EndPoint!!");
// });

// // GET /users/101: Retrieve a specific user (hard-coded for demo purposes)
// // Note: In a real application, use route parameters like '/users/:id' to fetch dynamically
// app.get("/users/101", (request, response) => {
//   response.json({
//     id: 101,
//     name: "Arif Attar",
//   });
// });
