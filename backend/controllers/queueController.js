import Queue from '../models/Queue.js';
import Appointment from '../models/Appointment.js';

// Get queue status
export const getQueueStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const queueEntry = await Queue.findOne({ appointmentId })
      .populate('doctorId', 'name specialization')
      .populate('appointmentId');

    if (!queueEntry) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.json({
      message: 'Queue status fetched',
      queue: queueEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch queue status', error: error.message });
  }
};

// Get doctor's queue
export const getDoctorQueue = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const today = new Date().toISOString().split('T')[0];

    const queue = await Queue.find({ doctorId, status: { $ne: 'Completed' } })
      .populate('appointmentId')
      .populate('userId', 'name phone')
      .sort({ queuePosition: 1 });

    res.json({
      message: 'Doctor queue fetched',
      queue
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctor queue', error: error.message });
  }
};

// Add patient to queue
export const addToQueue = async (req, res) => {
  try {
    const { appointmentId, doctorId, patientName } = req.body;

    // Get the queue position
    const lastQueueEntry = await Queue.findOne({ doctorId })
      .sort({ queuePosition: -1 });

    const queuePosition = lastQueueEntry ? lastQueueEntry.queuePosition + 1 : 1;

    const queueEntry = new Queue({
      appointmentId,
      userId: req.user.userId,
      doctorId,
      patientName,
      queuePosition,
      status: 'Waiting',
      estimatedWaitTime: queuePosition * 15
    });

    await queueEntry.save();

    res.status(201).json({
      message: 'Patient added to queue',
      queue: queueEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to queue', error: error.message });
  }
};

// Update queue status
export const updateQueueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { queueId } = req.params;

    const queueEntry = await Queue.findByIdAndUpdate(
      queueId,
      { 
        status,
        ...(status === 'Called' && { calledTime: new Date() }),
        ...(status === 'Completed' && { completedTime: new Date() })
      },
      { new: true }
    ).populate('appointmentId');

    if (!queueEntry) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.json({
      message: 'Queue status updated',
      queue: queueEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update queue status', error: error.message });
  }
};

// Check in patient
export const checkInPatient = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queueEntry = await Queue.findByIdAndUpdate(
      queueId,
      { 
        status: 'Waiting',
        checkedInTime: new Date()
      },
      { new: true }
    ).populate('appointmentId');

    if (!queueEntry) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.json({
      message: 'Patient checked in',
      queue: queueEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to check in patient', error: error.message });
  }
};

// Remove from queue
export const removeFromQueue = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const queueEntry = await Queue.findOneAndDelete({ appointmentId });

    if (!queueEntry) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    res.json({
      message: 'Patient removed from queue'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from queue', error: error.message });
  }
};

// Get queue analytics
export const getQueueAnalytics = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const totalPatients = await Queue.countDocuments({ doctorId });
    const waitingPatients = await Queue.countDocuments({ doctorId, status: 'Waiting' });
    const completedToday = await Queue.countDocuments({ 
      doctorId, 
      status: 'Completed',
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    const avgWaitTime = await Queue.aggregate([
      { $match: { doctorId: require('mongoose').Types.ObjectId(doctorId), status: 'Completed' } },
      {
        $group: {
          _id: null,
          avgTime: {
            $avg: {
              $subtract: ['$completedTime', '$checkedInTime']
            }
          }
        }
      }
    ]);

    res.json({
      message: 'Queue analytics fetched',
      analytics: {
        totalPatients,
        waitingPatients,
        completedToday,
        avgWaitTimeMinutes: Math.round((avgWaitTime[0]?.avgTime || 0) / 60000)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch queue analytics', error: error.message });
  }
};
