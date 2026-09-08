import express from 'express'
import { getProfile, loginUser, registerUser } from '../controller/user.controller.js'
import authUser from '../middleware/auth.user.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)

export default userRouter