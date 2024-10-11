import { useEffect, useState } from "react";
import React from "react";
import "./PatientList.css";
import { useNavigate } from "react-router-dom";
import { useUsersData } from "../../hooks/useUserData";
import { USER_ROLES } from "../../constants/roles";
import { useAuthStore } from "../../store/useAuthStore";

function PatientList() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  function GenerateQRPage(patientId) {
    // Redirect to the health card generation page for the specific patient
    navigate(`/patientList/HealthCard/${patientId}`);
  }

  function AddPatientPage() {
    navigate("/patientList/AddPatient");
  }

  function handlePatentRecords(patientId){
    navigate(`/patientList/PatientRecords/${patientId}`);

  }

  // Destructure data, isLoading, and isError from the useUserData hook
  const { data: users, isLoading, isError } = useUsersData(USER_ROLES.PATIENT);

  // State for search term and sorted order
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filtered and sorted users based on search term and sort order
  const filteredAndSortedUsers = users?.data?.users
    .filter(
      (user) =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a._id.localeCompare(b._id);
      } else {
        return b._id.localeCompare(a._id);
      }
    });

     // Function to handle search term input
  const manageSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Check if user has staff role
  if (user.role !== USER_ROLES.STAFF) {
    return (
      <div>
        <div>
          {filteredAndSortedUsers && filteredAndSortedUsers.length > 0 ? (
            <div className="Upatient-list-container">
              <h2>Patient List</h2>
              <input style={{marginLeft:"740px",marginTop:"5px",marginBottom:"5px"}}
          className="patient-filter-search"
          placeholder="Search by Name or ID"
          type="text"
          value={searchTerm}
          onChange={manageSearch}
        />
        <button className="patient-filter-search-btn" onClick={manageSearch}>
          Clear Search
          </button>
              <table className="Upatient-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {/* Loop through the filtered and sorted users data */}
                  {filteredAndSortedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.full_name}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>{user.mobile_number}</td>
                      <td>{user.address}</td>
                      <td>
                        <button className="Upatient-records-button"  onClick={() => handlePatentRecords(user._id)}>Patient Records</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          ) : (
            !isLoading && <p>No patients found</p>
          )}
        </div>

      </div>
    );
  }

  // Function to handle search term input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to toggle sorting order by ID
  const handleSortById = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };



  return (
    <div className="patient-list-container">
      <h1>Patient List</h1>
      <div className="patient-filter-bar">
        <input
          className="patient-filter-search"
          placeholder="Search by Name or ID"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="patient-filter-search-btn" onClick={handleSearch}>
          Clear Search
        </button>
        <button className="sort_btn" onClick={handleSortById}>
          {sortOrder === "asc" ? "Sort By ID (Desc)" : "Sort By ID (Asc)"}
        </button>
        <button className="add_patient_btn" onClick={AddPatientPage}>
          Add Patient
        </button>
      </div>

      {/* Show loading state */}
      {isLoading && <p>Loading patients...</p>}

      {/* Show error state */}
      {isError && <p>Error loading patients</p>}

      {/* Show patient table if data is available */}
      {filteredAndSortedUsers && filteredAndSortedUsers.length > 0 ? (
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Request Digital Health Card</th>
              <th>Request Physical Health Card</th>
              <th>Generate Health Card</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through the filtered and sorted users data */}
            {filteredAndSortedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.full_name}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{user.digitalCard ? "Yes" : "No"}</td>
                <td>{user.physicalCard ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="generate_btn"
                    onClick={() => GenerateQRPage(user._id)}
                  >
                    Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && <p>No patients found</p>
      )}
    </div>
  );
}

export default PatientList;
