import React, { useState } from 'react';
import axios from 'axios';
import './DoctorEntryForm.css';

const specializations = [
    'Emergency Medicine',
    'Dermotology',
    'Cardiology',
    'Family Medicine',
    'Internal Medicine',
    'Obstetric and Gynocology',
    'Neurology'
];

const hospitals = [
    'Lanka Hospital',
    'Durdans Hospital',
    'Nawaloka Hospital',
    'Asiri Hospital',
    'Western Hospital',
    'Ninewells Hospital',
    'Dr. Neveille Fernando Hospital',
    'Hemas Hospital',
    'Nawinna Hospital',
    'Co-operative Hospital'
];

const DoctorEntryForm = () => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [hospital, setHospital] = useState('');
    const [availableAppointments, setAvailableAppointments] = useState([{ date: '', time: '', fee: '' }]);
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');

    const handleAppointmentChange = (index, field, value) => {
        const newAppointments = [...availableAppointments];
        newAppointments[index][field] = value;
        setAvailableAppointments(newAppointments);
    };

    const addAppointment = () => {
        setAvailableAppointments([...availableAppointments, { date: '', time: '', fee: '' }]);
    };

    const removeAppointment = (index) => {
        const newAppointments = availableAppointments.filter((_, i) => i !== index);
        setAvailableAppointments(newAppointments);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert availableAppointments time to Date objects
        const formattedAppointments = availableAppointments.map(appointment => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}:00`);
            return {
                date: appointment.date,
                time: appointmentDate,
                fee: appointment.fee,
            };
        });

        const doctorData = {
            name,
            specialization,
            hospital,
            availableAppointments: formattedAppointments,
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
        setAvailableAppointments([{ date: '', time: '', fee: '' }]);
        setGender('');
    };

    return (
        <div className="doctor-entry-form">
            <h2>Add a Doctor</h2>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <h4>Doctor Name:</h4>
                <input
                    type="text"
                    placeholder="Doctor Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <h4>Specialization:</h4>
                <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} required>
                    <option value="">Select Specialization</option>
                    {specializations.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                    ))}
                </select>

                <h4>Hospital Name:</h4>
                <select value={hospital} onChange={(e) => setHospital(e.target.value)} required>
                    <option value="">Select Hospital</option>
                    {hospitals.map((hosp) => (
                        <option key={hosp} value={hosp}>{hosp}</option>
                    ))}
                </select>

                <h4>Gender:</h4>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <h3 className="Av-Appointment">Available Appointments</h3>
                {availableAppointments.map((appointment, index) => (
                    <div key={index} className="appointment-entry">
                        <h4>Enter Date:</h4>
                        <input
                            type="date"
                            value={appointment.date}
                            onChange={(e) => handleAppointmentChange(index, 'date', e.target.value)}
                            required
                        />
                        <h4>Time:</h4>
                        <input
                            type="time"
                            value={appointment.time}
                            onChange={(e) => handleAppointmentChange(index, 'time', e.target.value)}
                            required
                        />
                        <h4>Appointment Fees:</h4>
                        <input
                            type="number"
                            placeholder="Fee"
                            value={appointment.fee}
                            onChange={(e) => handleAppointmentChange(index, 'fee', e.target.value)}
                            required
                        />
                        <button type="button" className="remve-app" onClick={() => removeAppointment(index)}>Remove Appointment</button>
                    </div>
                ))}
                <button type="button" className="add-app1" onClick={addAppointment}>Add Appointment</button>

                <button type="submit" className="add-app">Add Doctor</button>
            </form>
        </div>
    );
};

export default DoctorEntryForm;
