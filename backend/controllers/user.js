import User from "../models/user.js"; // adjust path as needed

export const registerUser = async (req, res) => {
  try {
    console.log("try to register the user");
    const { fullname, gender, dob, aadharNo, voterIdNo,address } = req.body;

    // Check if all fields are present
    if (!fullname || !gender || !dob || !aadharNo || !voterIdNo || !address ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if(!address.local || !address.state || !address.country  ){
      return res.status(400).json({ message: "All fields are required." });
    }



    const existingUser = await User.findOne({
        $or: [{ aadharNo: aadharNo }, { voterIdNo: voterIdNo }],
      });

      if(existingUser){
        return res.json({message : "user already exists" });
      }

    // Create and save user
    const newUser = new User({ fullname, gender, dob, aadharNo, voterIdNo,address });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        gender: newUser.gender,
        dob: newUser.dob,
        aadharNo: newUser.aadharNo,
        voterIdNo: newUser.voterIdNo,
        address : newUser.address,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
