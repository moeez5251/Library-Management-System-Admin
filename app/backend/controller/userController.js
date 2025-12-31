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
    const pool = await poolPromise;
    const existingUserResult = await pool.request()
      .input('email', Email)
      .query('SELECT COUNT(*) AS count FROM users WHERE email = @email');

    if (existingUserResult.recordset[0].count > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const userId = `${User_Name[0].toUpperCase()}${uuidv4().replace(/-/g, "").slice(0, 8)}`;
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
exports.getuserbyid = async (req, res) => {
  try {
   
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('ID', req.user.id)
      .query('SELECT  User_Name, Email, Role, Membership_Type,Status FROM users WHERE User_id = @ID');
    res.json({
      ...result.recordset[0],
      User_id: req.user.id
    });
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.updateuser = async (req, res) => {
  const { ID, User_Name, Email, Role, Membership_Type } = req.body;
  try {
    if (!ID || !User_Name || !Email || !Role || !Membership_Type) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('ID', ID)
      .input('User_Name', User_Name)
      .input('Email', Email)
      .input('Role', Role)
      .input('Membership_Type', Membership_Type)
      .query('UPDATE users SET User_Name = @User_Name, Email = @Email, Role = @Role, Membership_Type = @Membership_Type WHERE User_id = @ID');
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.deactivateUser = async (req, res) => {
  const id_arr = req.body;
  if (!Array.isArray(id_arr) || id_arr.length === 0) {
    return res.status(400).json({ error: 'ID array is required and cannot be empty' });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();

    const idParams = id_arr.map((id, index) => {
      const paramName = `id${index}`;
      request.input(paramName, id);
      return `@${paramName}`;
    });
    const quer = `select Status from users where User_id IN (${idParams.join(',')})`
    const result = await request.query(quer);

    for (const item of result.recordset) {
      if (item.Status === 'Deactivated') {
        return res.status(405).json({ error: 'User is already deactivated' });
      }
    }
    const query = `UPDATE users SET Status = 'Deactivated' WHERE User_id IN (${idParams.join(',')})`;

    await request.query(query);

    res.json({ message: 'Users deactivated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.activateUser = async (req, res) => {
  const { ID } = req.body
  if (!ID) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('ID', ID)
      .query("UPDATE users SET Status = 'Active' WHERE User_id = @ID");
    res.json({ message: 'User activated successfully' });
  } catch (err) {
    console.error('Error activating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.deleteaccount = async (req, res) => {
  const id_arr = req.body;
  if (!Array.isArray(id_arr) || id_arr.length === 0) {
    return res.status(400).json({ error: 'ID array is required and cannot be empty' });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();
    const idParams = id_arr.map((id, index) => {
      const paramName = `id${index}`;
      request.input(paramName, id);
      return `@${paramName}`;
    });
    const query = `DELETE FROM users WHERE User_id IN (${idParams.join(',')})`;
    await request.query(query);
    res.json({ message: 'Users deleted successfully' });
  } catch (err) {
    console.error('Error deleting users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.changepassword = async (req, res) => {
  const { OldPassword, NewPassword } = req.body;
  if (!OldPassword || !NewPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const pool = await poolPromise;
    const userResult = await pool.request()
      .input('ID', req.user.id)
      .query('SELECT Password FROM users WHERE User_id = @ID');

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.recordset[0];
    const isMatch = await bcrypt.compare(OldPassword, user.Password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Password' });
    }

    const hashedNewPassword = await bcrypt.hash(NewPassword, 10);
    await pool.request()
      .input('ID', req.user.id)
      .input('NewPassword', hashedNewPassword)
      .query('UPDATE users SET Password = @NewPassword WHERE User_id = @ID');

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}