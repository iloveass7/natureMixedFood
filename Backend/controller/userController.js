import userModel from "../schema/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

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
    const token = createToken(user._id);
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
    if (password.length < 9) {
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
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Internal server error" });
  }
};

const loginAdmin = async (req, res) => {};

export { loginUser, registerUser, loginAdmin };
