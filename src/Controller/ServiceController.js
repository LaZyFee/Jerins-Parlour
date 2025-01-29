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
            imageUrl = await uploadToCloudinary(req.file.buffer, "services");
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

// Update service with new image or remove old image
export const updateService = async (req, res) => {
    try {
        const existingService = await ServiceModel.findById(req.params.id);
        if (!existingService) {
            return res.status(404).json({ message: "Service not found" });
        }

        let imageUrl = existingService.image;

        // If a new image is uploaded, upload to Cloudinary
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer, "services");
        }

        // If removeImage flag is set, remove the current image
        if (req.body.removeImage === "true") {
            imageUrl = "";
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: imageUrl,
            },
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
