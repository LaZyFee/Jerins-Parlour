import { BookingModel } from "../Models/BookingModel.js";

// Add a booking (common for user or visitor)
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
            total,
            userId: req.user?._id || null // Add userId if logged in
        });

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get all bookings
export const getAllBookingsForAdmin = async (req, res) => {
    try {
        const bookings = await BookingModel.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Update booking status (Confirm/Reject)
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Confirmed", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const booking = await BookingModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User or visitor: Get bookings by userId or email
export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.user || {}; // Use user ID from auth middleware
        const email = req.query.email || null; // Fallback for visitors

        let bookings;

        if (userId) {
            bookings = await BookingModel.find({ userId }); // Get bookings by userId
        } else if (email) {
            bookings = await BookingModel.find({ email }); // Get bookings by email for visitors
        } else {
            return res.status(400).json({ message: "User ID or email required" });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
    try {
        const booking = await BookingModel.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
