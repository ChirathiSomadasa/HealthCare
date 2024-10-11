const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    availableDates: {
        type: [String], // Store dates as strings for simplicity
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
