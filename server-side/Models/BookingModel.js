import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

export const BookingModel = mongoose.model("Booking", bookingSchema);