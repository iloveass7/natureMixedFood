import express from "express";
import {
  registerUser,
  loginUser,
  loginAdmin,
  getProfile,
  editUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);
router.get("/profile", authMiddleware, getProfile);
router.put("/edit", authMiddleware, editUser);

export default router;
