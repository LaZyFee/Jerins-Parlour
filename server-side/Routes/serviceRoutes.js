import express from "express";
import { addService, getAllServices, updateService, removeService } from "../Controller/ServiceController.js";
const router = express.Router();


router.post("/addService", addService);
router.put("/updateService/:id", updateService);
router.get("/getAllServices", getAllServices);
router.delete("/removeService/:id", removeService);



export default router