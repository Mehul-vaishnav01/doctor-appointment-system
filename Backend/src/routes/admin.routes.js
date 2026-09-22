import express from "express";
import { addDoctor, adminDashboard, appointmentAdmin, appointmentCancel } from "../controller/admin.controller.js";
import upload from "../middleware/multer.js";
import { loginAdmin } from "../controller/admin.controller.js";
import authAdmin from "../middleware/auth.admin.js";
import { changeAvalablity } from "../controller/doctor.controller.js";


const adminRouter=express.Router();

adminRouter.post('/add-Doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/chnage-avaliblity',authAdmin,changeAvalablity)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;