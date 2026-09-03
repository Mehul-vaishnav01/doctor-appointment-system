import express from "express";
import { addDoctor } from "../controller/admin.controller.js";
import upload from "../middleware/multer.js";
import { loginAdmin } from "../controller/admin.controller.js";

const adminRouter=express.Router();

adminRouter.post('/add-Doctor',upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)

export default adminRouter;