const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();
const cors = require('cors');
router.use(cors());

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
// Search doctors based on input criteria
router.get('/search', async (req, res) => {
    const { name, specialization, hospital, date } = req.query;

    try {
        // Build the query object
        let query = {};

        // If name is provided, add it to the query
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        // If specialization is provided, add it to the query
        if (specialization) {
            query.specialization = specialization;
        }

        // If hospital is provided, add it to the query
        if (hospital) {
            query.hospital = hospital;
        }

        // Find doctors that match the query
        const doctors = await Doctor.find(query);

        if (doctors.length === 0) {
            // If no exact match, perform a broader search
            const nameSearch = name ? await Doctor.find({ name: { $regex: name, $options: 'i' } }) : [];
            const specializationSearch = specialization ? await Doctor.find({ specialization }) : [];
            const results = [...new Set([...nameSearch, ...specializationSearch])]; 

            return res.status(200).json(results);
        }

        // If matching doctors found
        return res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return res.status(500).json({ message: 'Error fetching doctors' });
    }
});

router.get('/:Docid', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.Docid);  // Use Docid as per your route definition

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);

        // Check if the error is related to an invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid doctor ID' });
        }

        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
