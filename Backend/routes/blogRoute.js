import express from "express";
import {
  createBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} from "../controller/blogController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const blogRouter = express.Router();

blogRouter.post("/create", adminAuth, upload.single("image"), createBlog);
blogRouter.get("/getBlogs", getBlogs);
blogRouter.get("/getSingleBlog/:id", getSingleBlog);
blogRouter.delete("/deleteBlog/:id", adminAuth, deleteBlog);
blogRouter.put(
  "/updateBlog/:id",
  adminAuth,
  upload.single("image"),
  updateBlog
);

export default blogRouter;
