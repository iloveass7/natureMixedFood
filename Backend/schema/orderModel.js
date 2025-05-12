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
  address: { type: String, required: true },
  number: { type: Number, required: true },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
