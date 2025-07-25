require('dotenv').config();
const { poolPromise } = require('../models/db');
const { v4: uuidv4 } = require('uuid');
const token = uuidv4();
const generatetoken = async (id) => {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const expiresAtInPKT = expiresAt.toLocaleString("en-PK", {
        timeZone: "Asia/Karachi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
    const pool = await poolPromise;

    await pool
        .request()
        .input('token', token)
        .input('user_id', id)
        .input('expires_at', expiresAtInPKT)
        .input('used', false)
        .query('INSERT INTO PasswordResetTokens (token, user_id, expires_at, used) VALUES (@token, @user_id, @expires_at, @used)');

    const resetLink = `https://xlms-admin.netlify.app/reset-password?token=${token}`;
    return resetLink;
}

module.exports = { generatetoken };