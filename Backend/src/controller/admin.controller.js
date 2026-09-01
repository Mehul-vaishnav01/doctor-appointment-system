

async function addDoctor(req,res) {
    try {
        const {name, email, password, speciality, degree, experince, about, fees, address}=req.body;
        const imageFile=req.file;
        if(!name || !email || !password || !speciality || !degree || !experince || !about || !fees || !address)
        {
            return res.status(400).json({
                message:"Missing details"
            })
        }
    } catch (error) {
        
    }
}

export {addDoctor}