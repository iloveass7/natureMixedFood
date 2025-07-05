import jwt from "jsonwebtoken";

// Function to create JWT token for users
export const createUserToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
