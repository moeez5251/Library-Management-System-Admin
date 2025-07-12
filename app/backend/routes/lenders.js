const express = require('express');
const router = express.Router();
const lenders = require('../controller/lendersControllers');
router.post("/all", lenders.getalllenders);
router.post("/getlenderbyid", lenders.getlenderbyid);
router.post("/insert",lenders.addbook)
module.exports = router;