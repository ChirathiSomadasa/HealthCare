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
        cardNumber: { type: Number, required: function() { return this.paymentMethod === 'card'; } },
        cardOwner: { type: String, required: function() { return this.paymentMethod === 'card'; } },
        expiryMonth: { type: Number, required: function() { return this.paymentMethod === 'card'; } },
        expiryYear: { type: Number, required: function() { return this.paymentMethod === 'card'; } },
        cvv: { type: Number, required: function() { return this.paymentMethod === 'card'; } },
    },
    insuranceDetails: {
        insuranceCompany: { type: String, required: function() { return this.paymentMethod === 'insurance'; } },
        policyNumber: { type: Number, required: function() { return this.paymentMethod === 'insurance'; } },
        policyholderName: { type: String, required: function() { return this.paymentMethod === 'insurance'; } },
    },
    cashDetails: {
        bankSlip: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
        depositorName: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
        telephone: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
        email: { type: String, required: function() { return this.paymentMethod === 'cash'; } },
    },
    doctorName: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', paymentSchema);
