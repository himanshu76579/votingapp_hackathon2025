import mongoose from "mongoose";

export const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  symbol: {
    type: String, // URL to the party symbol image
    required: true,
    unique : true,
  },
  location : {
    type : String,
    required : true
  }
}, { timestamps: true });

const Party = mongoose.model("Party", partySchema);
export default Party;
