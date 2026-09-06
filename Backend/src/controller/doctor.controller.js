import doctorModel from "../models/doctor.model.js";


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
export {changeAvalablity,doctorList}