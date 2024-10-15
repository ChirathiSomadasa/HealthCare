import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editAppointment.css';

function EditAppointment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctorAppointments } = location.state || { doctorAppointments: [] };

    const [selectedAppointment, setSelectedAppointment] = useState(doctorAppointments[0]?._id || '');
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    const handleReschedule = async () => {
        if (!selectedAppointment || !newDate || !newTime) {
            alert("Please select an appointment and enter a new date and time.");
            return;
        }

        try {
            await axios.put(`http://localhost:5002/api/appointment/reschedule/${selectedAppointment}`, {
                appointmentDate: newDate,
                appointmentTime: newTime,
            });
            alert("Appointment rescheduled successfully!");
            navigate('/viewAppointments'); // Redirect back to appointments
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
            alert("An error occurred while rescheduling the appointment.");
        }
    };

    return (
        <div className="editApp-container">
            <h2 className="editApp-title">Reschedule Appointment</h2>
            <div className="editApp-selectContainer">
                <label htmlFor="appointments">Choose an appointment to reschedule:</label>
                <select
                    id="appointments"
                    value={selectedAppointment}
                    onChange={(e) => setSelectedAppointment(e.target.value)}
                >
                    {doctorAppointments.map((appointment) => (
                        <option key={appointment._id} value={appointment._id}>
                            {`${appointment.patientName} - ${new Date(appointment.appointmentDate).toLocaleDateString()} ${appointment.appointmentTime}`}
                        </option>
                    ))}
                </select>
            </div>
            <div className="editApp-inputContainer">
                <label htmlFor="newDate">New Appointment Date:</label>
                <input
                    type="date"
                    id="newDate"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
            </div>
            <div className="editApp-inputContainer">
                <label htmlFor="newTime">New Appointment Time:</label>
                <input
                    type="time"
                    id="newTime"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                />
            </div>
            <button className="editApp-rescheduleButton" onClick={handleReschedule}>Reschedule</button>
        </div>
    );
}

export default EditAppointment;
