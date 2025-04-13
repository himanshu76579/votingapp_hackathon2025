import express from "express";
import registertheParty from "../controllers/party.js";
import authenticateUser from "../middleware/auth.js";
import Voter from "../models/voters.js";
import Party from "../models/party.js";

const router = express.Router();

router.post("/register",registertheParty)
.get('/:level', authenticateUser, async (req, res) => {
    console.log("finally i reached");
    const level = req.params.level; // 'local' | 'state' | 'country'
    console.log("level is" ,level);
  
    try {
      const voter = await Voter.findById(req.user.id);
      console.log("my voter" , voter);

      if (!voter) {
        console.log("pagla");
        return res.status(404).json({ message: "Voter not found" });
      }


  
      const locationName = voter.address?.[level]; // dynamic key

      if (!locationName) return res.status(400).json({ message: `${level} not found in address` });
      console.log("locationname is" , locationName);

      const parties = await Party.find({ location: locationName });
      res.json(parties);
    } catch (err) {
      console.error("Error fetching parties:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
export default router;
