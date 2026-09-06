import express from "express"
import { doctorList } from "../controller/doctor.controller.js";


const doctorRouter=express.Router();

doctorRouter.get('/list',doctorList)

export default doctorRouter