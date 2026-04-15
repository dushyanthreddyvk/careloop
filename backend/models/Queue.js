import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
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
    queuePosition: {
      type: Number,
      required: true
    },
    estimatedWaitTime: {
      type: Number,
      default: 15
    },
    checkedInTime: {
      type: Date
    },
    calledTime: {
      type: Date
    },
    completedTime: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Waiting', 'Called', 'In Progress', 'Completed', 'No Show'],
      default: 'Waiting'
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

const Queue = mongoose.model('Queue', queueSchema);
export default Queue;
