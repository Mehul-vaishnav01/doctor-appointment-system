import mongoose from "mongoose";


const appointmentSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    docId:{
        type:String,
        requried:true
    },
    slotDate:{
        type:String,
        requried:true
    },
    slotTime:{
        type:String,
        requried:true
    },
    userData:{
        type:String,
        requried:true
    },
    docData:{
        type:String,
        requried:true
    },
    amount:{
        type:String,
        requried:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    cancelled:{
        type:Boolean,
        default:false
    },
    payment:{
        type:Boolean,
        default:false
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

const appointmentModel=mongoose.models.appointment||mongoose.model('appointment',appointmentSchema)

export default appointmentModel;