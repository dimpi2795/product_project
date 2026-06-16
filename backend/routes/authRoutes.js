


import express from "express";

import {
    signupUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/user", getUser);

router.patch("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);
export default router;