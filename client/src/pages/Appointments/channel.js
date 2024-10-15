import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
Navigate

const Channel = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientNumber: "",
    additionalNote: "",
    doctorName: "",
    doctorSpecialization: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  const navigate = useNavigate();

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/appointments", formData);
      alert("Appointment confirmed!");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
    const handleConfirmationNowClick = () => {
        navigate("/");
      };
  };

  return (
    <div className="chanel-container">
      <form onSubmit={handleSubmit}>
        <div className="patient-details">
          <h2>Patient Details</h2>
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
          <label>Patient Number:</label>
          <input
            type="text"
            name="patientNumber"
            value={formData.patientNumber}
            onChange={handleChange}
          />
          <label>Additional Note:</label>
          <textarea
            name="additionalNote"
            value={formData.additionalNote}
            onChange={handleChange}
            placeholder="Any comments regarding the patient health"
          />
        </div>

        <div className="chanel-details">
          <h2>Appointment Details</h2>
          <label>Doctor Name:</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
          />
          <label>Doctor Specialization:</label>
          <input
            type="text"
            name="doctorSpecialization"
            value={formData.doctorSpecialization}
            onChange={handleChange}
          />
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
          <label>Appointment Time:</label>
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
          />
          <p className="fees-info">
            Channeling fees: Appointment fees + Booking Fees
          </p>
          <p className="time-info">
            Your estimated appointment time is 7:00 AM. This time depends on the
            time spent with patients/applicants ahead of you.
          </p>

          <button type="submit" className="confirm-button" onClick={handleConfirmationNowClick}>
          Confirm Appointment
        </button>
        </div>
      </form>
    </div>
  );
};

export default Channel;
