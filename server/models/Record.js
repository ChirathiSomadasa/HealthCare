// feedback.model.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    fullname: { type: String,required: true},
    email: {type: String,required: true}, 
    weight: { type: String,required: true},
    height: {type: String,required: true},
    gender: { type: String,required: true},
    age: {type: String,required: true} ,
    bloodgroup: { type: String,required: true},
    heartrate: {type: String,required: true},
    bloodPressure: { type: String,required: true},
    respiratoryRate: {type: String,required: true},
    oxygenSaturation: { type: String,required: true},
    temperature: {type: String,required: true} ,
    guardianName: { type: String,required: true},
    guardianCNo: {type: String,required: true} ,
    notes: [{ note: { type: String }, createdAt: { type: Date, default: Date.now } }] // Array of solutions
 
});

const Feedback = mongoose.model('records', feedbackSchema);

module.exports = Feedback;
 