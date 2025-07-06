import { v2 as cloudinary } from "cloudinary";
import productModel from "../schema/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const images = req.files;

    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", images);

    if (!images || Object.keys(images).length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    // Collect paths from each image field
    const imageFiles = [
      images.image1?.[0],
      images.image2?.[0],
      images.image3?.[0],
      images.image4?.[0],
      images.image5?.[0],
    ].filter(Boolean);

    console.log("Filtered Image Files:", imageFiles);

    // Upload images to Cloudinary
    let imagesUrl = await Promise.all(
      imageFiles.map(async (item) => {
        console.log("Uploading:", item.path);
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        console.log("Uploaded:", result.secure_url);
        return result.secure_url;
      })
    );

    // Save product to the database
    const newProduct = new productModel({
      name,
      description,
      price,
      images: imagesUrl,
    });

    await newProduct.save();

    res.status(200).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error in addProduct:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ date: -1 });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    } else {
      res.status(200).json(products);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    const deletePromises = product.images.map((imageUrl) => {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      return cloudinary.uploader.destroy(publicId);
    });

    await Promise.all(deletePromises);

    // Delete product from database
    await productModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error in removeProduct:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error in singleProduct:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "No search query provided" });
    }

    const products = await productModel.find({
      name: { $regex: q, $options: "i" }, // case-insensitive search
    });

    res.status(200).json(products);
  } catch (err) {
    console.error("Error in searchProducts:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export {
  addProduct,
  getAllProducts,
  removeProduct,
  singleProduct,
  searchProducts,
};
