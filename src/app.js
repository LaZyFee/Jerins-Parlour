//external imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";


//internal imports
import authRoutes from "./Routes/authRoutes.js";
import serviceRoutes from "./Routes/serviceRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import "./Config/passportJs.js";


// Manually create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(cors({
    origin: ["http://localhost:5173", "https://jerins-parlour-webappx.netlify.app"],
    credentials: true

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());


// Serve static files (images)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.use("/api", authRoutes);
app.use("/api", serviceRoutes);
app.use("/api", bookingRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api", orderRoutes);


app.get("/", (req, res) => {
    res.send("Hello from jerins parlour server");
});

export default app;