import express from 'express';
import {
  getUserAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  getAllAppointments,
  getDoctorAppointments
} from '../controllers/appointmentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', authenticateToken, getUserAppointments);
router.get('/:id', authenticateToken, getAppointmentById);
router.post('/', authenticateToken, createAppointment);
router.put('/:id', authenticateToken, updateAppointment);
router.patch('/:id/cancel', authenticateToken, cancelAppointment);
router.delete('/:id', authenticateToken, deleteAppointment);

// Doctor routes
router.get('/doctor/:doctorId', authenticateToken, getDoctorAppointments);

// Admin routes
router.get('/admin/all', authenticateToken, getAllAppointments);

export default router;
