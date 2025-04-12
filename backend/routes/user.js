import express from "express";
import { registerUser } from "../controllers/user.js"; // make sure the filename is correct and ends in .js

const userRouter = express.Router();

userRouter.post("/register", registerUser); // consider renaming this route to /register if it's for registration

export default userRouter;
