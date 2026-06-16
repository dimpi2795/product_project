

import express from "express";

import {
    saveAddress,
    getAddresses,
    updateAddress,
    deleteAddress
} from "../controllers/addressController.js";

const router = express.Router();

// GET
router.get("/", getAddresses);

// POST
router.post("/add", saveAddress);

// PATCH
router.patch("/update/:id", updateAddress);

// DELETE
router.delete("/delete/:id", deleteAddress);

export default router;