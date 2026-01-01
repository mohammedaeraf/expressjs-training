/**
 * Simple Express demo server
 * - Demonstrates: creating the app, defining routes, and sending text and JSON responses
 * - Start: node index.js  (listens on port 3000)
 */

const express = require("express"); // Import the Express module

const app = express(); // Create an Express application

// Start the server and listen on port 3000. The callback runs once the server is ready.
app.listen(3000, () => {
  console.log("Express JS Backend running on http://localhost:3000");
});

// Root route: responds with a plain text welcome message.
app.get("/", (request, response) => {
  response.send("Welcome to Express JS!!");
});

// About route: another example of a text response for a different endpoint.
app.get("/about", (request, response) => {
  response.send("Response from About API EndPoint!!");
});

// Users route: responds with a JSON array of user objects.
// Using `response.json()` automatically sets the Content-Type to application/json
app.get("/users", (request, response) => {
  response.json([
    {
      id: 100,
      name: "Nadeem Khan",
    },
    {
      id: 101,
      name: "Arif Attar",
    },
  ]);
});

// Specific user route: returns a single user object as JSON.
// Note: This route is hard-coded for user id 101 for demonstration purposes.
// In real applications you would capture route params (e.g., '/users/:id') and fetch data dynamically.
app.get("/users/101", (request, response) => {
  response.json({
    id: 101,
    name: "Arif Attar",
  });
});
