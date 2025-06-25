const { poolPromise } = require('../models/db');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

exports.createUser = async (req, res) => {
  const { API } = req.body;
  try {
    if (API !== process.env.XLMS_API) {
      return res.status(400).json({ error: 'Invalid API' });
    }
  } catch (err) {
    console.error('Error in API validation:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  try {
    const { User_Name, Email, Role, Membership_Type, Password } = req.body;

    if (!User_Name || !Email || !Role || !Membership_Type || !Password)
      return res.status(400).json({ error: 'All fields are required' });

    // Check if the user already exists
    const pool = await poolPromise;
    const existingUserResult = await pool.request()
      .input('email', Email)
      .query('SELECT COUNT(*) AS count FROM users WHERE email = @email');

    if (existingUserResult.recordset[0].count > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const userId = `${User_Name[0].toUpperCase()}${uuidv4().replace(/-/g, "").slice(0, 8)}`;
    // Insert the new user into the database
    const result = await pool.request()
      .input('User_id', userId)
      .input('User_Name', User_Name)
      .input('Email', Email)
      .input('Role', Role)
      .input('Membership_Type', Membership_Type)
      .input('Password', hashedPassword)
      .input('Cost', 0)
      .input('Status', 'Active')
      .query('INSERT INTO users (User_id, User_Name, Email, Role, Membership_Type, Password, Cost, Status) VALUES (@User_id, @User_Name, @Email, @Role, @Membership_Type, @Password, @Cost, @Status)');
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  const { API } = req.body;
  if (API !== process.env.XLMS_API) {
    return res.status(400).json({ error: 'Invalid API' });
  }
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT User_id, User_Name, Email, 	Role, Membership_Type,Status, Cost FROM users');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
