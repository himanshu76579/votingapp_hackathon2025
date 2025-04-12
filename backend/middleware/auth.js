
import jwt from 'jsonwebtoken';

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  console.log("chekc auth");
  const token = req.cookies.token;

  console.log("token",token);

  if (!token) {
    return res.redirect('http://localhost:3000/login'); // or: res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.redirect('http://localhost:3000/login');
  }
};

export default authenticateUser


