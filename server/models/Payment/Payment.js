var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

var userSchema = new Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        doctorId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Doctor', 
            required: true 
        },
        appointmentId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Appointment', 
            required: true 
        },
        amount: { 
            type: Number, 
            required: true },
        paymentDate: { 
            type: Date, 
            default: Date.now 
        },
        paymentMethod: { 
            type: String, 
            enum: ['card', 'insurance'], 
            required: true 
        },
        insuranceDetails: {
            company: { type: String },
            policyNumber: { type: String },
            otherDetails: { type: String }
        }
    }
);

var payment = mongoose.model("payment", userSchema);
module.exports = payment;
