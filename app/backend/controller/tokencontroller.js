const { poolPromise } = require('../models/db');

exports.verify = async (req, res) => {
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
    res.json({token: result.recordset[0], userEmail: userinfo.recordset[0].Email});
}