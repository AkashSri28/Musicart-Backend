const express = require('express');
const router = express.Router();
const { addToCart, getUserCart,updateCartItemQuantity } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// POST route to add a product to the cart
router.post('/add', addToCart);

router.put('/updateQuantity', updateCartItemQuantity);

router.post('/', authMiddleware, getUserCart);



module.exports = router;