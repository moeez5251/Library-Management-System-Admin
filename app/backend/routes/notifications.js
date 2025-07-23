const express = require('express');
const router = express.Router();
const notificationsController = require('../controller/notificationscontroller');
router.post('/add', notificationsController.addnotifications);
router.post('/get', notificationsController.getnotifications);
module.exports = router;