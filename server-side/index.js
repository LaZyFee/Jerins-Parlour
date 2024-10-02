import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { connectDB } from "./DB/connectDB.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World! from jerins parlour backend");
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Example app listening at http://localhost:${PORT}`);
});