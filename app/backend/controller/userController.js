const db = require('../models/db'); // your DB connection
const bcrypt=require("bcrypt")
// Create new user
exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password)
        return res.status(400).json({ error: 'All fields are required' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
        
      const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      const [result] = await db.execute(query, [name, email, hashedPassword]);
  
      res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT  name, email FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
