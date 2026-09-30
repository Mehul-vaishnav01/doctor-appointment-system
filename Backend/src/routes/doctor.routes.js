import express from "express"
import { appointmentCancel, appointmentCompleted, appointmentsDoctor, doctorDashboard, doctorList, loginDoctor } from "../controller/doctor.controller.js";
import authDoctor from "../middleware/auth.doctor.js";


const doctorRouter=express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/mark-completed',authDoctor,appointmentCompleted)




export default doctorRouter

