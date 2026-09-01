import express from "express";
import { addDoctor } from "../controller/admin.controller.js";
import upload from "../middleware/multer.js";


const adminRouter=express.Router();

adminRouter.post('/add-Doctor',upload.single('image'),addDoctor)

export default adminRouter;