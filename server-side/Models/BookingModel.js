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
    userId: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Rejected"],
        default: "Pending"
    }
});

export const BookingModel = mongoose.model("Booking", bookingSchema);