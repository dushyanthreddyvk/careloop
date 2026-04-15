import Doctor from '../models/Doctor.js';

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({
      message: 'Doctors fetched successfully',
      doctors
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctors', error: error.message });
  }
};

// Get doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({
      message: 'Doctor fetched successfully',
      doctor
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctor', error: error.message });
  }
};

// Search doctors by specialization
export const searchDoctors = async (req, res) => {
  try {
    const { specialization, name } = req.query;
    let query = {};
    
    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    const doctors = await Doctor.find(query);
    res.json({
      message: 'Doctors found',
      doctors
    });
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
};

// Create doctor (Admin only)
export const createDoctor = async (req, res) => {
  try {
    const { name, specialization, qualifications, experience, hospital, consultationFee, rating, image, bio } = req.body;

    const newDoctor = new Doctor({
      name,
      specialization,
      qualifications,
      experience,
      hospital,
      consultationFee,
      rating,
      image,
      bio,
      availableSlots: []
    });

    await newDoctor.save();
    res.status(201).json({
      message: 'Doctor created successfully',
      doctor: newDoctor
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create doctor', error: error.message });
  }
};

// Update doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({
      message: 'Doctor updated successfully',
      doctor
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update doctor', error: error.message });
  }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete doctor', error: error.message });
  }
};

// Get available slots for a doctor
export const getAvailableSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const availableSlots = doctor.availableSlots.filter(slot => slot.available);
    res.json({
      message: 'Available slots fetched',
      slots: availableSlots
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch slots', error: error.message });
  }
};

// Update doctor's available slots
export const updateAvailableSlots = async (req, res) => {
  try {
    const { availableSlots } = req.body;
    
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { availableSlots },
      { new: true }
    );

    res.json({
      message: 'Slots updated successfully',
      doctor
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update slots', error: error.message });
  }
};
