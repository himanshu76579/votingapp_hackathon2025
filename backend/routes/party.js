import express from "express";
import registertheParty from "../controllers/party.js";

const router = express.Router();

router.post("/register",registertheParty);

export default router;
