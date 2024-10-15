import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './information.css';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';


function AddFeedback() {
    const navigate = useNavigate(); // For navigation
    const { id } = useParams;
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
    const [editingRecord, setEditingRecord] = useState(null); // State for the record being edited
    const [formData, setFormData] = useState();
    const currentUserId = localStorage.getItem('currentUserId'); // Assuming user ID is stored in local storage
    const [notes, setNotes] = useState(''); // New state for notes


    const [activeSection, setActiveSection] = useState(); // Track which section is active

    // Load current user's data on component mount
    useEffect(() => {
        const storedFullName = localStorage.getItem('currentUserFullName');
        const storedEmail = localStorage.getItem('currentUserEmail');

        if (storedFullName && storedEmail) {
            setFullname(storedFullName);
            setEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5002/api/records', {
                fullname, email, weight, height, age, gender, bloodgroup, heartrate, bloodPressure, respiratoryRate, oxygenSaturation, temperature, guardianName, guardianCNo
            });
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5002/api/records/${id}`, {
                fullname, email, weight, height, age, gender, bloodgroup, heartrate,
                bloodPressure, respiratoryRate, oxygenSaturation, temperature,
                guardianName, guardianCNo
            });
            alert('Feedback updated successfully!');

        } catch (error) {
            console.error('Error updating feedback:', error);
            alert('Error updating feedback. Please try again later.');
        }
    };

    const handleNote = (id) => {
        // Use navigate to move to the AddNote page with the record ID
        navigate(`/Information/AddNote/${id}`);
        fetchNotes(id);
    };



    const clearForm = () => {
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

    const fetchNotes = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/records/${id}/notes`); // Assuming API endpoint for notes
            setNotes(response.data.notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            alert('Error fetching notes. Please try again later.');
        }
    };

    const handleEdit = (record) => {
        // Set the current record data in state for editing
        setFullname(record.fullname);
        setEmail(record.email);
        setWeight(record.weight);
        setHeight(record.height);
        setAge(record.age);
        setGender(record.gender);
        setBloodGroup(record.bloodgroup);
        setHeartRate(record.heartrate);
        setBloodPressure(record.bloodPressure);
        setRespiratoryRate(record.respiratoryRate);
        setTemperature(record.temperature);
        setOxygenSaturation(record.oxygenSaturation);
        setGuardianName(record.guardianName);
        setGuardianCNo(record.guardianCNo);
        setActiveSection('personal'); // Switch to personal info section


    };

    // State to manage the search term and sort order
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    // Filtered and sorted users based on search term and sort order
    const filteredAndSortedUsers = records?.data?.records
        .filter(
            (record) =>
                record.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record._id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a._id.localeCompare(b._id);
            } else {
                return b._id.localeCompare(a._id);
            }
        });

    // Function to handle search term input
    const manageSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`http://localhost:5002/api/records/${id}`); // Delete the record
                alert('Record deleted successfully!');
                fetchRecords(); // Refresh records after deletion
            } catch (error) {
                console.error('Error deleting record:', error);
                alert('Error deleting record. Please try again later.');
            }
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'personal':
                return (
                    <div className='QAddProblemForm'>
                        <div className='Qaddproblem_photo'>
                            <form onSubmit={handleSubmit} className="PAproductForm">
                                <h2 className="PAtopic">Add Information</h2>

                                <div className="PAform-group">
                                    <label>Full Name:</label>
                                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Email:</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Weight:</label>
                                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Height:</label>
                                    <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Gender:</label>
                                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Age:</label>
                                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Blood Group:</label>
                                    <input type="text" value={bloodgroup} onChange={(e) => setBloodGroup(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Heart Rate:</label>
                                    <input type="text" value={heartrate} onChange={(e) => setHeartRate(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Temperature:</label>
                                    <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Respiratory Rate:</label>
                                    <input type="text" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Blood Pressure:</label>
                                    <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Oxygen Saturation:</label>
                                    <input type="text" value={oxygenSaturation} onChange={(e) => setOxygenSaturation(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Guardian Name:</label>
                                    <input type="text" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} required />
                                </div>
                                <div className="PAform-group">
                                    <label>Guardian Contact Number:</label>
                                    <input type="text" value={guardianCNo} onChange={(e) => setGuardianCNo(e.target.value)} required />
                                </div>

                                <button type="submit" className="PAbtn">Submit Information</button>
                            </form>
                        </div>
                    </div>
                );

            case 'visit':

                return (
                    <div className="visit-history">
                        <h2>Patient List</h2>
                        <div className='searchp'>
                            <input
                                className="patient-filter-search"
                                placeholder="Search by Name"
                                type="text"
                                value={searchTerm}
                                onChange={manageSearch}
                            />
                            <button className="patient-filter-search-btn" onClick={manageSearch}>
                                Clear Search
                            </button>
                        </div>
                        {records.length > 0 ? (
                            records.map(record => (
                                <div key={record._id} className="record-container">
                                    <div className="user-info">
                                        <h2 style={{
                                            fontSize: '24px',
                                            color: '#333',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            margin: '20px 0',
                                            borderBottom: '2px solid #ddd',
                                            paddingBottom: '10px'
                                        }}>Personal Information</h2>
                                        <h4>{record.fullname}</h4>
                                        <p>Email: {record.email}</p>
                                        <p>Guardian Name: {record.guardianName}</p>
                                        <p>Guardian Contact: {record.guardianCNo}</p>
                                        <p>Weight: {record.weight}</p>
                                        <p>Height: {record.height}</p>
                                        <p>Age: {record.age}</p>
                                        <p>Gender: {record.gender}</p>
                                    </div>
                                    <div className="details-info">
                                    <h2 style={{
                                            fontSize: '24px',
                                            color: '#333',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            margin: '20px 0',
                                            borderBottom: '2px solid #ddd',
                                            paddingBottom: '10px'
                                        }}>Vital Status</h2>
                                        <p>Blood Group: {record.bloodgroup}</p>
                                        <p>Heart Rate: {record.heartrate}</p>
                                        <p>Blood Pressure: {record.bloodPressure}</p>
                                        <p>Respiratory Rate: {record.respiratoryRate}</p>
                                        <p>Oxygen Saturation: {record.oxygenSaturation}</p>
                                        <p>Temperature: {record.temperature}</p>
                                        {/* Display Notes */}
                                        <p>Notes:</p>
                                        {record.notes && record.notes.length > 0 ? (
                                            <ul>
                                                {record.notes.map((noteObj, index) => (
                                                    <li key={index}>
                                                        <p>{noteObj.note}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No notes available</p>
                                        )}

                                    </div>
                                    <div className="actions">
                                        <button className="edit-button" onClick={() => handleEdit(record)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(record._id)}>Delete</button>
                                        <button className="delete-button" onClick={() => { handleNote(record._id); fetchNotes(record._id); }}>Add Note</button>
                                    </div>
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
                }}>Add Patient Information</button>
                <button className="top-button" onClick={() => {
                    setActiveSection('visit');
                    fetchRecords(); // Fetch records when button is clicked
                }}>Medical Records</button>
                <button className="top-button" >Get Report</button>


            </div>



            <h2>{activeSection === 'personal' ? ' ' : activeSection === 'vital' ? 'Vital Status' : ''}</h2>

            {renderSection()} {/* Render the current section based on the active button */}
        </div>
    );
}

export default AddFeedback;
