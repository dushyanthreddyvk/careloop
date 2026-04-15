import Appointment from '../models/Appointment.js';
import Queue from '../models/Queue.js';

// Get all appointments for a user
export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.userId })
      .populate('doctorId', 'name specialization hospital');
    
    res.json({
      message: 'Appointments fetched successfully',
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctorId', 'name specialization hospital')
      .populate('userId', 'name email phone');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      message: 'Appointment fetched successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointment', error: error.message });
  }
};

// Create appointment
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, patientName, patientPhone, appointmentDate, appointmentTime, symptoms, consultationFee } = req.body;

    // Generate booking reference
    const bookingReference = `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newAppointment = new Appointment({
      userId: req.user.userId,
      doctorId,
      patientName,
      patientPhone,
      appointmentDate,
      appointmentTime,
      symptoms,
      consultationFee,
      bookingReference,
      status: 'Scheduled',
      paymentStatus: 'Pending'
    });

    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create appointment', error: error.message });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('doctorId', 'name specialization hospital');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error: error.message });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Remove from queue if exists
    await Queue.deleteOne({ appointmentId: req.params.id });

    res.json({
      message: 'Appointment cancelled successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel appointment', error: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Remove from queue if exists
    await Queue.deleteOne({ appointmentId: req.params.id });

    res.json({
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
  }
};

// Get all appointments (Admin)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email phone')
      .populate('doctorId', 'name specialization hospital');
    
    res.json({
      message: 'All appointments fetched successfully',
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

// Get appointments for a doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId })
      .populate('userId', 'name email phone')
      .sort({ appointmentDate: 1 });
    
    res.json({
      message: 'Doctor appointments fetched successfully',
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctor appointments', error: error.message });
  }
};
