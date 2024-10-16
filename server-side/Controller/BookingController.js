import { BookingModel } from "../Models/BookingModel.js";


export const addBooking = async (req, res) => {
    try {
        const { name, email, phone, service, total } = req.body;
        if (!name || !email || !phone || !service || !total) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const booking = await BookingModel.create({
            name,
            email,
            phone,
            service,
            total
        });

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookingById = async (req, res) => {
    try {
        const booking = await BookingModel.findById(req.params.id);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const booking = await BookingModel.findByIdAndDelete(req.params.id);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}