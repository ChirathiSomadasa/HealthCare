const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Add a doctor to the database
router.post('/add', async (req, res) => {
    try {
        const { name, specialization, hospital, availableDates, gender } = req.body;
        const newDoctor = new Doctor({ name, specialization, hospital, availableDates, gender });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Search for doctors
router.get('/search', async (req, res) => {
    const { name, specialization, hospital, date } = req.query;
    try {
        const doctors = await Doctor.find({
            name: new RegExp(name, 'i'),
            specialization,
            hospital,
            availableDates: date
        });

        if (doctors.length > 0) {
            res.status(200).json(doctors);
        } else {
            const nameMatches = await Doctor.find({ name: new RegExp(name, 'i') });
            res.status(200).json({ message: 'No exact matches found', suggestions: nameMatches });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
