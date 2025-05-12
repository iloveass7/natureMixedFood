import express from "express";
import {
  createBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} from "../controller/blogController.js";
import adminAuth from "../middleware/adminAuth.js";

const blogRouter = express.Router();

blogRouter.post("/create", adminAuth, createBlog);
blogRouter.get("/getBlogs", getBlogs);
blogRouter.get("/getSingleBlog/:id", getSingleBlog);
blogRouter.delete("/deleteBlog/:id", adminAuth, deleteBlog);
blogRouter.put("/updateBlog/:id", adminAuth, updateBlog);

export default blogRouter;
