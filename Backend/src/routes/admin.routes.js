import express from "express";
import { addDoctor } from "../controller/admin.controller.js";
import upload from "../middleware/multer.js";
import { loginAdmin } from "../controller/admin.controller.js";
import authAdmin from "../middleware/auth.admin.js";
import { changeAvalablity } from "../controller/doctor.controller.js";


const adminRouter=express.Router();

adminRouter.post('/add-Doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/chnage-avaliblity',authAdmin,changeAvalablity)

export default adminRouter;