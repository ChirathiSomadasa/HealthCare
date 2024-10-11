import { useEffect, useState } from "react";
import React from "react";
import "./AddNote.css";
import { useParams } from "react-router-dom"; // Import useParams for accessing URL parameters
import { useUsersData } from "../../hooks/useUserData";
import { USER_ROLES } from "../../constants/roles";
import { useNavigate } from "react-router-dom";

function AddNote() {

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


  return (
    <div>
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
            <div className="Upatient-note">
                <div className="Upatient-addnote">   
                      {selectedPatient ? (
                                <>
                                    <p><strong>Clinic Note:</strong></p>
                                    <ul>
                                        <li> {selectedPatient.full_name}</li>
                                        <li> {selectedPatient.full_name}</li>
                                        <li> {selectedPatient.full_name}</li>
                                    </ul>
                                    <p><strong>Physical Examinations:</strong> </p>
                                    <ul>
                                        <li> {selectedPatient.address}</li>
                                        <li> {selectedPatient.address}</li>
                                        <li> {selectedPatient.address}</li>
                                    </ul>
                                    <p><strong>Assessment:</strong> </p>
                                    <ul>
                                        <li> {selectedPatient.mobile_number}</li>
                                        <li> {selectedPatient.mobile_number}</li>
                                        <li> {selectedPatient.mobile_number}</li>
                                    </ul>
                                    <p><strong>Plan:</strong> </p>
                                    <ul>
                                        <li> {selectedPatient.mobile_number}</li>
                                        <li> {selectedPatient.mobile_number}</li>
                                        <li> {selectedPatient.mobile_number}</li>
                                    </ul>
                                    <button className="addNoteBtn">Add Note</button>

                                    {/* Add more details as necessary */}
                                </>
                            ) : (
                                <p>No patient details available.</p>
                            )}
                </div>
                   
            </div>
           
             
        
        
             

        </div>
       
    </div>
  );
}

export default AddNote;
