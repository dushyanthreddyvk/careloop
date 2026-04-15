import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  searchDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAvailableSlots,
  updateAvailableSlots
} from '../controllers/doctorController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllDoctors);
router.get('/search', searchDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/slots', getAvailableSlots);

// Protected routes (Admin only - would need admin middleware)
router.post('/', authenticateToken, createDoctor);
router.put('/:id', authenticateToken, updateDoctor);
router.delete('/:id', authenticateToken, deleteDoctor);
router.put('/:id/slots', authenticateToken, updateAvailableSlots);

export default router;
