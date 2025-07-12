import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  address: {
    location: { type: String, required: true },
    district: { type: String, required: true },
    division: { type: String, required: true },
  },
  number: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Processing", "Out for Delivery", "Delivered"],
    default: "Processing",
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.modeorder || mongoose.model("order", orderSchema);
export default orderModel;
