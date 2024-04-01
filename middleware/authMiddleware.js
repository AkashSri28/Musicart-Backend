// authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Check if the authorization header is present
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user information to the request object
    req.user = decoded.user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
