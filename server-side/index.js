import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";

const app = express();
app.use(cors());
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

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});
