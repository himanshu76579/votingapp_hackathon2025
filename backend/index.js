import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import voterRouter from "./routes/voter.js";
// import  authStatusRoute from "./routes/auth.js";
import userRouter from "./routes/user.js"
import cors from "cors"
import jwt from "jsonwebtoken";
import partyRouter from "./routes/party.js";
import locationRouter from "./routes/location.js"
import electionRouter from "./routes/election.js";
import authenticateUser from "./middleware/auth.js";
import Voter from "./models/voters.js";
import Party from "./models/party.js";


// import authenticateUser from "./middleware/auth.js";
// import messageRouter from "./routes/message.js"

dotenv.config({});

app.use(express.json());
app.use(cookieParser());
app.use("/api", electionRouter);
// app.use(authenticateUser);
// app.use(authStatusRoute);
app.use(cors({
    origin: "http://localhost:3000", // ✅ Frontend port
    credentials: true,              // ✅ Allow cookies
  }));


  app.use("/me",(req,res) => {
    return res.json({message : "hi"})
  })

app.use("/api/elections",electionRouter);
app.use("/api/user",userRouter);
app.use("/api/voter",voterRouter)
app.use("/api/location",locationRouter);
app.use("/api/party",partyRouter);
app.get('/check-auth', (req, res) => {
    const token = req.cookies.jwt;
    console.log("token is ",token)
  
    if(!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    try {
        console.log(" i tried");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return res.status(200).json({ message: 'Authenticated', user: decoded });
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });


  app.use("/api/party/vote/:partyId/:level",authenticateUser, async (req, res) => {
    const { partyId, level } = req.params;
  
    try {
      console.log("start to vote");
      
      const voter = await Voter.findById(req.user.id);
      if (!voter) return res.status(404).json({ message: "Voter not found." });
  
      if (voter.voted?.[level]) {
        return res.status(403).json({ message: `You have already voted in ${level} election.` });
      }
  
      const party = await Party.findById(partyId);
      if (!party) return res.status(404).json({ message: "Party not found." });
  
      // ✅ Increment vote count
      party.voteCount += 1;
      await party.save();
  
      // ✅ Mark the user as voted
      voter.voted[level] = true;
      await voter.save();
  
      res.status(200).json({ message: "Vote recorded successfully." });
  
    } catch (err) {
      console.error("Vote error:", err.message);
      res.status(500).json({ message: "Server error while recording vote." });
    }
  })
  
// app.use("/api/",authStatusRoute)

// app.use("/api/message",messageRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on PORT ${PORT} `)
})