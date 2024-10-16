import express from "express";
import {
    addBooking,
    getAllBookingsForAdmin, // Admin gets all bookings
    updateBookingStatus,    // Admin updates booking status
    getUserBookings,        // User gets their bookings
    deleteBooking
} from "../Controller/BookingController.js";

const router = express.Router();

// Add new booking (user or visitor)
router.post("/addBooking", addBooking);

// Admin: get all bookings
router.get("/admin/bookings", getAllBookingsForAdmin);

// Admin: update booking status (Confirm/Reject)
router.put("/admin/bookings/:id", updateBookingStatus);

// Get bookings for a specific user or visitor by email
router.get("/user/bookings", getUserBookings);

// Delete booking
router.delete("/deleteBooking/:id", deleteBooking);

export default router;
