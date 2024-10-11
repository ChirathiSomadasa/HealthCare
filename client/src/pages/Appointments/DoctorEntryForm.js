import React, { useState } from 'react';
import axios from 'axios';
import './DoctorEntryForm.css';

const DoctorEntryForm = () => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [hospital, setHospital] = useState('');
    const [availableDates, setAvailableDates] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datesArray = availableDates.split(',').map(date => date.trim()); // Convert dates string to array
        const doctorData = {
            name,
            specialization,
            hospital,
            availableDates: datesArray,
            gender
        };

        try {
            const response = await axios.post('http://localhost:5002/api/doctors/add', doctorData);
            setMessage(response.data.message);
            clearForm();
        } catch (error) {
            setMessage('Error adding doctor. Please try again.');
        }
    };

    const clearForm = () => {
        setName('');
        setSpecialization('');
        setHospital('');
        setAvailableDates('');
        setGender('');
    };

    return (
        <div className="doctor-entry-form">
            <h2>Add a Doctor</h2>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Doctor Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Available Dates (comma separated)"
                    value={availableDates}
                    onChange={(e) => setAvailableDates(e.target.value)}
                    required
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
};

export default DoctorEntryForm;
