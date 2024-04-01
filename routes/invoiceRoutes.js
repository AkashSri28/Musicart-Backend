const express = require('express');
const { saveInvoice, getInvoices } = require('../controllers/invoiceController');
const router = express.Router();


//Router to save invoice
router.post('/save', saveInvoice);

// Route to fetch invoices for the current user
router.post('/', getInvoices);



module.exports = router;