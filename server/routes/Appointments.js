const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Route to book an appointment
router.post('/addAppointment', async (req, res) => {
  try {
    const { patientName, patientNumber, additionalNote, doctorName, doctorSpecialization, appointmentDate, appointmentTime } = req.body;

    if (!patientName || !patientNumber || !doctorName || !doctorSpecialization || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAppointment = new Appointment({
      patientName,
      patientNumber,
      additionalNote,
      doctorName,
      doctorSpecialization,
      appointmentDate,
      appointmentTime,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get appointment details by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
