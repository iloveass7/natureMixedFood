import bannerModel from "../schema/bannerModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const addBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "banner",
    });

    fs.unlinkSync(req.file.path);
    await bannerModel.deleteMany();

    const newBanner = new bannerModel({ image: result.secure_url });
    await newBanner.save();

    return res.status(201).json({
      message: "Banner uploaded successfully",
      banner: newBanner,
    });
  } catch (error) {
    console.error("Error uploading banner:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getBanner = async (req, res) => {
  try {
    const banner = await bannerModel.findOne();
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching banner" });
  }
};
