import React, { useState } from 'react';
import axios from 'axios';
import './information.css';

function AddFeedback() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [bloodgroup, setBloodGroup] = useState('');
    const [heartrate, setHeartRate] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [oxygenSaturation, setOxygenSaturation] = useState('');
    const [temperature, setTemperature] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [guardianCNo, setGuardianCNo] = useState('');
    const [vitalStatusData, setVitalStatusData] = useState(null); // Store the vital status data
    const [loading, setLoading] = useState(false); // Show loading state while fetching data
    const [error, setError] = useState(null); // Error state if the fetch fails
    const [records, setRecords] = useState([]); // State to hold fetched records


   
    const [activeSection, setActiveSection] = useState(); // Track which section is active

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5002/api/records', { 
                fullname, email ,weight,height,age,gender,bloodgroup,heartrate,bloodPressure,respiratoryRate,oxygenSaturation,temperature,guardianName,guardianCNo});
            setFullname('');
            setEmail('');
            setWeight('');
            setHeight('');
            setAge('');
            setGender('');
            setBloodGroup('');
            setHeartRate('');
            setBloodPressure('');
            setRespiratoryRate('');
            setTemperature('');
            setOxygenSaturation('');
            setGuardianName('');
            setGuardianCNo('');

            alert('Information submitted successfully!');
        } catch (error) {
            console.error('Error submitting information:', error);
            alert('Error submitting information. Please try again later.');
        }
    };
 

    const fetchVitalStatus = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5002/api/records/${id}`); // Fetch the vital status from API
            setVitalStatusData(response.data);
            setBloodGroup('');
            setHeartRate('');
            setBloodPressure('');
            setRespiratoryRate('');
            setTemperature('');
            setOxygenSaturation('');
        } catch (error) {
            console.error('Error fetching vital status:', error);
            setError('Error fetching vital status. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/records'); // Fetch all records
            setRecords(response.data); // Update state with fetched records
        } catch (error) {
            console.error('Error fetching records:', error);
            alert('Error fetching records. Please try again later.');
        }
    };


    const renderSection = () => {
        switch (activeSection) {
            case 'personal':
                return (
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <div className="form-group">
                            <label>Full Name:</label>
                            <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Weight:</label>
                            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Height:</label>
                            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Blood Group:</label>
                            <input type="text" value={bloodgroup} onChange={(e) => setBloodGroup(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Heart Rate:</label>
                            <input type="text" value={heartrate} onChange={(e) => setHeartRate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Temperature:</label>
                            <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Respiratory Rate:</label>
                            <input type="text" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Blood Pressure:</label>
                            <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Oxygen Saturation:</label>
                            <input type="text" value={oxygenSaturation} onChange={(e) => setOxygenSaturation(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Guardian Name:</label>
                            <input type="text" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Guardian Contact Number:</label>
                            <input type="text" value={guardianCNo} onChange={(e) => setGuardianCNo(e.target.value)} required />
                        </div>

                        <button type="submit" className="submit-button">Submit Information</button>
                    </form>
                );
        
            case 'visit':
                return (
                    <div className="visit-history">
                        {records.length > 0 ? (
                            records.map(record => (
                                <div key={record._id} className="record">
                                    <h4>{record.fullname}</h4>
                                    <p>Email: {record.email}</p>
                                    <p>Weight: {record.weight}</p>
                                    <p>Height: {record.height}</p>
                                    <p>Age: {record.age}</p>
                                    <p>Gender: {record.gender}</p>
                                    <p>Blood Group: {record.bloodgroup}</p>
                                    <p>Heart Rate: {record.heartrate}</p>
                                    <p>Blood Pressure: {record.bloodPressure}</p>
                                    <p>Respiratory Rate: {record.respiratoryRate}</p>
                                    <p>Oxygen Saturation: {record.oxygenSaturation}</p>
                                    <p>Temperature: {record.temperature}</p>
                                    <p>Guardian Name: {record.guardianName}</p>
                                    <p>Guardian Contact Number: {record.guardianCNo}</p>
                                </div>
                            ))
                        ) : (
                            <p>No medical records available.</p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="add-feedback-container" style={{ marginTop: "25px" }}>
            <div className="button-container">
            <button className="top-button" onClick={() => {
                    setActiveSection('personal');
                    // Reset records when switching back to personal section
                    setRecords([]);
                }}>Add Personal Information</button>                
                <button className="top-button" onClick={() => {
                    setActiveSection('visit');
                    fetchRecords(); // Fetch records when button is clicked
                }}>My Medical Records</button>

                
            </div>

            

            <h2>{activeSection === 'personal' ? 'Add Information' : activeSection === 'vital' ? 'Vital Status' : 'Visit History'}</h2>

            {renderSection()} {/* Render the current section based on the active button */}
        </div>
    );
}

export default AddFeedback;
