import mongoose from "mongoose";

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    .then( ()=>{
        console.log("mongoose connected successfully")
    } )
    .catch( (error) => {
        console.log("connection failed",error);
    } )
}

export default connectDB;