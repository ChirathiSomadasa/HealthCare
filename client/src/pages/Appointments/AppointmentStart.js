import React from 'react';
import './AppointmentStart.css';
import { useNavigate } from 'react-router-dom';

const AppointmentStart = () => {
    const navigate = useNavigate();

    const handleQuickBook = () => {
        navigate('/Doctorappointments'); 
    };

    return (
        <div className="appointment-container">
            <div className='parallax1'>
                <div className="appointment_centered">
                    <h1>Your Wellness, One Click Away!</h1>
                </div>
            </div>
            
            <div className="Appointment-booking">
                <h2 className="Appointment-buttonTopic">Schedule My Appointment</h2>
                <button className="btn-book-appointment-btn" onClick={handleQuickBook}>
                     Book Now
                </button>
            </div>
        </div>
    );
};

export default AppointmentStart;
