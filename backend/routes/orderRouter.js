import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  verifyOder,
  userOrders,
  listOrders,
  updateStatus,
  codOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/cod", authMiddleware, codOrder);
orderRouter.post("/verify", verifyOder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
