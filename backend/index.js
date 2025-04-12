import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import voterRouter from "./routes/voter.js";
import  authStatusRoute from "./routes/auth.js";
import userRouter from "./routes/user.js"
import cors from "cors"
import jwt from "jsonwebtoken";
import partyRouter from "./routes/party.js";
import locationRouter from "./routes/location.js"
// import authenticateUser from "./middleware/auth.js";
// import messageRouter from "./routes/message.js"

dotenv.config({});

app.use(express.json());
app.use(cookieParser());
// app.use(authenticateUser);
// app.use(authStatusRoute);
app.use(cors({
    origin: "http://localhost:3000", // ✅ Frontend port
    credentials: true,              // ✅ Allow cookies
  }));


  app.use("/me",(req,res) => {
    return res.json({message : "hi"})
  })

app.use("/api",authStatusRoute);
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
// app.use("/api/",authStatusRoute)

// app.use("/api/message",messageRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on PORT ${PORT} `)
})