const bcrypt = require('bcrypt');
const { poolPromise } = require('../models/db');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { id: user.User_id, email: user.Email },  // payload
    process.env.JWT,
    { expiresIn: '1h' }
  );
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {

    const promise = await poolPromise
    const request = await
      promise.request()
        .input('email', email)
        .query('SELECT User_id, password,Role,Status FROM Users WHERE Email = @email');

    if (!request.recordset.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = request.recordset[0];
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.Status === "Deactivated") {
      return res.status(401).json({ message: 'Your account is Deactivated' });
    }
    const token = generateToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'None', // Adjust as necessary,
      maxAge: 3600000 // 1 hour
    });
    res.json({ message: 'Login successful', token, userid: user.User_id });
  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
