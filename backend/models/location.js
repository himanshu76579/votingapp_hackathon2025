import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  election: {
    type: Boolean,
    required: true
  },
  parties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party"
    }
  ]
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);
export default Location;
