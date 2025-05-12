import express from "express";
import {
  order,
  getOrders,
  approveOrder,
  getApproveOrder,
} from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/order", order);
orderRouter.get("/getOrders", adminAuth, getOrders);
orderRouter.put("/approveOrder/:id", adminAuth, approveOrder);
orderRouter.get("/getApprovedOrders", adminAuth, getApproveOrder);

export default orderRouter;
