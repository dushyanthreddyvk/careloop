import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from './models/Doctor.js';
import connectDB from './config/database.js';

dotenv.config();

const seedDoctors = async () => {
  try {
    await connectDB();

    // Check if doctors already exist
    const existingDoctors = await Doctor.countDocuments();
    if (existingDoctors > 0) {
      console.log('✓ Doctors already exist. Skipping seed.');
      process.exit(0);
    }

    const doctors = [
      {
        name: 'Dr. Rajesh Kumar',
        specialization: 'Cardiology',
        qualifications: 'MD, Cardiology - AIIMS Delhi',
        experience: 15,
        hospital: 'CareLoop Hospital',
        consultationFee: 800,
        rating: 4.8,
        reviews: 245,
        bio: 'Experienced cardiologist with 15 years of practice. Specializes in treating heart conditions.',
        availableSlots: [
          { date: '2026-04-16', time: '09:00 AM', available: true },
          { date: '2026-04-16', time: '09:30 AM', available: true },
          { date: '2026-04-16', time: '10:00 AM', available: false },
          { date: '2026-04-16', time: '10:30 AM', available: true }
        ]
      },
      {
        name: 'Dr. Priya Sharma',
        specialization: 'Orthopedics',
        qualifications: 'MS, Orthopedic Surgery - Delhi University',
        experience: 12,
        hospital: 'CareLoop Hospital',
        consultationFee: 700,
        rating: 4.7,
        reviews: 189,
        bio: 'Specialist in orthopedic surgeries and bone injuries. 12 years of experience.',
        availableSlots: [
          { date: '2026-04-16', time: '02:00 PM', available: true },
          { date: '2026-04-16', time: '02:30 PM', available: true },
          { date: '2026-04-16', time: '03:00 PM', available: true }
        ]
      },
      {
        name: 'Dr. Amit Singh',
        specialization: 'Neurology',
        qualifications: 'MD, Neurology - PGI Chandigarh',
        experience: 18,
        hospital: 'CareLoop Hospital',
        consultationFee: 900,
        rating: 4.9,
        reviews: 312,
        bio: 'Senior neurologist specializing in migraine and neurological disorders.',
        availableSlots: [
          { date: '2026-04-16', time: '11:00 AM', available: true },
          { date: '2026-04-16', time: '11:30 AM', available: true },
          { date: '2026-04-16', time: '04:00 PM', available: true }
        ]
      },
      {
        name: 'Dr. Sneha Patel',
        specialization: 'Dermatology',
        qualifications: 'MD, Dermatology - KEM Mumbai',
        experience: 10,
        hospital: 'CareLoop Hospital',
        consultationFee: 600,
        rating: 4.6,
        reviews: 156,
        bio: 'Dermatologist focusing on skin care and cosmetic procedures.',
        availableSlots: [
          { date: '2026-04-16', time: '03:00 PM', available: true },
          { date: '2026-04-16', time: '03:30 PM', available: true },
          { date: '2026-04-16', time: '04:30 PM', available: true }
        ]
      },
      {
        name: 'Dr. Vikram Desai',
        specialization: 'General Surgery',
        qualifications: 'MS, General Surgery - Grant Medical College',
        experience: 20,
        hospital: 'CareLoop Hospital',
        consultationFee: 850,
        rating: 4.8,
        reviews: 298,
        bio: 'Highly experienced general surgeon with expertise in laparoscopic procedures.',
        availableSlots: [
          { date: '2026-04-16', time: '08:00 AM', available: true },
          { date: '2026-04-16', time: '08:30 AM', available: true },
          { date: '2026-04-16', time: '01:00 PM', available: true }
        ]
      }
    ];

    const result = await Doctor.insertMany(doctors);
    console.log(`✓ ${result.length} doctors added to database`);
    console.log('✓ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDoctors();
