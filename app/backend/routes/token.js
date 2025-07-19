const express = require('express');
const router = express.Router();
const tokenController = require('../controller/tokencontroller');

router.post('/verify', tokenController.verify);
router.put('/update', tokenController.update);
module.exports = router;