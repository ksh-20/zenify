const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token after 'Bearer'
  
  if (!token) return res.status(403).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;  // Attach user to request
    next();
  });
};

module.exports = authenticateToken;