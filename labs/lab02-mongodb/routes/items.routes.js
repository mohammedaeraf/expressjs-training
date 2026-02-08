const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// ==========================================
// POST /items – Create Item
// ==========================================
router.post("/", async (req, res) => {
  try {
    const { name, rate, isTaxable, taxPercentage } = req.body;

    if (!name || rate === undefined || typeof isTaxable !== "boolean") {
      return res.status(400).json({
        message: "Name, rate and isTaxable are required",
      });
    }

    const item = new Item({
      name,
      rate,
      isTaxable,
      taxPercentage: isTaxable ? taxPercentage : 0,
    });

    const savedItem = await item.save();

    res.status(201).json({
      message: "Item created successfully",
      data: savedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create item",
    });
  }
});

// ==========================================
// GET /items – Get All Items
// ==========================================
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch items",
    });
  }
});

// ==========================================
// GET /items/:id – Get Item By ID
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Invalid item ID",
    });
  }
});

// ==========================================
// PUT /items/:id – Update Item
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    const { name, rate, isTaxable, taxPercentage } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        rate,
        isTaxable,
        taxPercentage: isTaxable ? taxPercentage : 0,
      },
      { new: true, runValidators: true },
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update item",
    });
  }
});

// ==========================================
// DELETE /items/:id – Delete Item
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid item ID",
    });
  }
});

module.exports = router;
