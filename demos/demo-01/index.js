/**
 * Simple Express demo server
 * - Demonstrates: creating the app, defining routes, and sending text and JSON responses
 * - Start: node index.js  (listens on port 3000)
 */

const express = require("express"); // Import the Express module

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies

const userRoutes = require("./routes/users.routes"); // Import the user routes module

app.use("/users", userRoutes); // Mount the user routes at the '/users' path
// Start the server and listen on port 3000. The callback runs once the server is ready.
app.listen(3000, () => {
  console.log("Express JS Backend running on http://localhost:3000");
});

// The following routes have been moved to routes/users.routes.js for better code organization

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
