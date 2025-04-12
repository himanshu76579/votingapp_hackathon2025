import express from "express";
import { registerVoter } from "../controllers/voter.js"; // make sure the filename is correct and ends in .js
import authenticateUser from "../middleware/auth.js";

const voterRouter = express.Router();

voterRouter
.post("/register", registerVoter)



export default voterRouter;
