const express = require('express');
const router = express.Router();
const tokenController = require('../controller/tokencontroller');

router.post('/verify', tokenController.verify);
module.exports = router;