const { poolPromise } = require('../models/db');
const bycrypt = require('bcrypt');
const { sendEmail } = require('./mailer');
exports.OTP = async (req, res) => {
    const { Name, Email } = req.body;
    try {
        const pool = await poolPromise;
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const EmailTemplate =
            `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <title></title>
        <style>
            body {
            margin: 0;
            padding: 0;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #333;
            background-color: #fff;
            }

            .container {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            padding: 0 0px;
            padding-bottom: 10px;
            border-radius: 5px;
            line-height: 1.8;
            }

            .header {
            border-bottom: 1px solid #eee;
            }

            .header a {
            font-size: 1.4em;
            color: #000;
            text-decoration: none;
            font-weight: 600;
            }

            .content {
            min-width: 700px;
            overflow: auto;
            line-height: 2;
            }

            .otp {
            background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
            margin: 0 auto;
            width: max-content;
            padding: 0 10px;
            color: #fff;
            border-radius: 4px;
            font-size: 2em;
            }

            .footer {
            color: #aaa;
            font-size: 0.8em;
            line-height: 1;
            font-weight: 300;
            }

            .email-info {
            color: #666666;
            font-weight: 400;
            font-size: 13px;
            line-height: 18px;
            padding-bottom: 6px;
            }

            .email-info a {
            text-decoration: none;
            color: #00bc69;
            }
        </style>
        </head>

        <body>
       
        <div class="container">
            <div class="header">
            <a>XLMS Password Reset</a>
            </div>
            <br />
            <strong>Dear ${Name},</strong>
            <p>
            We have received a Password Reset request for your XLMS account. For
            security purposes, please verify your identity by providing the
            following One-Time Password (OTP).
            <br />
            <b>Your One-Time Password (OTP) verification code is:</b>
            </p>
            <h2 class="otp">${OTP}</h2>
            <p style="font-size: 0.9em">
            <strong>One-Time Password (OTP) is valid for 3 minutes.</strong>
            <br />
            <br />
            If you did not initiate this  request, please disregard this
            message. Please ensure the confidentiality of your OTP and do not share
            it with anyone.<br />
            <strong>Do not forward or give this code to anyone.</strong>
            <br />
            <br />
            <strong>Thank you for using XLMS.</strong>
            <br />
            <br />
            Best regards,
            <br />
            <strong>XLMS</strong>
            </p>

            <hr style="border: none; border-top: 0.5px solid #131111" />
            <div class="footer">
            <p>This email can't receive replies.</p>
            
            </div>
        </div>
        <div style="text-align: center">
            <div class="email-info">
            <span>
                This email was sent to
                <a href="mailto:${Email}">${Email}</a>
            </span>
            </div>
        
            <div class="email-info">
            &copy; 2025 XLMS. All rights
            reserved.
            </div>
        </div>
        </body>
        </html>`
        const text = `XLMS Password Reset

        Dear ${Name},

        We have received a Password Reset request for your XLMS account. For security purposes, please verify your identity by providing the following One-Time Password (OTP).

        Your One-Time Password (OTP) verification code is:
        ${OTP}

        One-Time Password (OTP) is valid for 3 minutes.

        If you did not initiate this request, please disregard this message. Please ensure the confidentiality of your OTP and do not share it with anyone.
        Do not forward or give this code to anyone.

        Thank you for using XLMS.

        Best regards,  
        XLMS

        ----------------------------------------

        This email can't receive replies.

        This email was sent to: ${Email}

        © 2025 XLMS. All rights reserved.`;

        const subject = 'XLMS Password Reset OTP';
        const request = await pool
            .request()
            .input('Email', Email)
            .input('OTP', OTP)
            .query('INSERT INTO OTPS (Email, OTPCode) VALUES (@Email, @OTP)');
        await sendEmail(Email, subject, text, EmailTemplate);
        setTimeout(async () => {
            await pool.request()
                .input('Email', Email)
                .query('DELETE FROM OTPS WHERE Email = @Email');
        }, 180000);
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.resendotp = async (req, res) => {
    const { Name, Email } = req.body;
    try {
        const pool = await poolPromise;
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const EmailTemplate =
            `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <title></title>
        <style>
            body {
            margin: 0;
            padding: 0;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #333;
            background-color: #fff;
            }

            .container {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            padding: 0 0px;
            padding-bottom: 10px;
            border-radius: 5px;
            line-height: 1.8;
            }

            .header {
            border-bottom: 1px solid #eee;
            }

            .header a {
            font-size: 1.4em;
            color: #000;
            text-decoration: none;
            font-weight: 600;
            }

            .content {
            min-width: 700px;
            overflow: auto;
            line-height: 2;
            }

            .otp {
            background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
            margin: 0 auto;
            width: max-content;
            padding: 0 10px;
            color: #fff;
            border-radius: 4px;
            font-size: 2em;
            }

            .footer {
            color: #aaa;
            font-size: 0.8em;
            line-height: 1;
            font-weight: 300;
            }

            .email-info {
            color: #666666;
            font-weight: 400;
            font-size: 13px;
            line-height: 18px;
            padding-bottom: 6px;
            }

            .email-info a {
            text-decoration: none;
            color: #00bc69;
            }
        </style>
        </head>

        <body>
       
        <div class="container">
            <div class="header">
            <a>XLMS Password Reset</a>
            </div>
            <br />
            <strong>Dear ${Name},</strong>
            <p>
            We have received a Password Reset request for your XLMS account. For
            security purposes, please verify your identity by providing the
            following One-Time Password (OTP).
            <br />
            <b>Your One-Time Password (OTP) verification code is:</b>
            </p>
            <h2 class="otp">${OTP}</h2>
            <p style="font-size: 0.9em">
            <strong>One-Time Password (OTP) is valid for 3 minutes.</strong>
            <br />
            <br />
            If you did not initiate this  request, please disregard this
            message. Please ensure the confidentiality of your OTP and do not share
            it with anyone.<br />
            <strong>Do not forward or give this code to anyone.</strong>
            <br />
            <br />
            <strong>Thank you for using XLMS.</strong>
            <br />
            <br />
            Best regards,
            <br />
            <strong>XLMS</strong>
            </p>

            <hr style="border: none; border-top: 0.5px solid #131111" />
            <div class="footer">
            <p>This email can't receive replies.</p>
            
            </div>
        </div>
        <div style="text-align: center">
            <div class="email-info">
            <span>
                This email was sent to
                <a href="mailto:${Email}">${Email}</a>
            </span>
            </div>
        
            <div class="email-info">
            &copy; 2025 XLMS. All rights
            reserved.
            </div>
        </div>
        </body>
        </html>`
        const text = `XLMS Password Reset

        Dear ${Name},

        We have received a Password Reset request for your XLMS account. For security purposes, please verify your identity by providing the following One-Time Password (OTP).

        Your One-Time Password (OTP) verification code is:
        ${OTP}

        One-Time Password (OTP) is valid for 3 minutes.

        If you did not initiate this request, please disregard this message. Please ensure the confidentiality of your OTP and do not share it with anyone.
        Do not forward or give this code to anyone.

        Thank you for using XLMS.

        Best regards,  
        XLMS

        ----------------------------------------

        This email can't receive replies.

        This email was sent to: ${Email}

        © 2025 XLMS. All rights reserved.`;

        const subject = 'XLMS Password Reset OTP';
        await pool.request()
            .input('Email', Email)
            .query('DELETE FROM OTPS WHERE Email = @Email');
        const request = await pool
            .request()
            .input('Email', Email)
            .input('OTP', OTP)
            .query('INSERT INTO OTPS (Email, OTPCode) VALUES (@Email, @OTP)');
        await sendEmail(Email, subject, text, EmailTemplate);
        setTimeout(async () => {
            await pool.request()
                .input('Email', Email)
                .query('DELETE FROM OTPS WHERE Email = @Email');
        }, 180000);
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.verifyotp = async (req, res) => {
    const { Email, OTP } = req.body;
    try {
        const pool = await poolPromise;
        const request = await pool
            .request()
            .input('Email', Email)
            .input('OTP', OTP)
            .query('SELECT * FROM OTPS WHERE Email = @Email AND OTPCode = @OTP');
        if (request.recordset.length > 0) {
            await pool.request()
                .input('Email', Email)
                .query('DELETE FROM OTPS WHERE Email = @Email');
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.resetpassword = async (req, res) => {
    const { ID, Email, NewPassword } = req.body;
    try {
        const pool = await poolPromise;
        const hashedPassword = await bycrypt.hash(NewPassword, 10);
        const request = await pool
            .request()
            .input('id', ID)
            .input('Email', Email)
            .input('NewPassword', hashedPassword)
            .query('UPDATE Users SET password = @NewPassword WHERE User_id = @id AND Email = @Email');
        if (request.rowsAffected[0] > 0) {
            return res.status(200).json({ message: 'Password updated successfully' });
        } else {
            return res.status(400).json({ error: 'Failed to update password' });
        }
    }
    catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}