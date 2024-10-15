const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

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

// Route to get all appointments
router.get('/viewAllAppointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found' });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get all appointments for a specific doctor
router.get('/doctorAppointments/:doctorId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.params.doctorId });
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching doctor\'s appointments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to update an appointment by ID (reschedule)
router.put('/reschedule/:id', async (req, res) => {
    try {
        const { appointmentDate, appointmentTime } = req.body; // Assume these fields are provided for rescheduling
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { appointmentDate, appointmentTime },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error rescheduling appointment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to delete an appointment by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling the appointment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to check the availability of other appointments for the same doctor
router.get('/checkAvailability/:appointmentId', async (req, res) => {
    try {
        const { appointmentId } = req.params;

       
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const doctorId = appointment.doctorId;

        
        const otherAppointments = await Appointment.find({
            doctorId: doctorId,
            _id: { $ne: appointmentId } 
        });

        
        return res.status(200).json({ otherAppointments });
    } catch (error) {
        console.error("Error checking available appointments:", error);
        return res.status(500).json({ message: "An error occurred while checking availability" });
    }
});



module.exports = router;
