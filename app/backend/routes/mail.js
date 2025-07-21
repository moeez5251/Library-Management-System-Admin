const express = require('express');
const router = express.Router();
const mails = require('../controller/mails');
router.post("/otp", mails.OTP);
module.exports = router;