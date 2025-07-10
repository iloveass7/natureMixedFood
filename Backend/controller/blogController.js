import blogModel from "../schema/blogSchema.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs",
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    const newBlog = new blogModel({
      title,
      description,
      image: result.secure_url,
    });

    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);

    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Update fields
    blog.title = title || blog.title;
    blog.description = description || blog.description;

    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });

      // Remove local file after upload
      fs.unlinkSync(req.file.path);

      // Replace the image URL
      blog.image = result.secure_url;
    }

    await blog.save(); // Save the updated blog

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export { createBlog, getBlogs, getSingleBlog, deleteBlog, updateBlog };
