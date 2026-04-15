import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    recordType: {
      type: String,
      enum: ['Prescription', 'Lab Report', 'X-Ray', 'Medical History', 'Other'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    fileUrl: {
      type: String
    },
    fileName: {
      type: String
    },
    diagnosis: {
      type: String
    },
    treatment: {
      type: String
    },
    medications: [
      {
        name: String,
        dosage: String,
        duration: String
      }
    ],
    notes: {
      type: String
    },
    visibility: {
      type: String,
      enum: ['Private', 'Shared with Doctors'],
      default: 'Private'
    }
  },
  { timestamps: true }
);

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
