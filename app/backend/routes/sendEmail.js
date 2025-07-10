const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controller/mailer');

router.post('/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;
  if (!to || !subject || !text || !html) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendEmail(to, subject, text, html);
    res.json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Sending email failed'});
  }
});

module.exports = router;
