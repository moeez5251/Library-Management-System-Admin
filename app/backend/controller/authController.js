const bcrypt = require('bcrypt');
const { poolPromise } = require('../models/db');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
function generateToken(user) {
  return jwt.sign(
    { id: user.User_id, email: user.Email },
    process.env.JWT,
    { expiresIn: '1h' }
  );
}

exports.login = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();
  const API = req.body.API?.trim()
  if (API !== process.env.XLMS_API || !API) {
    return res.status(400).json({ message: 'Invalid API' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', email)
      .query('SELECT User_id, password, Role, Status FROM Users WHERE LOWER(Email) = LOWER(@email)');

    if (!result.recordset.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(password, user.password);
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
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true
    });

    res.json({ message: 'Login successful', token, userid: user.User_id });

  } catch (error) {
    console.error('Login error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",  // explicitly specify path if you used it during set
    });


    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
