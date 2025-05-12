import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default adminAuth;
