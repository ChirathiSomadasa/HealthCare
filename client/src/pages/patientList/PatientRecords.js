import { useEffect, useState } from "react";
import React from "react";
import "./PatientRecords.css";
import { useParams } from "react-router-dom"; // Import useParams for accessing URL parameters
import { useUsersData } from "../../hooks/useUserData";
import { USER_ROLES } from "../../constants/roles";
import { useNavigate } from "react-router-dom";

function PatientList() {

    const navigate = useNavigate();

    const { patientId } = useParams(); // Get the patient ID from the URL
    const { data: users, isLoading, isError } = useUsersData(USER_ROLES.PATIENT);

    // State for the selected patient's data
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        // Find the specific patient by ID
        const patient = users?.data?.users.find(user => user._id === patientId);
        setSelectedPatient(patient);
    }, [patientId, users]); // Depend on patientId and users data

    if (isLoading) {
        return <p>Loading patient details...</p>;
    }

    if (isError) {
        return <p>Error loading patient details.</p>;
    }

    function AddNotePage() {
        navigate(`/patientList/${patientId}/AddNote`);
      }



  return (
    <div>
        <div className="Ucontainer">
            <button className="Uadd-note-btn" onClick={AddNotePage}>Add Note</button>
            <button className="Ugenerate-btn">Generate Report</button>
        </div>

        <div className="Uinfo">
            <div className="Upatient-info">
                <h2 style={{textAlign:"center",paddingTop:"15px",fontFamily:"sans-serif"}}>Patient Information</h2>
                <div className="Upatient-details">
                    <div className="Upatient-image">

                    </div>
                    <div className="Upatient-bio">
                     
                      {selectedPatient ? (
                                <>
                                    <p><strong>Name:</strong> {selectedPatient.full_name}</p>
                                    <p><strong>Address:</strong> {selectedPatient.address}</p>
                                    <p><strong>Mobile No:</strong> {selectedPatient.mobile_number}</p>
                                    <p><strong>Gender:</strong> {selectedPatient.mobile_number}</p>
                                    <p><strong>Age:</strong> {selectedPatient.mobile_number}</p>
                                    {/* Add more details as necessary */}
                                </>
                            ) : (
                                <p>No patient details available.</p>
                            )}
                
                    </div>

                </div>
            </div>
            <div className="Upatient-vital">
                <h2 style={{paddingLeft:"160px",paddingTop:"15px",fontFamily:"sans-serif"}}>Vital Status</h2>
                     
                      {selectedPatient ? (
                                <>
                                    <p><strong>Heart Rate:</strong> {selectedPatient.full_name}</p>
                                    <p><strong>Weight:</strong> {selectedPatient.address}</p>
                                    <p><strong>Blood Pressure:</strong> {selectedPatient.mobile_number}</p>
                                    <p><strong>Temperature:</strong> {selectedPatient.mobile_number}</p>
                                    <p><strong>Respiratory Rate:</strong> {selectedPatient.mobile_number}</p>
                                    <p><strong>Oxygen Saturation  :</strong> {selectedPatient.mobile_number}</p>

                                    {/* Add more details as necessary */}
                                </>
                            ) : (
                                <p>No patient details available.</p>
                            )}
                
                    
            </div>
            <div className="Upatient-vital">
                <h2 style={{paddingLeft:"160px",paddingTop:"15px",fontFamily:"sans-serif"}}>Visit History</h2>
                     
                      {selectedPatient ? (
                                <>
                                    <p><strong>Date:</strong> {selectedPatient.full_name}</p>
                                    <p><strong>Doctor:</strong> {selectedPatient.address}</p>
                                    <p><strong>Reason For Visit:</strong> {selectedPatient.mobile_number}</p>
                                    <p><strong>Summary:</strong> {selectedPatient.mobile_number}</p>
                                     

                                    {/* Add more details as necessary */}
                                </>
                            ) : (
                                <p>No patient details available.</p>
                            )}
                
                    
            </div>
            <div className="Upatient-vital">
                <h2 style={{paddingLeft:"150px",paddingTop:"15px",fontFamily:"sans-serif"}}>Lab Results</h2>
                     
                      {selectedPatient ? (
                                <>
                                    <button className="resultBtn"></button>
                                    <button className="resultBtn"></button>
                                    <button className="resultBtn"></button>

                                     

                                    {/* Add more details as necessary */}
                                </>
                            ) : (
                                <p>No patient details available.</p>
                            )}
                
                    
            </div>
            <div className="Upatient-vital">
                <h2 style={{paddingLeft:"160px",paddingTop:"15px",fontFamily:"sans-serif"}}>Medications</h2>
                     
                      {selectedPatient ? (
                                <>
                                    <button className="resultBtn">fhw</button>
                                    <button className="resultBtn"></button>
                                    <button className="resultBtn"></button>
                                     

                                    {/* Add more details as necessary */}
                                </>
                            ) : (
                                <p>No patient details available.</p>
                            )}
                
                    
            </div>
             

        </div>
       
    </div>
  );
}

export default PatientList;
