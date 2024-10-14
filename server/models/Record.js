// feedback.model.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    } 
});

const Feedback = mongoose.model('records', feedbackSchema);

module.exports = Feedback;