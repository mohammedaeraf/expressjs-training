const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// GET /vendors
// Supports: pagination (page, limit), sorting (sortBy, order), filtering (name, email, city, taxNumber, isActive), full-text-like search (q)
router.get("/", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const sortBy = req.query.sortBy || "createdAt";
		const order = req.query.order === "asc" ? 1 : -1;
		const q = req.query.q; // generic search

		const filter = {};
		if (req.query.name) {
			filter.name = { $regex: req.query.name, $options: "i" };
		}
		if (req.query.email) {
			filter.email = { $regex: req.query.email, $options: "i" };
		}
		if (req.query.city) {
			filter["billingAddress.city"] = { $regex: req.query.city, $options: "i" };
		}
		if (req.query.taxNumber) {
			filter.taxNumber = { $regex: req.query.taxNumber, $options: "i" };
		}
		if (req.query.isActive !== undefined) {
			filter.isActive = req.query.isActive === "true";
		}

		if (q) {
			const re = new RegExp(q, "i");
			filter.$or = [
				{ name: re },
				{ displayName: re },
				{ "contact.name": re },
				{ email: re },
				{ taxNumber: re },
				{ "billingAddress.city": re },
			];
		}

		const skip = (page - 1) * limit;

		const [data, total] = await Promise.all([
			Vendor.find(filter).sort({ [sortBy]: order }).skip(skip).limit(limit),
			Vendor.countDocuments(filter),
		]);

		res.status(200).json({
			page,
			limit,
			sortBy,
			order: order === 1 ? "asc" : "desc",
			total,
			totalPages: Math.ceil(total / limit),
			data,
		});
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch vendors", error: error.message });
	}
});

// POST /vendors - create
router.post("/", async (req, res) => {
	try {
		const vendor = new Vendor(req.body);
		const saved = await vendor.save();
		res.status(201).json({ message: "Vendor created successfully", data: saved });
	} catch (error) {
		res.status(400).json({ message: "Failed to create vendor", error: error.message });
	}
});

// GET /vendors/:id
router.get("/:id", async (req, res) => {
	try {
		const vendor = await Vendor.findById(req.params.id);
		if (!vendor) return res.status(404).json({ message: "Vendor not found" });
		res.status(200).json(vendor);
	} catch (error) {
		res.status(400).json({ message: "Invalid vendor ID" });
	}
});

// PUT /vendors/:id - update
router.put("/:id", async (req, res) => {
	try {
		const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated) return res.status(404).json({ message: "Vendor not found" });
		res.status(200).json({ message: "Vendor updated successfully", data: updated });
	} catch (error) {
		res.status(400).json({ message: "Failed to update vendor", error: error.message });
	}
});

// DELETE /vendors/:id
router.delete("/:id", async (req, res) => {
	try {
		const deleted = await Vendor.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ message: "Vendor not found" });
		res.status(200).json({ message: "Vendor deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: "Invalid vendor ID" });
	}
});

module.exports = router;

