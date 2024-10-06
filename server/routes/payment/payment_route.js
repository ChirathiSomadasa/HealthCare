const express = require('express');
const router = express.Router();
const Payment = require('../../models/Payment/Payment');
const Appointment = require('../models/Appointment');

// Calculate payment amount
router.post('/calculate-amount', async (req, res) => {
    const { appointmentId } = req.body;
    
    try {
        const appointment = await Appointment.findById(appointmentId).populate('doctorId');
        const amount = appointment.fee + 5; // Example: adding system fee
        res.status(200).json({ amount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create payment
router.post('/', async (req, res) => {
    const { userId, doctorId, appointmentId, amount, paymentMethod, insuranceDetails } = req.body;
    
    const payment = new Payment({
        userId,
        doctorId,
        appointmentId,
        amount,
        paymentMethod,
        insuranceDetails
    });

    try {
        await payment.save();
        res.status(201).json({ message: 'Payment successful', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get payment history
router.get('/history/:userId', async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.params.userId }).populate('doctorId');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
