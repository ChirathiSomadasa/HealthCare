import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import "./AddAppointment.css";

const AddAppointment = () => {
    const [formData, setFormData] = useState({
        patientName: "",
        patientNumber: "",
        additionalNote: "",
        doctorName: "",
        doctorSpecialization: "",
        appointmentDate: "",
        appointmentTime: "",
    });

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const doctorId = queryParams.get('doctorId'); 
    const doctorName = queryParams.get('doctorName');
    const doctorSpecialization = queryParams.get('specialization');
    const appointmentDate = queryParams.get('appointmentDate');
    const appointmentTime = queryParams.get('appointmentTime');

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            if (doctorId) {
                try {
                    const response = await axios.get(`http://localhost:5002/api/doctors/${doctorId}`);
                    // Ensure the data structure from response is correct
                    setFormData((prevData) => ({
                        ...prevData,
                        doctorName,
                        doctorSpecialization,
                        appointmentDate,
                        appointmentTime: formatTo12Hour(appointmentTime) || '',
                    }));
                } catch (error) {
                    console.log('Error fetching doctor details', error);
                }
            }
        };
        fetchDoctorDetails();
    }, [doctorId, doctorName, doctorSpecialization, appointmentDate, appointmentTime]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5002/api/appointment/addAppointment", formData);
            alert("Appointment confirmed!");
            navigate("/confirmation");
        } catch (error) {
            console.error("Error booking appointment:", error.response ? error.response.data : error.message);
            alert("There was an error booking the appointment. Please try again.");
        }
    };

    const formatTo12Hour = (timeString) => {
        const date = new Date(timeString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };

    return (
        <div className="Addappointment-container">
            <form onSubmit={handleSubmit}>
                <div className="patient-details">
                    <h2>Patient Details</h2>
                    <label>Patient Name:</label>
                    <input
                        className="Adetails"
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                    />
                    <label>Patient Number:</label>
                    <input
                        type="text"
                        name="patientNumber"
                        value={formData.patientNumber}
                        onChange={handleChange}
                        required
                    />
                    <label>Additional Note:</label>
                    <textarea
                        name="additionalNote"
                        value={formData.additionalNote}
                        onChange={handleChange}
                        placeholder="Any comments regarding the patient health"
                    />
                </div>

                <div className="appointment-details">
                    <h2>Appointment Details</h2>
                    <label>Doctor Name:</label>
                    <input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        readOnly
                    />
                    <label>Doctor Specialization:</label>
                    <input
                        type="text"
                        name="doctorSpecialization"
                        value={formData.doctorSpecialization}
                        readOnly
                    />
                    <label>Appointment Date:</label>
                    <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                    />
                    <label>Appointment Time:</label>
                    <input
                        type="text"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        readOnly
                    />
                    <button type="submit" className="confirm-button">
                        Confirm Appointment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAppointment;
