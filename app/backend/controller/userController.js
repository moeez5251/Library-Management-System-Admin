const { poolPromise } = require('../models/db');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
exports.createUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    // Check if the user already exists
    const pool = await poolPromise;
    const existingUserResult = await pool.request()
      .input('email', email)
      .query('SELECT COUNT(*) AS count FROM users WHERE email = @email');

    if (existingUserResult.recordset[0].count > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique ID
    const userId = uuidv4();

    // Insert the new user into the database
    const result = await pool.request()
      .input('name', name)
      .input('email', email)
      .input('password', hashedPassword)
      .input('role', role)
      .query(`
        INSERT INTO users (name, email, password, role)
        OUTPUT INSERTED.name
        VALUES (@name, @email, @password, @role)
      `);

    const insertedId = result.recordset[0].name;

    res.status(201).json({ message: 'User created successfully', username: insertedId });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT name, email FROM users');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT name, email,role FROM users');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
