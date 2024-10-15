const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    cardNumber: { type: Number, required: true },
    cardOwner: { type: String, required: true },
    expiryMonth: { type: Number, required: true },
    expiryYear: { type: Number, required: true },
    cvv: { type: Number, required: true },
});

module.exports = mongoose.model('Card', CardSchema);
