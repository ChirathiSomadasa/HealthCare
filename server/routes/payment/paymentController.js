const Payment = require('../../models/Payment/Payment02'); // Import Payment model

// Payment Controller
exports.submitPayment = async (req, res) => {
    try {
        const { paymentMethod, cardDetails, insuranceDetails, cashDetails, doctorName, totalAmount } = req.body;

        // Create payment data object based on payment method
        let paymentData = {
            paymentMethod,
            doctorName,
            totalAmount,
        };

        // Conditionally add details based on payment method
        if (paymentMethod === 'card') {
            paymentData = {
                ...paymentData,
                cardDetails,
            };
        } else if (paymentMethod === 'insurance') {
            paymentData = {
                ...paymentData,
                insuranceDetails,
            };
        } else if (paymentMethod === 'cash') {
            paymentData = {
                ...paymentData,
                cashDetails,
            };
        }

        // Save to database
        const newPayment = new Payment(paymentData);
        await newPayment.save();

        res.status(200).json({ message: 'Payment successfully processed' });
    } catch (error) {
        console.error('Error processing payment:', error.message);
        res.status(500).json({ error: 'Payment processing failed' });
    }
};
