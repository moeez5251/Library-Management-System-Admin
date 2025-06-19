const express = require('express');
const router = express.Router();
const booksController = require('../controller/bookscontroller');

router.post('/insert', booksController.inserting);
router.get('/get', booksController.getting);
router.post("/getbyID", booksController.getbyID)
router.put('/update', booksController.updatebook);
router.delete("/delete",booksController.deletebook)
module.exports = router;
