const express = require('express');
const router = express.Router();
const mails = require('../controller/mails');
router.post("/otp", mails.OTP);
router.post("/verify", mails.verifyotp);
router.post("/resend", mails.resendotp);
router.post("/reset", mails.resetpassword);
module.exports = router;