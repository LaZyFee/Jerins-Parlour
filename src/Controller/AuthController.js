import { UserModel } from "../Models/AuthModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/generateToken.js";
import { uploadToCloudinary } from "../Config/cloudinary.js";

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, phone, password } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicUrl = "";
        if (req.file) {
            profilePicUrl = await uploadToCloudinary(req.file.buffer, "profile_pics"); // Use buffer
        }

        const user = await UserModel.create({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
            profilePic: profilePicUrl,
        });

        const token = generateToken(user);

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profilePic: user.profilePic,
                isAdmin: user.isAdmin,
            },
            token,
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profilePic: user.profilePic,
                isAdmin: user.isAdmin,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAdmin = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ isAdmin: user.isAdmin });
    } catch (error) {
        console.error("Admin Check Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const makeAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isAdmin = true;
        await user.save();
        res.json({ message: "User promoted to admin" });
    } catch (error) {
        console.error("Make Admin Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { googleId, email, name, profilePic } = req.user;

        // First, check if a user with this email exists
        let user = await UserModel.findOne({ email });

        if (!user) {
            // Then, check if a user with this Google ID exists
            user = await UserModel.findOne({ googleId });
        }

        if (!user) {
            // If no user found, create a new one
            user = await UserModel.create({
                googleId,
                email,
                name,
                username: name,
                profilePic,
            });
        } else if (!user.googleId) {
            // If user exists but doesn't have a googleId, update it
            user.googleId = googleId;
            await user.save();
        }

        const token = generateToken(user);

        const userQuery = JSON.stringify({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            isAdmin: user.isAdmin,
        });

        res.redirect(
            `${process.env.FRONTEND_URL}/login/success?token=${token}&user=${encodeURIComponent(userQuery)}`
        );
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ message: error.message });
    }
};