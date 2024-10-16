import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import serviceRoutes from "./Routes/serviceRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT || 5000;

// Serve static files from the 'uploads' directory for profile pictures
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Hello World! from Jerins Parlour backend");
});

app.use("/", authRoutes);
app.use("/", serviceRoutes);
app.use("/", bookingRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});
