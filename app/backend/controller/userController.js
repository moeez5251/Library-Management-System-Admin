const { poolPromise } = require('../models/db');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
console.log(uuidv4());
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', name)
      .input('email', email)
      .input('password', hashedPassword)
      .input('id', uuidv4())
      .query(`
        INSERT INTO users (name, email, password, id)
        OUTPUT INSERTED.id
        VALUES (@name, @email, @password, @id)
      `);


    const insertedId = result.recordset[0].id;

    res.status(201).json({ message: 'User created successfully', userId: insertedId });
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
