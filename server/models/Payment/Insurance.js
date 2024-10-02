const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    company: { 
        type: String, 
        required: true 
    },
    policyNumber: { 
        type: String, 
        required: true 
    },
    otherDetails: { 
        type: String 
    }
});

const insurance = mongoose.model('insurance', insuranceSchema);
module.exports = insurance;
