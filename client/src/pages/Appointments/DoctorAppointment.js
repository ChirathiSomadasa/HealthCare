import React, { useState } from 'react';
import axios from 'axios';
import './DoctorAppointment.css';
import { useNavigate } from 'react-router-dom';
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
    const [searchPerformed, setSearchPerformed] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchPerformed(true);

        try {
            const response = await axios.get('http://localhost:5002/api/doctors/search', {
                params: {
                    name: doctorName,
                    specialization,
                    hospital,
                    date,
                }
            });

            if (response.data.length === 0) {
                setError('No matching doctors found. Please try different criteria.');
                setDoctors([]);
            } else {
                setError('');
                setDoctors(response.data);
            }
        } catch (error) {
            setError('Error fetching specific doctors');
        }
    };

    const formatTime = (time) => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours % 12 || 12; // convert to 12-hour format
        const ampm = hours < 12 ? 'AM' : 'PM';
        return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };

    const handleChannelNow = (doctor, appointment) => {
        navigate(`/addAppointment?doctorId=${doctor._id}&doctorName=${doctor.name}&specialization=${doctor.specialization}&appointmentDate=${appointment.date}&appointmentTime=${appointment.time}`);
    };

    return (
        <div className="Dappointment-page-container">
            <div className="Dappointment-header">
                <h1 className="Dappointment-heading">Book an Appointment at HealthCare</h1>
            </div>

            <div className="Dappointment-search-form">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        placeholder="Search Doctor Name"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="input-doctor-name"
                        required
                    />
                    <select
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="input-specialization"
                        required
                    >
                        <option value="">Select Specialization</option>
                        <option value="EmergencyMedicine">Emergency Medicine</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="FamilyMedicine">Family Medicine</option>
                        <option value="InternalMedicine">Internal Medicine</option>
                        <option value="ObstetricAndGynocology">Obstetric and Gynocology</option>
                        <option value="Neurology">Neurology</option>
                    </select>

                    <select
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                        className="input-hospital"
                        required
                    >
                        <option value="">Select Hospital</option>
                        <option value="LankaHospital">Lanka Hospital</option>
                        <option value="DurdansHospital">Durdans Hospital</option>
                        <option value="NawalokaHospital">Nawaloka Hospital</option>
                        <option value="AsiriHospital">Asiri Hospital</option>
                        <option value="WesternHospital">Western Hospital</option>
                        <option value="NinewellsHospital">Ninewells Hospital</option>
                        <option value="Dr.NewilFernandoHospital">Dr.NewilFernando Hospital</option>
                        <option value="HemasHospital">Hemas Hospital</option>
                        <option value="NawinnaHospital">Nawinna Hospital</option>
                        <option value="CooperativeHospital">Cooperative Hospital</option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input-date"
                        required
                    />
                    <button type="submit" className="btn-search">Search</button>
                </form>
                <img src={Icon1} alt="icon1" className="service-icon" />
                <img src={Icon2} alt="icon2" className="service-icon" />
                <img src={Icon3} alt="icon3" className="service-icon" />
                <img src={Icon5} alt="icon5" className="service-icon" />
                <img src={Icon6} alt="icon6" className="service-icon" />
            </div>

            {error && <div className="error-message">{error}</div>}
            
            {searchPerformed && doctors.length > 0 && (
                <div className="doctor-results-container">
                    <h2 className="results-header">Available Doctors</h2>
                    <div className="available-results">
                        {doctors.map((doctor) => (
                            <div key={doctor._id} className="doctor-card">
                                <h3 className="doctor-name">{doctor.name}</h3>
                                <p className="doctor-specialization">{doctor.specialization}</p>
                                <p className="doctor-hospital">{doctor.hospital}</p>
                                <p className="doctor-gender">Gender: {doctor.gender}</p>
                                <p className="available-appointments-header">Available Appointments:</p>
                                <ul className="appointments-list">
                                    {doctor.availableAppointments.map((appointment, index) => (
                                        <li key={index} className="appointment-item">
                                            {appointment.date} at {formatTime(appointment.time)} - Fee: RS{appointment.fee}
                                            <button
                                                className="btn-channel-now"
                                                onClick={() => handleChannelNow(doctor, appointment)}
                                            >
                                                Channel Now
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="services-container">
                <div className="app-container">
                    <div className="service-box">
                        <img src={Doc} alt="Doctor" className="service-icon" />
                        <p className="service-topic">DOCTOR NEAR ME</p>
                        <p className="service-description">Doctor/ Hospital/ Specialization to match specific consultation needs. Confirmed Online Appointment slots, practice locations to select from book appointment for clinic consultation or video consultation.</p>
                    </div>
                </div>
                <div className="app-container">
                    <div className="service-box">
                        <img src={ManImg} alt="Man Searching" className="service-icon" />
                        <p className="service-topic">KNOW YOUR DOCTOR</p>
                        <p className="service-description">Doctor/ Hospital/ Specialization to match specific consultation needs. Confirmed Online Appointment slots, practice locations to select from book appointment for clinic consultation or video consultation.</p>
                    </div>
                </div>
                <div className="app-container">
                    <div className="service-box">
                        <img src={Appointment} alt="Appointment" className="service-icon" />
                        <p className="service-topic">BOOK CONFIRMED APPOINTMENT</p>
                        <p className="service-description">Doctor/ Hospital/ Specialization to match specific consultation needs. Confirmed Online Appointment slots, practice locations to select from book appointment for clinic consultation or video consultation.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointment;
