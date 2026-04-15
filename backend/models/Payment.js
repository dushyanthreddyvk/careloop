import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash'],
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    transactionId: {
      type: String
    },
    stripePaymentIntentId: {
      type: String
    },
    cardLast4: {
      type: String
    },
    upiId: {
      type: String
    },
    failureReason: {
      type: String
    },
    receiptUrl: {
      type: String
    },
    refundAmount: {
      type: Number
    },
    refundReason: {
      type: String
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
