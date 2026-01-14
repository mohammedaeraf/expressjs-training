import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface CustomerDocument extends ICustomer, Document {}

const customerSchema = new Schema<CustomerDocument>({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String
}, { timestamps: true });

const Customer = mongoose.model<CustomerDocument>("Customer", customerSchema);
export default Customer;