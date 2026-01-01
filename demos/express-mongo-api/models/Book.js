const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genres: [String],
  pages: Number,
  rating: Number,
});

module.exports = mongoose.model("Book", bookSchema);
