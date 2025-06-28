const express = require('express');
const   router = express.Router();
const userController = require('../controller/userController');

router.post('/register', userController.createUser);
router.post('/all', userController.getAllUsers);
router.post('/getbyid',userController.getuserbyid)
router.post('/update', userController.updateuser);
router.post('/deactivate', userController.deactivateUser);
module.exports = router;
