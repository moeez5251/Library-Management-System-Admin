
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});

const sendEmail = async (to, subject, text, html) => {
  return transporter.sendMail({
    from: `"XLMS Support" <${process.env.Email}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendEmail };
