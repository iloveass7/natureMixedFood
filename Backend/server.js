import express from "express";
import cors from "cors";
import "dotenv/config";
import { connect } from "mongoose";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRoutes from "./routes/userRoute.js";
import cardRouter from "./routes/cardRoute.js";
import dotenv from "dotenv";
//app congig
const app = express();
const port = process.env.PORT || 8000;
connectDb();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
dotenv.config();

//routes
app.get("/", (req, res) => {
  res.send("Kire khainkir pola");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/order", orderRouter);
app.use("/api/card", cardRouter);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
