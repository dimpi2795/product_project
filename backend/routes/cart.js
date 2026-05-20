import express from 'express';
import {
    addToCart,
    removeItem,
    updateItemQuantity,
    getCart 
} from '../controllers/cartController.js';

const router = express.Router();

// Add to cart
router.post('/add', addToCart);

// Remove item from cart
router.post('/remove', removeItem);

// Update item quantity in cart
router.post('/update', updateItemQuantity);

// Get cart details
router.get('/:userId', getCart);

export default router;
