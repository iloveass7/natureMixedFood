import express from "express";
import {
  order,
  getOrders,
  updateOrderStatus,
} from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/order", order);
orderRouter.get("/getOrders", getOrders);
orderRouter.put("/updateOrderStatus/:id", updateOrderStatus);

export default orderRouter;
