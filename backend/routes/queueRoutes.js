import express from 'express';
import {
  getQueueStatus,
  getDoctorQueue,
  addToQueue,
  updateQueueStatus,
  checkInPatient,
  removeFromQueue,
  getQueueAnalytics
} from '../controllers/queueController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/status/:appointmentId', authenticateToken, getQueueStatus);
router.post('/', authenticateToken, addToQueue);
router.patch('/:queueId/status', authenticateToken, updateQueueStatus);
router.patch('/:queueId/check-in', authenticateToken, checkInPatient);
router.delete('/:appointmentId', authenticateToken, removeFromQueue);

// Doctor routes
router.get('/doctor/:doctorId', authenticateToken, getDoctorQueue);
router.get('/doctor/:doctorId/analytics', authenticateToken, getQueueAnalytics);

export default router;
