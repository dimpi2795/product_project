
import express from "express";

import {
  addToCart,
  removeItem,
  updateItemQuantity,
  getCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);

router.post("/add", addToCart);

router.patch("/updateItem", updateItemQuantity);

router.delete("/removeItem", removeItem);

export default router;