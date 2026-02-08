const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    isTaxable: { type: Boolean, required: true },
    taxPercentage: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
