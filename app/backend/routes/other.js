const express = require('express');
const router = express.Router();
const otherController = require('../controller/other'); 
router.get('/getbookdata', otherController.getbookdata);
module.exports = router;