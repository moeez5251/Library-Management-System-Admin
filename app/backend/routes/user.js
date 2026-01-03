const express = require('express');
const   router = express.Router();
const userController = require('../controller/userController');

router.post('/register', userController.createUser);
router.post('/all', userController.getAllUsers);
router.get('/getbyid',userController.getuserbyid)
router.post('/getmemberbyid',userController.getmemberbyid)
router.post('/update', userController.updateuser);
router.post('/deactivate', userController.deactivateUser);
router.post('/activate', userController.activateUser);
router.delete('/delete', userController.deleteaccount);
router.put('/changepassword', userController.changepassword);
module.exports = router;
