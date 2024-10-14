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

module.exports = router;