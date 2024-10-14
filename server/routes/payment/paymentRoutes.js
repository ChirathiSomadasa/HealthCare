const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Payment = require('../../models/Payment/Payment02');
// const Doctor = require('../../models/Doctor');
// const Appointment = require('../../models/Appointment');
const Card = require('../../models/Payment/Card');
const paymentController = require('../payment/paymentController');


// Fetch doctor and fees by appointment ID
// router.get('/appointment/:id', async (req, res) => {
//     try {
//         const appointment = await Appointment.findById(req.params.id).populate('doctorId');
//         if (!appointment) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }
//         const doctor = appointment.doctorId;
//         res.json({ doctorName: doctor.name, fees: doctor.fees });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });


// POST route for submitting payment
router.post('/payment', paymentController.submitPayment);


// // Save payment details
router.post('/payment', async (req, res) => {
    const { appointmentId, paymentMethod, cardDetails, insuranceDetails, cashDetails, totalAmount } = req.body;

    try {
        // Validate payment method
        if (paymentMethod === 'card') {
            if (!cardDetails || Object.keys(cardDetails).length === 0) {
                return res.status(400).json({ error: 'Card details are required for card payment' });
            }
            if (insuranceDetails || cashDetails) {
                return res.status(400).json({ error: 'Insurance or cash details should not be provided for card payments' });
            }
        } else if (paymentMethod === 'insurance') {
            if (!insuranceDetails || Object.keys(insuranceDetails).length === 0) {
                return res.status(400).json({ error: 'Insurance details are required for insurance payment' });
            }
            if (cardDetails || cashDetails) {
                return res.status(400).json({ error: 'Card or cash details should not be provided for insurance payments' });
            }
        } else if (paymentMethod === 'cash') {
            if (!cashDetails || Object.keys(cashDetails).length === 0) {
                return res.status(400).json({ error: 'Cash details are required for cash payment' });
            }
            if (cardDetails || insuranceDetails) {
                return res.status(400).json({ error: 'Card or insurance details should not be provided for cash payments' });
            }
        }
    
    
        const payment = new Payment({
            // appointmentId,
            paymentMethod,
            cardDetails,
            insuranceDetails,
            cashDetails,
            // totalAmount,
        });

        await payment.save();
        res.json({ message: 'Payment details saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save payment details' }); 
    }
});



// Upload bank slip (for cash payments)
router.post('/payment/cash/upload', upload.single('bankSlip'), (req, res) => {
    try {
        res.json({ message: 'Bank slip uploaded successfully', filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload bank slip' });
    }
});




//save card details
router.post('/api_pcard/card-details', async (req, res) => {
    try {
        const { cardNumber, cardOwner, expiryMonth, expiryYear, cvv } = req.body;
        console.log(req.body); // Check if the card details are received correctly

        const newCard = new Card({
            cardNumber,
            cardOwner,
            expiryMonth,
            expiryYear,
            cvv
        });

        await newCard.save();

        res.status(200).json({ success: true, message: 'Card details saved' });
    } catch (error) {
        console.error('Error saving card details:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Fetch saved cards
router.get('/api_gcard/card-details', async (req, res) => {
    try {
        const savedCards = await Card.find({});
        if (savedCards.length === 0) {
            return res.status(404).json({ message: 'No registered cards' });
        }
        res.status(200).json(savedCards);
    } catch (error) {
        console.error('Error fetching saved cards:', error);
        res.status(500).json({ error: 'Failed to fetch saved cards' });
    }
});


// Delete card details
router.delete('/api_pcard/card-details/:cardNumber', async (req, res) => {
    try {
        const { cardNumber } = req.params;
        const deletedCard = await Card.findOneAndDelete({ cardNumber });

        if (!deletedCard) {
            return res.status(404).json({ success: false, message: 'Card not found' });
        }

        res.status(200).json({ success: true, message: 'Card removed successfully' });
    } catch (error) {
        console.error('Error removing card details:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});





// Fetch payment history
router.get('/payment/history', async (req, res) => {
    try {
        const payments = await Payment.find().populate({
            path: 'appointmentId',
            populate: {
                path: 'doctorId',
                model: 'Doctor',
            },
        });

        const paymentHistory = payments.map(payment => ({
            // appointmentId: payment.appointmentId._id,
            // doctorName: payment.appointmentId.doctorId.name,
            paidDate: payment.createdAt,  // Assuming createdAt as payment date
            // totalAmount: payment.totalAmount,
        }));

        res.json(paymentHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payment history' });
    }
});




module.exports = router;
