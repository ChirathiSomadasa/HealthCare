const mongoose = require("mongoose");
 
const recordSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Add userId field
    guardian_name: { type: String, required: true },
    guardian_Mno: { type: String, required: true },  // Corrected typo
    height: { type: String, required: true },
    weight: { type: String, required: true },
    age: { type: String, required: true },
    blood_group: { type: String, required: true },
    heart_rate: { type: String, required: true },  // Added this field
    blood_pressure: { type: String, required: true },
    temperature: { type: String, required: true },
    oxygen_saturation: { type: String, required: true },
    respiratory_rate: { type: String, required: true },
    gender: { type: String, required: true },
     
  },
  {
    timestamps: true,
  }
);

recordSchema.connect((err) => {
  if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
  }
  console.log('Connected to the database');
});

module.exports = mongoose.model("Record", recordSchema);
 