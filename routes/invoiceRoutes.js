const express = require('express');
const { saveInvoice, getInvoices, getInvoiceById } = require('../controllers/invoiceController');
const router = express.Router();

// Route to get a invoice by ID
router.get('/:id', getInvoiceById);

//Router to save invoice
router.post('/save', saveInvoice);

// Route to fetch invoices for the current user
router.post('/', getInvoices);



module.exports = router;