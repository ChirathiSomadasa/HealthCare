const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({

    // userId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User', 
    //     required: true 
    // },
    company: { 
        type: String, 
        required: true 
    },
    policyNumber: { 
        type: Number, 
        required: true 
    },
    policyholderName: { 
        type: String, 
        require: true
    }
});

const insurance = mongoose.model('insurance', insuranceSchema);
module.exports = insurance;
