import express from "express";
const router = express.Router();
import registerTheLocation from "../controllers/location.js";
// import Location from "../models/location.js";

router.post("/register", registerTheLocation);

// // ✅ Use middleware here
// router.get("/:name", async (req, res) => {
//     try{
//       const {name} = req.params;
//       const location = Location.findOne({name : name})

//       if(!location){
//         return res.status(404).json({message  : "location not found"});
//       }

//       return res.status(200).json({location})
//     }
//     catch (error) {
//       console.error("Error fetching location:", error.message);
//       res.status(500).json({ message: "Server error" });
//     }
// });

export default router;
