// routes/authStatus.js
import express from "express";
const  router = express.Router();
import authenticateUser from  "../middleware/auth.js";

router.get("/check-auth", authenticateUser, (req, res) => {
  console.log("came here")
  res.status(200).json({ loggedIn: true });
});

export default router;

