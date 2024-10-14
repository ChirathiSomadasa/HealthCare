const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // appointmentId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Appointment',
    //     required: false,
    // },
    paymentMethod: {
        type: String,
        enum: ['card', 'insurance', 'cash'],
        required: true,
    },
    cardDetails: {
        cardNumber: { type: String, required: function() { return this.paymentMethod === 'card'; } },
        cardOwner: { type: String, required: function() { return this.paymentMethod === 'card'; } },
        expiryMonth: { type: String, required: function() { return this.paymentMethod === 'card'; } },
        expiryYear: { type: String, required: function() { return this.paymentMethod === 'card'; } },
        cvv: { type: String, required: function() { return this.paymentMethod === 'card'; } },
    },
    insuranceDetails: {
        insuranceCompany: { type: String, required: function() { return this.paymentMethod === 'insurance'; } },
        policyNumber: { type: String, required: function() { return this.paymentMethod === 'insurance'; } },
        policyholderName: { type: String, required: function() { return this.paymentMethod === 'insurance'; } },
    },
    cashDetails: {
        bankSlip: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
        depositorName: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
        telephone: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
        email: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
    },
    // totalAmount: {
    //     type: Number,
    //     required: true,
    // },
    // status: {
    //     type: String,
    //     enum: ['pending', 'completed'],
    //     default: 'pending',
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', paymentSchema);
