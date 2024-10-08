import { UserModel } from "../Models/AuthModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/generateToken.js";

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

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const user = await UserModel.create({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
            profilePic: req.file ? req.file.path : "",
        });

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profilePic: user.profilePic,
            },
            token,  // Include token in response
        });
    } catch (error) {
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
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profilePic: user.profilePic,
            },
            token,  // Include the token in the response
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}