const Invoice = require('../models/InvoiceModel');
const Cart = require('../models/CartModel');
const mongoose = require('mongoose');

const getInvoiceById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const invoice = await Invoice.findById(id);
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getInvoices = async (req, res) => {
    try {
        // Retrieve user ID from authenticated request
        const {userId} = req.body;

        // Fetch invoices from the database for the current user
        const invoices = await Invoice.find({ userId: userId });

        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const saveInvoice = async (req, res) => {
    try {
        const { userId, userName, address, paymentMethod, cartItems, cartTotal } = req.body;
        const invoice = new Invoice({
            userId,
            userName,
            address,
            paymentMethod,
            cartItems,
            cartTotal
        });
        const savedInvoice = await invoice.save();

        // Delete cart for this user
        await Cart.deleteOne({ user: userId });

        res.status(201).json(savedInvoice);
    } catch (error) {
        console.error('Error saving invoice:', error);
        res.status(500).json({ error: 'Failed to save invoice' });
    }
  };

  

  
  module.exports = {saveInvoice, getInvoices, getInvoiceById};