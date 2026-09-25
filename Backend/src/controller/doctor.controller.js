import doctorModel from "../models/doctor.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointment.model.js";

async function changeAvalablity(req,res) {
    try {
        const {docId}=req.body

        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{avalible:!docData.avalible})

        res.status(201).json({
            message:"Avaliblity Changed"
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
    
}


async function doctorList(req,res) {
    try {
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.status(200).json({
            doctors
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }    
}

async function loginDoctor(req,res) {
    try {
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})

        if(!doctor)
        {
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }

        const isMatch=await bcrypt.compare(password,doctor.password);
        if(isMatch)
        {
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            return res.status(200).json({
                message:"Login sucessfully"
            })
        }
        else
        {
            return res.status(401).json({
                message:"Invalid Credential"
            })
        }

    } catch (error) {
         console.log(error);

        return res.status(500).json({
            message: error.message
        })
    }
}


export {changeAvalablity,doctorList,loginDoctor}