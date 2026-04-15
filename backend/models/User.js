import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    age: {
      type: Number
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },
    address: {
      type: String
    },
    medicalHistory: {
      type: String
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcryptjs.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
