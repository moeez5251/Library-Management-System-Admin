const { poolPromise } = require('../models/db');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('./mailer');
exports.getalllenders = async (req, res) => {
    const { API } = req.body;
    if (API !== process.env.XLMS_API) {
        return res.status(400).json({ message: 'Invalid API' });
    }
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM borrower');
        const lenders = result.recordset;
        res.status(200).json(lenders);

    } catch (error) {
        console.error('Error fetching lenders:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.getlenderbyid = async (req, res) => {
    try {
        const { ID } = req.body;
        if (!ID) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('ID', ID)
            .query('SELECT * FROM borrower WHERE Borrower_ID = @ID');
        const lender = result.recordset[0];
        if (!lender) {
            return res.status(404).json({ message: 'Lender not found' });
        }
        res.status(200).json(lender);
    } catch (error) {
        console.error('Error fetching lender by ID:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.addbook = async (req, res) => {
    try {

        const data = req.body
        console.log(data);
        const pool = await poolPromise;

        const existingUserResult = await pool.request()
            .input('email', data.Email)
            .query('SELECT COUNT(*) AS count FROM users WHERE email = @email');

        if (existingUserResult.recordset[0].count > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const userId = `${data.Lendername[0].toUpperCase()}${uuidv4().replace(/-/g, "").slice(0, 8)}`;
        const password = uuidv4().replace(/-/g, "").slice(0, 8) + uuidv4().replace(/-/g, "").slice(0, 8);
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool
            .request()
            .input('User_id', userId)
            .input('User_Name', data.Lendername)
            .input('Email', data.Email)
            .input('Role', data.Role)
            .input('Membership_Type', 'English')
            .input('password', hashedPassword)
            .input('Cost', data.Price)
            .input('Status', 'Active')
            .query('INSERT INTO users (User_id, User_Name, Email, Role, Membership_Type, Password,Cost,Status) VALUES (@User_id, @User_Name, @Email, @Role, @Membership_Type, @Password,@Cost,@Status)');
        const text = `
        Hello ${data.Lendername},

        Your account has been successfully created. Below are your login details:

        Email: ${data.Email}
        Password: ${password}

        Please keep this information secure.

        You can log in at: https://yourdomain.com/login

        Thank you,
        XLMS
        `;

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Login Credentials</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
            padding: 20px;
            }
            .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            max-width: 600px;
            margin: auto;
            }
            h2 {
            color: #4CAF50;
            }
            .info {
            background-color: #f1f1f1;
            padding: 10px 15px;
            border-radius: 6px;
            margin: 10px 0;
            font-family: monospace;
            }
            .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
            }
            .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 16px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 15px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h2>Welcome, ${data.Lendername}!</h2>
            <p>Your account has been successfully created. Here are your login details:</p>

            <p class="info">Email: <strong>${data.Email}</strong></p>
            <p class="info">Password: <strong>${password}</strong></p>

            <p>Please keep this information safe and do not share it with anyone.</p>

            <a href="https://yourdomain.com/login" class="button">Log In Now</a>

            <p class="footer">
            If you did not request this account, please contact our support team immediately.<br><br>
            &copy; 2025 XLMS. All rights reserved
            </p>
        </div>
        </body>
        </html>
        `;

        sendEmail(data.Email, 'Login Credentials', text, html);

        res.status(200).json({ message: 'User created successfully' });
    }
    catch (e) {
        res.status(500).json({ message: 'Server error', error: e });
    }
}