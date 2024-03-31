const express = require('express');
const { saveInvoice } = require('../controllers/invoiceController');
const router = express.Router();

//Router to save invoice
router.post('/', saveInvoice);


module.exports = router;