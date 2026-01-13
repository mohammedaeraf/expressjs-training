/**
 * Simple Express demo server
 * - Demonstrates: creating the app, defining routes, and sending text and JSON responses
 * - Start: node index.js  (listens on port 3000)
 */

// NOTE: This is a small demo for learning purposes only. It intentionally omits production
// considerations such as security hardening, request rate limiting, and persistent storage.
const express = require("express"); // Import the Express module

const app = express(); // Create an Express application

// Parse incoming JSON request bodies and populate `req.body`.
// This middleware must be registered before route handlers that need access to the parsed body.
app.use(express.json());

// Import the users router (an Express `Router` instance) which defines user-related endpoints
// such as creating, reading, updating and deleting users.
const userRoutes = require("./routes/users.routes"); // Import the user routes module

// Mount the users router under the `/users` path. Endpoints defined inside `userRoutes`
// are relative to this mount point. For example:
// - GET  /users       -> list all users
// - GET  /users/:id   -> get user by id
app.use("/users", userRoutes); // Mount the user routes at the '/users' path
// Start the server and listen on port 3000. The callback runs once the server is ready.
// In real applications it's common to read the port from an environment variable, e.g.
// `const port = process.env.PORT || 3000` so the app can be configured by the runtime.
app.listen(3000, () => {
  console.log("Express JS Backend running on http://localhost:3000");
});
