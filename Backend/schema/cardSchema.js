import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const cardModel = mongoose.models.card || mongoose.model("card", cardSchema);
export default cardModel;
