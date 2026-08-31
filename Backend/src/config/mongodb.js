import mongoose from "mongoose";

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Databse connected sucessfully")
    })
    .catch(err =>{
        console.log("err to connectDB",err)
        process.exit(1);
    })
}

export default connectDB;