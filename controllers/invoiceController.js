const Invoice = require('../models/InvoiceModel');
const Cart = require('../models/CartModel');
const mongoose = require('mongoose');

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

  

  
  module.exports = {saveInvoice};