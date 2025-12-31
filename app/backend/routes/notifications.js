const express = require('express');
const router = express.Router();
const notificationsController = require('../controller/notificationscontroller');
router.post('/add', notificationsController.addnotifications);
router.get('/get', notificationsController.getnotifications);
router.post('/markasread', notificationsController.markasread);
module.exports = router;