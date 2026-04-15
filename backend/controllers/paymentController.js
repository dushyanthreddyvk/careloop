import Payment from '../models/Payment.js';
import Appointment from '../models/Appointment.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

// Get all payments for a user
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId })
      .populate('appointmentId')
      .populate('doctorId', 'name specialization');
    
    res.json({
      message: 'Payments fetched successfully',
      payments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('appointmentId')
      .populate('doctorId', 'name specialization')
      .populate('userId', 'name email phone');
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      message: 'Payment fetched successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment', error: error.message });
  }
};

// Create payment intent (for Stripe)
export const createPaymentIntent = async (req, res) => {
  try {
    const { appointmentId, amount, paymentMethod } = req.body;

    // Create or update appointment payment status
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Create payment record
    const payment = new Payment({
      appointmentId,
      userId: req.user.userId,
      doctorId: appointment.doctorId,
      amount,
      paymentMethod,
      status: 'Pending'
    });

    await payment.save();

    // For demo purposes, we'll return a success response
    // In production, integrate with Stripe
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_dummy') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency: 'inr',
          metadata: {
            appointmentId: appointmentId,
            userId: req.user.userId
          }
        });

        payment.stripePaymentIntentId = paymentIntent.id;
        payment.status = 'Processing';
        await payment.save();

        return res.status(201).json({
          message: 'Payment intent created',
          clientSecret: paymentIntent.client_secret,
          payment: payment
        });
      } catch (stripeError) {
        // Fallback to demo mode
        return res.status(201).json({
          message: 'Payment processing (demo mode)',
          clientSecret: 'demo_secret_' + appointmentId,
          payment: payment
        });
      }
    }

    res.status(201).json({
      message: 'Payment created (demo mode)',
      clientSecret: 'demo_secret_' + appointmentId,
      payment: payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment', error: error.message });
  }
};

// Confirm payment
export const confirmPayment = async (req, res) => {
  try {
    const { paymentId, transactionId, cardLast4, upiId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = 'Completed';
    payment.transactionId = transactionId || `TXN-${Date.now()}`;
    
    if (cardLast4) {
      payment.cardLast4 = cardLast4;
    }
    if (upiId) {
      payment.upiId = upiId;
    }

    await payment.save();

    // Update appointment payment status
    await Appointment.findByIdAndUpdate(
      payment.appointmentId,
      { paymentStatus: 'Completed' }
    );

    res.json({
      message: 'Payment confirmed successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to confirm payment', error: error.message });
  }
};

// Refund payment
export const refundPayment = async (req, res) => {
  try {
    const { refundAmount, refundReason } = req.body;
    const paymentId = req.params.id;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = 'Refunded';
    payment.refundAmount = refundAmount || payment.amount;
    payment.refundReason = refundReason;

    await payment.save();

    res.json({
      message: 'Payment refunded successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to refund payment', error: error.message });
  }
};

// Get payment stats (Admin)
export const getPaymentStats = async (req, res) => {
  try {
    const totalPayments = await Payment.countDocuments();
    const completedPayments = await Payment.countDocuments({ status: 'Completed' });
    const pendingPayments = await Payment.countDocuments({ status: 'Pending' });
    const totalAmount = await Payment.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      message: 'Payment stats fetched',
      stats: {
        totalPayments,
        completedPayments,
        pendingPayments,
        totalAmount: totalAmount[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment stats', error: error.message });
  }
};
