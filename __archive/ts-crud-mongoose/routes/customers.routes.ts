import { Router, Request, Response, NextFunction } from "express";
import Customer, { CustomerDocument, ICustomer } from "../models/Customer";

const router = Router();

// GET /customers
router.get("/", async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch customers", error: err });
  }
});

// POST /customers
router.post("/", async (req: Request<{}, {}, ICustomer>, res: Response) => {
  try {
    const customer = new Customer(req.body);
    const saved = await customer.save();
    res
      .status(201)
      .json({ message: "Customer created successfully", data: saved });
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Failed to create customer", error: err.message });
  }
});

// GET /customers/:id
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch {
    res.status(400).json({ message: "Invalid customer ID" });
  }
});

// PUT /customers/:id
router.put(
  "/:id",
  async (
    req: Request<{ id: string }, {}, Partial<ICustomer>>,
    res: Response
  ) => {
    try {
      const updated = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updated)
        return res.status(404).json({ message: "Customer not found" });
      res.json({ message: "Customer updated successfully", data: updated });
    } catch (err: any) {
      res
        .status(400)
        .json({ message: "Failed to update customer", error: err.message });
    }
  }
);

// DELETE /customers/:id
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch {
    res.status(400).json({ message: "Invalid customer ID" });
  }
});

export default router;
