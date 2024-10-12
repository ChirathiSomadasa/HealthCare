const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Add a doctor to the database
router.post('/add', async (req, res) => {
    try {
        const { name, specialization, hospital, availableAppointments, gender } = req.body;

        // Basic validation
        if (!name || !specialization || !hospital || !availableAppointments || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newDoctor = new Doctor({ name, specialization, hospital, availableAppointments, gender });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all doctors
router.get('/getAllDoc', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Search for doctors
router.get('/search', async (req, res) => {
    const { name, specialization, hospital, date } = req.query;
    try {
        const query = {};

        // Build search criteria
        if (name) query.name = new RegExp(name, 'i');
        if (specialization) query.specialization = new RegExp(specialization, 'i');
        if (hospital) query.hospital = new RegExp(hospital, 'i');
        
        // If a date is provided, filter by available appointments
        if (date) {
            query['availableAppointments.date'] = date;
        }

        const doctors = await Doctor.find(query);

        if (doctors.length > 0) {
            return res.status(200).json(doctors);
        } else {
            return res.status(404).json({ message: 'No doctors found matching the criteria' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
