import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads", // Folder name in Cloudinary
        allowed_formats: ["jpeg", "jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    }
});

// Multer upload middleware
const upload = multer({ storage });

// Export middleware for different routes
export const uploadProfilePic = upload.single("profilePic");
export const uploadServicePic = upload.single("image");
export const uploadMultiple = upload.array("images", 10);

export default cloudinary;
