import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  console.log("authentecting");
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains all voter fields
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateUser;
