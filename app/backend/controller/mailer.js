const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: `XLMS <onboarding@resend.dev>`, 
      to,
      subject,
      html,
    });

    return response.message;
  } catch (error) {
    console.error('Resend email error:', error);
    throw error;
  }
};

module.exports = { sendEmail };
