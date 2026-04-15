import express from 'express';
import {
  getUserPayments,
  getPaymentById,
  createPaymentIntent,
  confirmPayment,
  refundPayment,
  getPaymentStats
} from '../controllers/paymentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', authenticateToken, getUserPayments);
router.get('/:id', authenticateToken, getPaymentById);
router.post('/intent', authenticateToken, createPaymentIntent);
router.post('/:id/confirm', authenticateToken, confirmPayment);
router.post('/:id/refund', authenticateToken, refundPayment);

// Admin routes
router.get('/admin/stats', authenticateToken, getPaymentStats);

export default router;
