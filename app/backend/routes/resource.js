const express = require('express');
const router = express.Router();
const resourceController = require('../controller/resourcecontroller');

router.post('/add', resourceController.add);
module.exports = router;