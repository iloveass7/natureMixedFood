import cardModel from "../schema/cardSchema.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const addCard = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cards",
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    // Ensure max 3 cards
    const count = await cardModel.countDocuments();
    if (count >= 3) {
      const oldest = await cardModel.findOne().sort({ createdAt: 1 });
      if (oldest) await cardModel.findByIdAndDelete(oldest._id);
    }

    const newCard = new cardModel({
      title,
      description,
      image: result.secure_url,
    });

    await newCard.save();

    return res
      .status(201)
      .json({ message: "Card added successfully", card: newCard });
  } catch (error) {
    console.error("Error adding card:", error);
    return res
      .status(500)
      .json({ message: "Failed to add card", error: error.message });
  }
};
export const getCards = async (req, res) => {
  try {
    const cards = await cardModel.find(); // Fetch all cards from the database
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cards" });
  }
};
export const updateCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    const updatedCard = await cardModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card updated", card: updatedCard });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

