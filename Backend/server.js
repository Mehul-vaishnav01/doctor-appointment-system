import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import adminRouter from './src/routes/admin.routes.js';
import cookieParser from 'cookie-parser';
import doctorRouter from './src/routes/doctor.routes.js';
import userRouter from './src/routes/user.routes.js';

//app config
const app=express();
const port=process.env.PORT|| 4000
connectDB()
connectCloudinary();

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//api end point
app.use('/api/admin',adminRouter)

app.use('/api/doctor',doctorRouter)

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('API is working')
})

app.listen(port,()=>{
    console.log("Server is running on port",port)
})