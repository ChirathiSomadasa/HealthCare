import React, { useState } from 'react';
import axios from 'axios';
import './DoctorEntryForm.css';

const DoctorEntryForm = () => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [hospital, setHospital] = useState('');
    const [availableAppointments, setAvailableAppointments] = useState([{ date: '', time: '', period: 'AM', fee: '' }]);
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');

    const handleAppointmentChange = (index, field, value) => {
        const newAppointments = [...availableAppointments];
        newAppointments[index][field] = value;
        setAvailableAppointments(newAppointments);
    };

    const addAppointment = () => {
        setAvailableAppointments([...availableAppointments, { date: '', time: '', period: 'AM', fee: '' }]);
    };

    const removeAppointment = (index) => {
        const newAppointments = availableAppointments.filter((_, i) => i !== index);
        setAvailableAppointments(newAppointments);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const doctorData = {
            name,
            specialization,
            hospital,
            availableAppointments,
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
        setAvailableAppointments([{ date: '', time: '', period: 'AM', fee: '' }]);
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
                <input
                    type="text"
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                />
                <h4>Hospital Name:</h4>
                <input
                    type="text"
                    placeholder="Hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    required
                />
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
                            type="text"
                            placeholder="Time (e.g., 10:00)"
                            value={appointment.time}
                            onChange={(e) => handleAppointmentChange(index, 'time', e.target.value)}
                            required
                        />
                        <select
                            value={appointment.period}
                            onChange={(e) => handleAppointmentChange(index, 'period', e.target.value)}
                            required
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                        <h4>Appointment Fees:</h4>
                        <input
                            type="number"
                            placeholder="Fee"
                            value={appointment.fee}
                            onChange={(e) => handleAppointmentChange(index, 'fee', e.target.value)}
                            required
                        />
                        <button className="remve-app" onClick={() => removeAppointment(index)}>Remove Appointment</button>
                    </div>
                ))}
                <button className="add-app1" onClick={addAppointment}>Add Appointment</button>

                <button className="add-app">Add Doctor</button>
            </form>
        </div>
    );
};

export default DoctorEntryForm;
