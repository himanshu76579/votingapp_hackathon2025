import User from "../models/user.js";
import Voter from "../models/voters.js";
import jwt from "jsonwebtoken";

export const registerVoter = async (req, res) => {
  try {
    console.log("Registering the voter...");

    const { fullname, gender, dob, aadharNo, voterIdNo } = req.body;

    // Check for required fields
    if (!fullname || !gender || !dob || !aadharNo || !voterIdNo) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user with this Aadhar exists in User DB
    const existingUser = await User.findOne({ aadharNo });
    if (!existingUser) {
      return res.status(404).json({ message: "This Aadhar number does not exist." });
    }

    // Prevent duplicate registration
    const alreadyRegistered = await Voter.findOne({ aadharNo });
    if (alreadyRegistered) {
      return res.status(409).json({ message: "Voter with this Aadhar is already registered." });
    }

    // Save the voter
    const newVoter = new Voter({
      fullname,
      gender,
      dob,
      aadharNo,
      voterIdNo,
      address: existingUser.address
    });

    await newVoter.save();

    // ✅ Include full voter data in JWT token (excluding sensitive timestamps)
    const tokenPayload = {
      id: newVoter._id,
      fullname: newVoter.fullname,
      gender: newVoter.gender,
      dob: newVoter.dob,
      aadharNo: newVoter.aadharNo,
      voterIdNo: newVoter.voterIdNo,
      address: newVoter.address
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d", // 1 day
    });

    // ✅ Set JWT in cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // ✅ Response with user info
    return res.status(201).json({
      message: "Voter registered successfully.",
      voter: tokenPayload,
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
