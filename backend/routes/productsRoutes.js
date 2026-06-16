

import express from "express";
import { createProduct, upload, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;