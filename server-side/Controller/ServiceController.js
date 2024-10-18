import { ServiceModel } from "../Models/ServiceModel.js";

// Add service with image
export const addService = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Store image path if the image is uploaded
        const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";

        const service = await ServiceModel.create({
            name,
            price,
            description,
            image: imagePath, // Save image path in the database
        });

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update service with image
export const updateService = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Store image path if a new image is uploaded
        const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

        const updatedService = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                description,
                ...(imagePath && { image: imagePath }) // Only update image if a new one is uploaded
            },
            { new: true }
        );

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeService = async (req, res) => {
    try {
        const service = await ServiceModel.findByIdAndDelete(req.params.id);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};