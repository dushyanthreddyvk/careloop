import express from 'express';
import {
  getUserMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  uploadMedicalRecord,
  getRecordsByType
} from '../controllers/medicalRecordController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', authenticateToken, getUserMedicalRecords);
router.get('/:id', authenticateToken, getMedicalRecordById);
router.post('/', authenticateToken, createMedicalRecord);
router.put('/:id', authenticateToken, updateMedicalRecord);
router.delete('/:id', authenticateToken, deleteMedicalRecord);
router.post('/upload', authenticateToken, uploadMedicalRecord);
router.get('/type/:recordType', authenticateToken, getRecordsByType);

export default router;
