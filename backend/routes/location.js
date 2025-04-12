import express from "express";
const router = express.Router();
import registerTheLocation from "../controllers/location.js";
import authenticateUser from "../middleware/auth.js";


router.post("/register", registerTheLocation);

// ✅ Use middleware here
router.get("/", async (req, res) => {
    console.log("user h ye ",req.user)
  const location = req.user?.location; // Safely extract location (if available)
  
  if (!location) {
    return res.status(400).json({ message: "No location found in token" });
  }

  console.log("User's location:", location);

  return res.json({
    location,
  });
});

export default router;
