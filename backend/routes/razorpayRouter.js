import express from 'express';
import { createRazorpayOrder } from '../controllers/orderController.js';

const router = express.Router();

// Route to create an order
router.post('/create-order', createRazorpayOrder);

export default router;
