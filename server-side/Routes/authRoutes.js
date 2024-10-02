import express from "express";
import { registerUser, loginUser } from "../Controller/AuthController.js";
import upload from "../Utils/multer.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const router = express.Router();

// Register route for uploading profile pictures
router.post("/register", upload.single("profilePic"), registerUser);

// Login route
router.post("/login", loginUser);

export default router;
