// routes/location.js or create a new file routes/election.js
import express from 'express';
import Voter from '../models/voters.js';
import Location from '../models/location.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

// Get election status for user's location
router.get("/election-levels", authenticateUser, async (req, res) => {
  try {
    const voterId = req.user.userId;
    const voter = await Voter.findById(voterId);

    if (!voter) return res.status(404).json({ message: "Voter not found" });

    const { local, state, country } = voter.address;

    // Search each level in the Location collection
    const [localLoc, stateLoc, countryLoc] = await Promise.all([
      Location.findOne({ name: local }),
      Location.findOne({ name: state }),
      Location.findOne({ name: country }),
    ]);

    res.json({
      local: localLoc?.election || false,
      state: stateLoc?.election || false,
      country: countryLoc?.election || false
    });
  } catch (error) {
    console.error("Election level fetch error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
