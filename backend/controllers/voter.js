import User from "../models/user.js";
import Voter from "../models/voters.js";
import jwt from "jsonwebtoken";

export const registerVoter = async (req, res) => {
  try {
    console.log("Registering the voter...");

    const { fullname, gender, dob, aadharNo, voterIdNo } = req.body;

    // ✅ Check for all required fields
    if (!fullname || !gender || !dob || !aadharNo || !voterIdNo) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check if user with this Aadhar exists in the User collection
    const existingUser = await User.findOne({ aadharNo });
    if (!existingUser) {
      return res.status(404).json({ message: "This Aadhar number does not exist." });
    }


    // ✅ Prevent re-registration
    const alreadyRegistered = await Voter.findOne({ aadharNo });
    if (alreadyRegistered) {
      return res.status(409).json({ message: "Voter with this Aadhar is already registered." });
    }

    // ✅ Save voter
    const newVoter = new Voter({
      fullname,
      gender,
      dob,
      aadharNo,
      voterIdNo,
      address: existingUser.address
    });
    await newVoter.save();

    // ✅ Generate JWT token
    const token = jwt.sign(
      {
        userId: newVoter._id,
        voterIdNo: newVoter.voterIdNo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1000m" }
    );

    console.log("Token -> ", token);
    
    // ✅ Set JWT in cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, // should be true in production with HTTPS
        sameSite: 'Lax', // or 'None' if you're on different domains & using HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      

    // ✅ Send response
    return res.status(201).json({
      message: "Voter registered successfully.",
      voter: {
        id: newVoter._id,
        fullname: newVoter.fullname,
        gender: newVoter.gender,
        dob: newVoter.dob,
        aadharNo: newVoter.aadharNo,
        voterIdNo: newVoter.voterIdNo,
        address : newVoter.address,
      },
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
