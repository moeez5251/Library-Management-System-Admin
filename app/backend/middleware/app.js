const jwt = require('jsonwebtoken');


const authenticate = async (req, res, next) => {
  const token = req.cookies?.token; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT);

   
    req.user = decoded;

   
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
