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
    const [otherAppointments, setOtherAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(false);

    const handleReschedule = async () => {
        if (!selectedAppointment || !newDate || !newTime) {
            alert("Please select an appointment and enter a new date and time.");
            return;
        }

        try {
            // Fetch available appointments for the same doctor
            setLoadingAppointments(true);
            const response = await axios.get(`http://localhost:5002/api/appointment/doctorAppointments/${selectedAppointment}`);
            const doctorAppointments = response.data;

            setLoadingAppointments(false);

            if (doctorAppointments.length === 1) {
                alert("This doctor has no other available appointments. You can proceed with the current appointment or cancel.");
            } else {
                setOtherAppointments(doctorAppointments.filter(app => app._id !== selectedAppointment));
            }
        } catch (error) {
            console.error("Error fetching doctor's appointments:", error);
            alert("An error occurred while fetching doctor's appointments.");
            setLoadingAppointments(false);
        }
    };

    const handleConfirmReschedule = async (appointmentId) => {
        try {
            await axios.put(`http://localhost:5002/api/appointment/reschedule/${appointmentId}`, {
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

            <button className="editApp-rescheduleButton" onClick={handleReschedule} disabled={loadingAppointments}>
                {loadingAppointments ? 'Checking Availability...' : 'Reschedule'}
            </button>

            {otherAppointments.length > 0 && (
                <div className="editApp-availableAppointments">
                    <h3>Available Appointments with Same Doctor:</h3>
                    {otherAppointments.map((appointment) => (
                        <div key={appointment._id}>
                            <p>{`${new Date(appointment.appointmentDate).toLocaleDateString()} at ${appointment.appointmentTime}`}</p>
                            <button onClick={() => handleConfirmReschedule(appointment._id)}>Select This Slot</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EditAppointment;
