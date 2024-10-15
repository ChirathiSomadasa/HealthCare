import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editAppointment.css';

function EditAppointment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctorAppointments } = location.state || { doctorAppointments: [] };

    // State variables
    const [selectedAppointment, setSelectedAppointment] = useState(doctorAppointments[0]?._id || '');
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const [noOtherAppointments, setNoOtherAppointments] = useState(false);

    // Fetch available appointments when the page loads or selected appointment changes
    useEffect(() => {
        if (selectedAppointment) {
            checkAvailableAppointments(selectedAppointment);
        }
    }, [selectedAppointment]);

    // Function to check available appointments for the same doctor
    const checkAvailableAppointments = async (appointmentId) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/appointment/checkAvailability/${appointmentId}`);
            const { otherAppointments } = response.data;

            if (otherAppointments.length > 0) {
                setAvailableAppointments(otherAppointments);
                setNoOtherAppointments(false);
            } else {
                setAvailableAppointments([]);
                setNoOtherAppointments(true);
            }
        } catch (error) {
            console.error("Error checking available appointments:", error);
            alert("An error occurred while checking for other appointments.");
        }
    };

    // Function to handle the rescheduling of the appointment
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
            navigate('/viewAppointments'); // Redirect back to appointments page
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
            alert("An error occurred while rescheduling the appointment.");
        }
    };

    return (
        <div className="reschedule-container">
            <h2 className="reschedule-title">Reschedule Appointment</h2>

            {noOtherAppointments ? (
                <div className="reschedule-availableAppointments">
                    <p>No other appointments are available with this doctor. You can continue with the current one or cancel.</p>
                </div>
            ) : (
                <div className="reschedule-inputContainer">
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
            )}

            <div className="reschedule-inputContainer">
                <label htmlFor="newDate">New Appointment Date:</label>
                <input
                    type="date"
                    id="newDate"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
            </div>

            <div className="reschedule-inputContainer">
                <label htmlFor="newTime">New Appointment Time:</label>
                <input
                    type="time"
                    id="newTime"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                />
            </div>

            {availableAppointments.length > 0 && (
                <div className="reschedule-availableAppointments">
                    <h3>Other Available Appointments with the Same Doctor:</h3>
                    {availableAppointments.map((appointment) => (
                        <div key={appointment._id}>
                            <p>{`Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}, Time: ${appointment.appointmentTime}`}</p>
                        </div>
                    ))}
                </div>
            )}

            <button className="reschedule-rescheduleButton" onClick={handleReschedule}>
                Reschedule
            </button>
        </div>
    );
}

export default EditAppointment;
