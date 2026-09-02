import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctor.model.js";

async function addDoctor(req,res) {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address}=req.body;
        const imageFile=req.file;
         console.log({ name , email , password , speciality , degree , experience , about , fees , address } , imageFile) ;

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

export {addDoctor}