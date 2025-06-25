const express = require('express');
const   router = express.Router();
const userController = require('../controller/userController');

router.post('/register', userController.createUser);
router.post('/all', userController.getAllUsers);

module.exports = router;
