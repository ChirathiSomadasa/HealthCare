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
            <div className='parallax'>
                <div className="appointment_centered">
                    <h1>Nourish the earth, see your harvest’s worth.</h1>
                </div>
            </div>
            
            <div className="quick-booking">
                <h2>Quick Booking</h2>
                <button className="btn quick-book-btn" onClick={handleQuickBook}>
                    Quick Book
                </button>
            </div>
        </div>
    );
};

export default AppointmentStart;
