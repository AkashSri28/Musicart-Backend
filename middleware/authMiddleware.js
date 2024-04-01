// authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  // Check if the authorization header is present
  const {authorization} = req.headers;

  if(!authorization){
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1];
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  try {
    const {_id} = jwt.verify(token, process.env.SECRET_KEY)
    console.log(_id)

    req.user = await User.findOne({_id}).select('_id')
    console.log(req.user+"Hello")
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
