const express = require('express');
const router = express.Router();
const booksController = require('../controller/bookscontroller');

router.post('/insert', booksController.inserting);
router.get('/get', booksController.getting);
module.exports = router;
