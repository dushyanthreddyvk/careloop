import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    qualifications: {
      type: String
    },
    experience: {
      type: Number
    },
    hospital: {
      type: String
    },
    availableSlots: [
      {
        date: String,
        time: String,
        available: Boolean
      }
    ],
    consultationFee: {
      type: Number,
      default: 500
    },
    rating: {
      type: Number,
      default: 4.5
    },
    reviews: {
      type: Number,
      default: 0
    },
    image: {
      type: String
    },
    bio: {
      type: String
    }
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
