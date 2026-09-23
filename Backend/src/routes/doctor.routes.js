import express from "express"
import { doctorList, loginDoctor } from "../controller/doctor.controller.js";


const doctorRouter=express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)

export default doctorRouter