const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
	attention: { type: String, trim: true },
	street: { type: String, trim: true },
	city: { type: String, trim: true },
	state: { type: String, trim: true },
	postalCode: { type: String, trim: true },
	country: { type: String, trim: true },
}, { _id: false });

const ContactSchema = new Schema({
	name: { type: String, trim: true },
	email: { type: String, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
	phone: { type: String, trim: true },
	mobile: { type: String, trim: true },
}, { _id: false });

const VendorSchema = new Schema({
	name: { type: String, required: true, trim: true },
	displayName: { type: String, trim: true },
	contact: { type: ContactSchema, default: {} },
	phone: { type: String, trim: true },
	email: { type: String, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
	website: { type: String, trim: true },
	billingAddress: { type: AddressSchema, default: {} },
	shippingAddress: { type: AddressSchema, default: {} },
	taxNumber: { type: String, trim: true },
	taxType: { type: String, enum: ['GST', 'VAT', 'NONE', 'OTHER'], default: 'NONE' },
	currency: { type: String, trim: true, default: 'USD' },
	paymentTerms: { type: Number, description: 'Days until payment is due', default: 30 },
	openingBalance: { type: Number, default: 0 },
	openingBalanceDate: { type: Date },
	balance: { type: Number, default: 0 },
	notes: { type: String, trim: true },
	customFields: { type: Schema.Types.Mixed },
	isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Virtual for display name fallback
VendorSchema.virtual('displayOrName').get(function () {
	return this.displayName || this.name;
});

module.exports = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
