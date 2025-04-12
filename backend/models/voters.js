import mongoose from "mongoose";


// Embedded address schema with just name fields (no refs)
const addressSchema = new mongoose.Schema({
    local: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

const voterSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    aadharNo: {
        type: String,
        required: true,
        unique: true
    },
    voterIdNo: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: addressSchema,
        required: true,
    }
},{timestamps : true})

const Voter =  mongoose.model("Voter",voterSchema);

export default Voter;