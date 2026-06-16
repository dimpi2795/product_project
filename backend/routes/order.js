

import express from "express";

import {
  placeOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

// PLACE ORDER
router.post("/", placeOrder);

// GET ALL ORDERS
router.get("/", getOrders);

// UPDATE STATUS
router.patch("/update/:id", updateOrderStatus);

// DELETE ORDER
router.delete("/delete/:id", deleteOrder);

export default router;