import {v2 as cloudinary} from 'cloudinary'

async function connectCloudinary() {

    try {
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_SECRET_KEY
        })
        
        console.log("cloudinary connected")
        
    } catch (error) {
        console.log(error)
    }
    
}

export default connectCloudinary;