const jwt = require('jsonwebtoken');
const { poolPromise } = require('../models/db');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
   
    const decoded = jwt.verify(token, process.env.JWT);

    
    const pool = await poolPromise;
    const result = await pool.request()
      .input('token', token)
      .query(`
        SELECT * FROM sessions
        WHERE session_token = @token AND expires_at > GETUTCDATE()
      `);
      
    if (!result.recordset.length) {
      return res.status(401).json({ message: 'Session expired or invalid' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
