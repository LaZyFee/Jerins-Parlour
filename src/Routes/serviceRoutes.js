import express from "express";
import { addService, getAllServices, updateService, removeService } from "../Controller/ServiceController.js";
import { uploadSingle } from "../Config/multer.js";
const router = express.Router();

// Add service with image upload
router.post("/addService", uploadSingle, addService);
// Update service with image upload
router.put("/updateService/:id", uploadSingle, updateService);

// Get all services
router.get("/getAllServices", getAllServices);

// Remove service
router.delete("/removeService/:id", removeService);

export default router;
