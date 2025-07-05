import jwt from "jsonwebtoken";
import userModel from "../schema/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    //console.log("Authorization Header:", authHeader); // DEBUG LINE

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    //console.log("Auth Middleware Error:", error.message); // <-- This will show jwt malformed
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
