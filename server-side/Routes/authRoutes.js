import express from "express";
import { registerUser, loginUser, checkAdmin, logoutUser, makeAdmin } from "../Controller/AuthController.js";
import { uploadProfilePic } from "../Utils/multer.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { verifyAdmin } from "../Middlewares/verifyAdmin.js";

const router = express.Router();

// Register route for uploading profile pictures
router.post("/register", uploadProfilePic.single("profilePic"), registerUser);

// Login route
router.post("/login", loginUser);

// Check if user is admin
router.get("/check-admin", verifyToken, checkAdmin);

// Logout route
router.get("/logout", verifyToken, logoutUser);

// Make user admin
router.put("/make-admin", verifyToken, verifyAdmin, makeAdmin);

export default router;
