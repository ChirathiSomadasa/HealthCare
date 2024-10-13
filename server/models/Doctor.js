const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: {
        type: String, // e.g., "2023-10-15"
        required: true
    },
    time: {
        type: Date, 
        required: true
    },
    fee: {
        type: Number, // Appointment fee
        required: true
    },

});

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
    availableAppointments: {
        type: [appointmentSchema], // Array of appointment objects
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
