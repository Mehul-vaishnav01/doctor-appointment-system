import express from "express"
import { appointmentCancel, appointmentCompleted, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from "../controller/doctor.controller.js";
import authDoctor from "../middleware/auth.doctor.js";


const doctorRouter=express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/mark-completed',authDoctor,appointmentCompleted)
doctorRouter.post('/mark-cancelled',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/doctor-profile',authDoctor,doctorProfile)
doctorRouter.post('/doctor-profile-update',authDoctor,updateDoctorProfile)



export default doctorRouter

