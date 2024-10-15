// feedback.route.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Record');

// Create new feedback
router.post('/', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).send(feedback);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.send(feedbacks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get feedback by ID
router.get('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).send({ message: 'Record not found' });
        }
        res.send(feedback);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Fetch a single problem by ID
router.get('/api/getContact/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findById(id);
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching problem' });
    }
});

// Update feedback by ID
router.put('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedback) {
            return res.status(404).send();
        }
        res.send(feedback);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete feedback by ID
router.delete('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).send();
        }
        res.send(feedback);
    } catch (error) {
        res.status(500).send(error);
    }
});




// Add a solution to a problem
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { note } = req.body;

    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        feedback.notes.push({ note });
        await feedback.save();
        res.status(200).json({ message: 'Solution added successfully', data: feedback });
    } catch (err) {
        res.status(500).json({ error: 'Error adding solution. Please try again.' });
    }
});

 

// Add a note to a feedback record by ID
router.post('/:id/notes', async (req, res) => {
    const { id } = req.params;
    const { note } = req.body;
    
    if (!note) {
        return res.status(400).json({ message: 'Note content is required' });
    }

    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Record not found' });
        }
        
        // Add note to feedback record
        feedback.notes.push({ note });
        await feedback.save();
        
        res.status(200).json({ message: 'Note added successfully', feedback });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


// Get feedback by ID
router.get('/:id/notes', async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findById(id).populate('notes');
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching problem' });
    }
});


 

module.exports = router;