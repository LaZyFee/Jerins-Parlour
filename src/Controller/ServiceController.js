import { ServiceModel } from "../Models/ServiceModel.js";
import { uploadToCloudinary } from "../Config/cloudinary.js";

// Add a new service
export const addService = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let imageUrl = "";
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.path, "services");
        }

        const service = await ServiceModel.create({
            name,
            price,
            description,
            image: imageUrl
        });

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update service with new image
export const updateService = async (req, res) => {
    try {
        const existingService = await ServiceModel.findById(req.params.id);
        if (!existingService) {
            return res.status(404).json({ message: "Service not found" });
        }

        const updateFields = { ...req.body };

        // If new image is uploaded, update Cloudinary URL
        if (req.file) {
            updateFields.image = req.file.path;
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a service
export const removeService = async (req, res) => {
    try {
        const service = await ServiceModel.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully", service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
