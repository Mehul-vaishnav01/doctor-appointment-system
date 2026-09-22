import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctor.model.js";
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointment.model.js";
import userModel from "../models/user.model.js";

async function addDoctor(req,res) {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address}=req.body;
        const imageFile=req.file;

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address)
        {
            return res.status(400).json({
                message:"Missing details"
            })

        }
        if (!imageFile) {
            return res.status(400).json({
            message: "Doctor image is required"
            });
        }

        //validating email formet
        if(!validator.isEmail(email))
        {
            return res.status(400).json({
                message:"Please enter valid email"
            })
        }

        //validating strong password
        if(password.length<8)
        {
            return res.status(400).json({
                message:"please enter a strong password"
            })
        }

        //hashing doc password

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //upload image to cloudinary
        

        const imageUpload = await cloudinary.uploader.upload(
            imageFile.path,
            { resource_type: "image" }
        );

    

        const imageUrl=imageUpload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()
        return res.status(201).json({
            message:"Doctor added sucessfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
}

async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL &&password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            // Save token in cookie
            res.cookie("token", token);

            return res.status(200).json({
                message: "Login Successfully"
            });
        }

        return res.status(400).json({
            message: "Invalid Credential"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
}

async function allDoctor(req,res) {
    try {
        const doctors=await doctorModel.find({}).select('-password')
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


//Api to fetch all appointments

async function appointmentAdmin (req,res) {
     try {
        const appointments=await appointmentModel.find({})
        return res.status(200).json({
            appointments
        })
     } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
     }    
}


//Api for cancel appointment
async function appointmentCancel(req,res) {
    try {
        // const userId=req.userId;
        const {appointmentId}=req.body

        const appointmentData=await appointmentModel.findById(appointmentId)
        // if(appointmentData.userId!=userId)
        // {
        //     return res.status(401).json({
        //         message:"Unothorized access"
        //     })
        // }        
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //relasing doc slot

        const{docId,slotDate,slotTime}=appointmentData

        const docData=await doctorModel.findById(docId)

        let slots_booked=docData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=> e!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        
        return res.status(200).json({
            message:"Appointment Cancelled"
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }    
}


//Api to get dashboard data for admin pannel
async function adminDashboard(req,res) {
    try {
        const doctors=await doctorModel.find({});
        const users=await userModel.find({});
        const appointments=await appointmentModel.find({});

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            users:users.length,
            latestAppointments:appointments.reverse().slice(0,5)

        }
        return res.status(200).json({
            dashData
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
}
export {addDoctor,loginAdmin,appointmentAdmin,appointmentCancel,adminDashboard}