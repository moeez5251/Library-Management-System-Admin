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
  console.log(email,password);
  try {
    const promise = await poolPromise

    const user = await promise.request()
      .input('Email', email)
      .input('Role', 'Admin')
      .input('Status', 'Active')
      .query('select * from users where Email=@Email and Role=@Role and Status=@Status')

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email/Password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.recordset[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Email/Password' });
    }
    const token = generateToken(user.recordset[0]);

    await res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/',
      maxAge: 3600000
    });


    res.json({ message: 'Login successful', token, userid: user.recordset[0].User_id });
  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
