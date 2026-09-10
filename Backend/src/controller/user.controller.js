import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

async function registerUser(req,res) {

    try {

        const { name,email,password}=req.body

        if(!email||!name||!password)
        {
            return res.status(401).json({
                message:"missing details"
            })
        }
        if(!validator.isEmail(email))
        {
             return res.status(401).json({
                message:"Enter a valid email"
            })
        }
        if(password.length<8){
             return res.status(401).json({
                message:"password must be the len of 8"
            })
        }

        //hashing user password

        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt);

        const userData={
            name,email,password:hashedPassword
        }

        const newUser= new userModel(userData)
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        return res.status(201).json({
            message:"User registered sucessfully"
        })


        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
    
}


async function loginUser(req,res) {
    try {
        const {email,password}=req.body;

        const user=await userModel.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"User doesn't exist"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(isMatch)
        {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.cookie("token", token)
            return res.status(200).json({
                message:"Logged in sucessfully"
            })
        }
        else{
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
}

async function getProfile(req,res) {
    try {
        const userData=await userModel.findById(req.userId).select('-password');
        return res.status(200).json({
            userData
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
}


async function updateProfile(req,res) {
    try {
        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile=req.file

        if(!name || !phone || !dob || !gender)
        {
            return res.status(401).json({
                message:"Data is missing"
            })
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address: JSON.parse(address),dob,gender})

        if(imageFile)
        {
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL=imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        return res.status(200).json({
            message:"Profilr sucessfully updated"
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
}

export {registerUser,loginUser,getProfile}