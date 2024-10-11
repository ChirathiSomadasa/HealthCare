import React, { useState } from 'react';
import axios from 'axios';
import './DoctorAppointment.css';
import Icon1 from '../../images/Appointments/img1.png';
import Icon2 from '../../images/Appointments/img2.png';
import Icon3 from '../../images/Appointments/img3.png';
import Icon5 from '../../images/Appointments/imgg5.png';
import Icon6 from '../../images/Appointments/img6.png';
import ManImg from '../../images/Appointments/mainimg.png';
import Doc from '../../images/Appointments/doctor.png';
import Appointment from '../../images/Appointments/bookAppointment.png';


const DoctorAppointment = () => {
    const [doctorName, setDoctorName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [hospital, setHospital] = useState('');
    const [date, setDate] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');
    

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:5002/api/doctors/search', {
                params: {
                    name: doctorName,
                    specialization,
                    hospital,
                    date
                }
            });

            if (response.data.message) {
                setError(response.data.message);
                setDoctors(response.data.suggestions);
            } else {
                setError('');
                setDoctors(response.data);
            }
        } catch (error) {
            setError('Error fetching doctors');
        }

    };

    return (
        <div className="appointment-page-container">
            <div className="appointment-header">
                <h1>Book an Appointment at Aster Medcity</h1>
                <p>Cheranalloor, Ernakulam</p>
            </div>

            <div className="appointment-search-form">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search Doctor Name"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="input-doctor-name"
                    />
                    <select
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="input-specialization"
                    >
                        <option value="">Select Specialization</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Neurology">Neurology</option>
                    </select>

                    <select
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                        className="input-hospital"
                    >
                        <option value="">Select Hospital</option>
                        <option value="Aster Medcity">Aster Medcity</option>
                        <option value="Apollo Hospital">Apollo Hospital</option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input-date"
                    />
                    <button type="submit" className="btn-search">Search</button>
                </form>
                <img src={Icon1} alt="icon1" className="service-icon1" />
                <img src={Icon2} alt="icon2" className="service-icon1" />
                <img src={Icon3} alt="icon3" className="service-icon1" />
                <img src={Icon5} alt="icon5" className="service-icon1" />
                <img src={Icon6} alt="icon6" className="service-icon1" />
            </div>

            {/* Display search results here */}
            {error && <div className="error">{error}</div>}
            <div className="doctor-results">
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="doctor-card">
                        <h3>{doctor.name}</h3>
                        <p>{doctor.specialization}</p>
                        <p>{doctor.hospital}</p>
                        <button>Channel Now</button>
                    </div>
                ))}
            </div>

            <div className="services-container">
                <div className="service-box">
                    <img src={Doc} alt="Doctor" className="service-icon" />
                    <p>Doctor Near Me</p>
                </div>
                <div className="service-box">
                    <img src={ManImg} alt="Man Searching" className="service-icon" />
                    <p>Know Your Doctor</p>
                </div>
                <div className="service-box">
                    <img src={Appointment} alt="Appointment" className="service-icon" />
                    <p>Book Confirmed Appointment</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointment;
