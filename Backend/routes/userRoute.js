import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/admin/login", loginAdmin);

export default userRouter;
