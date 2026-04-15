import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    patientName: {
      type: String,
      required: true
    },
    patientPhone: {
      type: String,
      required: true
    },
    appointmentDate: {
      type: String,
      required: true
    },
    appointmentTime: {
      type: String,
      required: true
    },
    symptoms: {
      type: String
    },
    medicalHistory: {
      type: String
    },
    consultationFee: {
      type: Number
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending'
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash'],
      default: 'Credit Card'
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    bookingReference: {
      type: String
    },
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicalRecord'
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
