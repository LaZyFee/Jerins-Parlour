import multer from "multer";
import path from "path";
import cloudinary from "./cloudinary.js";
import { unlink } from "fs/promises";

// Multer setup for temporary local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Temporary folder for storing files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for image files
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"));
    }
};

// Multer upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter
});

export const uploadProfilePic = upload.single("profilePic");
export const uploadServicePic = upload.single("image");
export const uploadMultiple = upload.array("images", 10); // For multiple image uploads

// Function to upload a file to Cloudinary
export const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });
        await unlink(filePath);
        return result;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
};