/**
 * File Purpose:
 * Main entry point for the Express.js REST API server.
 * Connects to MongoDB using Mongoose, loads environment variables, and defines CRUD routes for blog posts.
 *
 * Author:
 * [Your Name Here]
 *
 * Detailed Explanatory Comments are provided throughout the file.
 */

const express = require("express"); // Import Express framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction
const dotenv = require("dotenv"); // Import dotenv to load environment variables
const Post = require("./models/Post"); // Import the Post Mongoose model

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB using connection string from environment variables
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,      // Use new URL parser to avoid deprecation warning
    useUnifiedTopology: true,   // Use new server discovery and monitoring engine
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------------- ROUTES ----------------------

// GET /api/posts
// Fetch all posts from the database
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find(); // Retrieve all posts
    res.json(posts); // Send posts as JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /api/posts/:id
// Fetch a single post by its ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Find post by ID
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID or error fetching post' });
  }
});

// POST /api/posts
// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const post = new Post(req.body); // Create new Post instance from request body
    await post.save(); // Save post to database
    res.status(201).json(post); // Respond with created post
  } catch (err) {
    res.status(400).json({ error: "Failed to create post" });
  }
});

// PUT /api/posts/:id
// Update an existing post by its ID
app.put("/api/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,      // ID of the post to update
      req.body,           // Updated fields
      {
        new: true,        // Return the updated document
        runValidators: true, // Validate before updating
      }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: "Failed to update post" });
  }
});

// DELETE /api/posts/:id
// Delete a post by its ID
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete post" });
  }
});

// ---------------------- SERVER START ----------------------

// Start the Express server on the specified port (default: 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
