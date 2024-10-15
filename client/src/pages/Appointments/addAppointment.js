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

    const [validationErrors, setValidationErrors] = useState({
        patientName: "",
        patientNumber: "",
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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate on change
        if (name === "patientName") {
            validatePatientName(value);
        } else if (name === "patientNumber") {
            validatePatientNumber(value);
        }
    };

    const validatePatientName = (value) => {
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(value)) {
            setValidationErrors((prev) => ({
                ...prev,
                patientName: "Patient Name can only contain letters and spaces.",
            }));
        } else {
            setValidationErrors((prev) => ({
                ...prev,
                patientName: "",
            }));
        }
    };

    const validatePatientNumber = (value) => {
        const numberPattern = /^\d{10}$/;
        if (!numberPattern.test(value)) {
            setValidationErrors((prev) => ({
                ...prev,
                patientNumber: "Patient Number must be exactly 10 digits.",
            }));
        } else {
            setValidationErrors((prev) => ({
                ...prev,
                patientNumber: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Final validation before submission
        if (validationErrors.patientName || validationErrors.patientNumber) {
            return; // Prevent submission if there are validation errors
        }
    
        try {
            const response = await axios.post("http://localhost:5002/api/appointment/addAppointment", formData);
            
            // Navigate to confirmation with date and time
            navigate("/confirmation", {
                state: {
                    doctorName: formData.doctorName,
                    appointmentDate: formData.appointmentDate,
                    appointmentTime: formData.appointmentTime,
                },
            });
    
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
                <div className="patientDocDetails">
                    <div className="appointmentpatient-details">
                        <h2>Patient Details</h2>
                        <label className="patientApp">Patient Name:</label>
                        <input
                            className="appPatient"
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            required
                        />
                        {validationErrors.patientName && (
                            <div className="error-appmessage">{validationErrors.patientName}</div>
                        )}
                        <label className="patientApp">Patient Number:</label>
                        <input
                            type="text"
                            name="patientNumber"
                            value={formData.patientNumber}
                            onChange={handleChange}
                            className="appPatient"
                            required
                        />
                        {validationErrors.patientNumber && (
                            <div className="error-appmessage">{validationErrors.patientNumber}</div>
                        )}
                        <label className="patientApp">Additional Note:</label>
                        <textarea
                            name="additionalNote"
                            value={formData.additionalNote}
                            onChange={handleChange}
                            placeholder="Any comments regarding the patient health"
                            className="appPatient"
                        />
                    </div>

                    <div className="appointmentDoc-details">
                        <h2>Appointment Details</h2>
                        <label className="patientApp">Doctor Name:</label>
                        <input
                            type="text"
                            name="doctorName"
                            value={formData.doctorName}
                            readOnly
                            className="appPatient"
                        />
                        <label className="patientApp">Doctor Specialization:</label>
                        <input
                            type="text"
                            name="doctorSpecialization"
                            value={formData.doctorSpecialization}
                            readOnly
                            className="appPatient"
                        />
                        <label className="patientApp">Appointment Date:</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            required
                            readOnly
                            className="appPatient"
                        />
                        <label className="patientApp">Appointment Time:</label>
                        <input
                            type="text"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            readOnly
                            className="appPatient"
                        />
                        <button type="submit" className="confirmapp-button">
                            Confirm Appointment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAppointment;
