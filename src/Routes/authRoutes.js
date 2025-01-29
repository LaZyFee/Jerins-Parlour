import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    googleAuth,
    checkAdmin,
    makeAdmin,
} from "../Controller/AuthController.js";
import passport from "passport";
import { uploadSingle } from "../Config/multer.js"; // Corrected function import
import { verifyToken } from "../Middlewares/verifyToken.js";
import { verifyAdmin } from "../Middlewares/verifyAdmin.js";

const router = express.Router();

// Standard registration with profile picture upload
router.post("/register", uploadSingle, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-admin", verifyToken, checkAdmin);
router.put("/make-admin", verifyToken, verifyAdmin, makeAdmin);

// Google OAuth Routes
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    googleAuth
);

export default router;