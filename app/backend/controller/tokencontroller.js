const { poolPromise } = require('../models/db');
const bcrypt = require('bcrypt');

exports.verify = async (req, res) => {
    try {

        const { token } = req.body
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('token', token)
            .query('SELECT * FROM PasswordResetTokens WHERE token = @token');
        const userid = result.recordset[0].user_id
        const userinfo = await pool
            .request()
            .input('user_id', userid)
            .query('Select Email from users where User_id = @user_id');
        res.json({ token: result.recordset[0], userEmail: userinfo.recordset[0].Email });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.update = async (req, res) => {
    const password = req.body.password
    const { token } = req.body
    try {

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input('token', token)
            .query('SELECT * FROM PasswordResetTokens WHERE token = @token');
        const userid = result.recordset[0].user_id

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool
            .request()
            .input('user_id', userid)
            .input('password', hashedPassword)
            .query('UPDATE users SET password = @password WHERE User_id = @user_id');

        await pool
            .request()
            .input('token', token)
            .query('DELETE FROM PasswordResetTokens WHERE token = @token');
        res.json({ message: 'Password updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}