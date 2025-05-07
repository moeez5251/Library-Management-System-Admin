const bcrypt = require('bcrypt');
const { poolPromise } = require('../models/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT * FROM users WHERE email = @email');

    const users = result.recordset;

    if (users.length === 0)
      return res.status(400).json({ message: 'No User Found' });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: 'Invalid password' });

    // Store user info and role in session
    req.session.user = {
      name: user.name,
      email: user.email,
      role: "admin", // Store the role in session if needed
    };

    res.json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        role: "admin", // Send role back as part of response
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
