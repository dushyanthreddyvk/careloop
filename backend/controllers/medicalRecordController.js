import MedicalRecord from '../models/MedicalRecord.js';

// Get all medical records for a user
export const getUserMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.user.userId })
      .populate('doctorId', 'name specialization')
      .populate('appointmentId', 'appointmentDate');
    
    res.json({
      message: 'Medical records fetched successfully',
      records
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medical records', error: error.message });
  }
};

// Get medical record by ID
export const getMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('doctorId', 'name specialization')
      .populate('appointmentId', 'appointmentDate');
    
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    res.json({
      message: 'Medical record fetched successfully',
      record
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medical record', error: error.message });
  }
};

// Create medical record
export const createMedicalRecord = async (req, res) => {
  try {
    const { recordType, title, description, diagnosis, treatment, medications, appointmentId, doctorId } = req.body;

    const newRecord = new MedicalRecord({
      userId: req.user.userId,
      recordType,
      title,
      description,
      diagnosis,
      treatment,
      medications,
      appointmentId,
      doctorId,
      visibility: 'Private'
    });

    await newRecord.save();

    res.status(201).json({
      message: 'Medical record created successfully',
      record: newRecord
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create medical record', error: error.message });
  }
};

// Update medical record
export const updateMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('doctorId', 'name specialization');

    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    res.json({
      message: 'Medical record updated successfully',
      record
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update medical record', error: error.message });
  }
};

// Delete medical record
export const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);
    
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    res.json({
      message: 'Medical record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete medical record', error: error.message });
  }
};

// Upload medical record file (placeholder)
export const uploadMedicalRecord = async (req, res) => {
  try {
    const { title, recordType, description, fileName } = req.body;

    const newRecord = new MedicalRecord({
      userId: req.user.userId,
      title,
      recordType,
      description,
      fileName,
      fileUrl: `/uploads/${fileName}`,
      visibility: 'Private'
    });

    await newRecord.save();

    res.status(201).json({
      message: 'Medical record uploaded successfully',
      record: newRecord
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload medical record', error: error.message });
  }
};

// Get records by type
export const getRecordsByType = async (req, res) => {
  try {
    const { recordType } = req.params;
    
    const records = await MedicalRecord.find({
      userId: req.user.userId,
      recordType
    }).populate('doctorId', 'name specialization');

    res.json({
      message: 'Records fetched by type',
      records
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error: error.message });
  }
};
