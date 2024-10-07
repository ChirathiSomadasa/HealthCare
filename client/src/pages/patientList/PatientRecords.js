import { useEffect, useState } from "react";
import React from "react";
import "./PatientRecords.css";
import { useParams } from "react-router-dom"; // Import useParams for accessing URL parameters
import { useUsersData } from "../../hooks/useUserData";
import { USER_ROLES } from "../../constants/roles";
import { useAuthStore } from "../../store/useAuthStore";

function PatientList() {


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
        <div className="Ucontainer">
            <button className="Uadd-note-btn">Add Note</button>
            <button className="Ugenerate-btn">Generate Report</button>
        </div>

        <div className="Uinfo">
            <div className="Upatient-info">
                <h2 style={{textAlign:"center",paddingTop:"10px",fontFamily:"sans-serif"}}>Patient Information</h2>
                <div className="Upatient-details">
                    <div className="Upatient-image">

                    </div>
                    <div className="Upatient-bio">
                     
                      {selectedPatient ? (
                                <>
                                    <p><strong>Name:</strong> {selectedPatient.full_name}</p>
                                    <p><strong>ID:</strong> {selectedPatient._id}</p>
                                    <p><strong>Date Created:</strong> {new Date(selectedPatient.createdAt).toLocaleDateString()}</p>
                                    <p><strong>Mobile Number:</strong> {selectedPatient.mobile_number}</p>
                                    <p><strong>Address:</strong> {selectedPatient.address}</p>
                                    {/* Add more details as necessary */}
                                </>
                            ) : (
                                <p>No patient details available.</p>
                            )}
                
                    </div>

                </div>
            </div>

        </div>
       
    </div>
  );
}

export default PatientList;
