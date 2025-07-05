// controllers/userController.js

import userModel from "../schema/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { createUserToken } from "../utils/auth.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createUserToken(user._id);
    // console.log(token);
    // console.log("JWT_SECRET:", process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        cartData: user.cartData,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    const salt = await bcrypt.genSalt(7);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    await user.save();
    const token = createUserToken(user._id); // Use the function for user token
    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Internal server error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_ADMIN_SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        success: true,
        token,
      });
    }

    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const userId = req.user.id; // assumes you're using auth middleware that attaches `req.user`

    const updates = {};
    if (name) updates.name = name;

    if (password) {
      if (password.length < 9) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters",
        });
      }
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { registerUser, loginUser, loginAdmin, getProfile, editUser };
