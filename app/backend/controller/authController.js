const bcrypt = require('bcrypt');
const { poolPromise } = require('../models/db');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
function generateToken(user) {
  return jwt.sign(
    { id: user.User_id, email: user.Email },  // payload
    process.env.JWT,
    { expiresIn: '1h' }
  );
}

exports.login = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();
  console.log("Login attempt:", { email, password });

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', email)
      .query('SELECT User_id, password, Role, Status FROM Users WHERE LOWER(Email) = LOWER(@email)');

    if (!result.recordset.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.recordset[0];
    console.log("User from DB:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.Status === "Deactivated") {
      return res.status(401).json({ message: 'Your account is Deactivated' });
    }
    if (user.Role !== "Admin") {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    const token = generateToken(user);
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 60 * 60 * 1000);

    await pool.request()
      .input('session_id', uuidv4())
      .input('user_id', user.User_id)
      .input('session_token', token)
      .input('created_at', createdAt)
      .input('expires_at', expiresAt)
      .query(`
    INSERT INTO sessions (session_id, user_id, session_token, created_at, expires_at)
    VALUES (NEWID(), @user_id, @session_token, @created_at, @expires_at)
  `);


    res.json({ message: 'Login successful', token, userid: user.User_id });

  } catch (error) {
    console.error('Login error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const pool = await poolPromise;
    const result = await pool.request()
      .input('token', token)
      .query(`
        DELETE FROM sessions
        WHERE session_token = @token
      `);
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}