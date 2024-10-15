import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './allAppointments.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Logo from '../../images/logo.png';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ViewAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [error, setError] = useState(null);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:5002/api/appointment/viewAllAppointments");
            setAppointments(response.data);
            setFilteredAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setError("Failed to fetch appointments. Please try again.");
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        const filtered = appointments.filter(appointment =>
            Object.values(appointment).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredAppointments(filtered);
    }, [searchTerm, appointments]);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:5002/api/appointment/${id}`);
                fetchAppointments(); 
                alert("Appointment Canceled successfully!"); 
            } catch (error) {
                console.error("Error cancelling appointment:", error);
                alert("An error occurred while cancelling the appointment.");
            }
        }
    };

    // Function to load image and convert it to Data URL
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = (err) => reject(err);
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = async (id, doctorId, appointmentDate, appointmentTime) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/appointment/doctorAppointments/${doctorId}`);
            const doctorAppointments = response.data;
    
            // Filter out the current appointment and check if the doctor has other appointments
            const otherAppointments = doctorAppointments.filter(
                (appointment) =>
                    appointment.appointmentDate !== appointmentDate ||
                    appointment.appointmentTime !== appointmentTime
            );
    
            if (otherAppointments.length === 0) {
                alert("This doctor has only this appointment. You can either cancel or keep the current appointment.");
            } else {
                // Navigate to reschedule page with other available appointments
                navigate(`/editAppointment/${id}`, { state: { doctorAppointments: otherAppointments } });
            }
        } catch (error) {
            console.error("Error fetching doctor's appointments:", error);
            alert("An error occurred while checking doctor's appointments.");
        }
    };
    

    const handleDownloadPDF = async () => {
        // PDF download logic
    };

    return (
        <div className="viewApp-container">
            <div className="viewApp-background" />
            <h2 className="viewApp-title">Appointments</h2>
            {error && <div className="viewApp-error">{error}</div>}
            <div className="viewApp-controls">
                <div className="viewApp-controls2">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="viewApp-searchInput"
                        style={{width: '200px', margin: '0'}}
                    />
                    <button
                        className="viewApp-searchButton"
                        onClick={() => setFilteredAppointments(appointments.filter(appointment => 
                            Object.values(appointment).some(value => 
                                String(value).toLowerCase().includes(searchTerm.toLowerCase())
                            )
                        ))}
                    >
                        Search
                    </button>
                </div>
                <button
                    className="viewApp-downloadButton"
                    onClick={handleDownloadPDF}
                >
                    Download PDF
                </button>
            </div>
            <div className="viewApp-cardContainer">
                {filteredAppointments.length === 0 ? (
                    <div>No appointments found.</div>
                ) : (
                    filteredAppointments.map((appointment) => (
                        <div key={appointment._id} className="viewApp-card">
                            <h3>{appointment.patientName}</h3>
                            <p><strong>Patient Number:</strong> {appointment.patientNumber}</p>
                            <p><strong>Doctor:</strong> {appointment.doctorName} ({appointment.doctorSpecialization})</p>
                            <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                            <p><strong>Notes:</strong> {appointment.additionalNote}</p>
                            <div className="viewApp-cardActions">
                                <button className="viewApp-actionButton delete" onClick={() => handleDelete(appointment._id)}>Cancel Appointment</button>
                                <button
    className="viewApp-actionButton1 reschedule"
    onClick={() => handleEdit(appointment._id, appointment.doctorId, appointment.appointmentDate, appointment.appointmentTime)}
>
    Reschedule Appointment
</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ViewAppointments;
