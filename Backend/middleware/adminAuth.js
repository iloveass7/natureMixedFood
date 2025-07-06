import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token owner" });
    }

    // Optionally attach admin data to request
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else {
      console.error("Auth Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default adminAuth;
