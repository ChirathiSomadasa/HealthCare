const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientNumber: {
    type: String,
    required: true,
  },
  additionalNote: {
    type: String,
    default: '',
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialization: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
