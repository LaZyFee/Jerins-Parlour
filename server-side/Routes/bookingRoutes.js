import express from "express";
import { addBooking, getAllBookings, getBookingById, deleteBooking } from "../Controller/BookingController.js";

const router = express.Router();


router.post("/addBooking", addBooking);
router.get("/getAllBookings", getAllBookings);
router.get("/getBookingById/:id", getBookingById);
router.delete("/deleteBooking/:id", deleteBooking);


export default router