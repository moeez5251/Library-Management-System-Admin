const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controller/mailer');

router.post('/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await sendEmail(to, subject, html);
    res.json({ message: 'Email sent', data: response });
  } catch (err) {
    res.status(500).json({ error: 'Sending email failed', details: err });
  }
});

module.exports = router;
