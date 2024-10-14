const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();
 
router.get(
  "/:id",
  authMiddleware([USER_ROLES.PATIENT]),
  userController.getUserById
);

router.post("/AddProblem", async (req, res) => {
  
    console.log("Received data:", req.body); // Log the incoming data
    // Extracting the patient details from the request body
    const { user_Id, guardian_name, guardian_Mno, height, weight, age, blood_group, heart_rate, blood_pressure, temperature, oxygen_saturation, respiratory_rate, gender } = req.body;
  
    // Check if all required fields are provided
    if (!user_Id || !guardian_name || !guardian_Mno || !height || !weight || !age || !blood_group || !heart_rate || !blood_pressure || !temperature || !oxygen_saturation || !respiratory_rate || !gender) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
        const newProblem = new ContactModel(req.body);
        await newProblem.save();
        res.status(200).json({ message: 'Problem added successfully!', data: newProblem });
    } catch (err) {
        console.error(err); // Log the error to see the stack trace
        res.status(500).json({ error: 'Error adding problem' });
    }
  });
  


module.exports = router;
