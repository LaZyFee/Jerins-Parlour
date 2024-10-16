import { ServiceModel } from "../Models/ServiceModel.js";


export const addService = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const service = await ServiceModel.create({
            name,
            price,
            description
        });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateService = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const service = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                description
            },
            { new: true }
        );
        res.status(200).json(service);
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