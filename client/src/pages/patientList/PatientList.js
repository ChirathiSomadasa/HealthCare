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

  // Destructure data, isLoading, and isError from the useUserData hook
  const { data: users, isLoading, isError } = useUsersData(USER_ROLES.PATIENT);

  // State for search term and sorted order
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Check if user has staff role
  if (user.role !== USER_ROLES.STAFF) {
    return (
      <div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>You are not authorized to view this page</h1>
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
              <th className="pth">Patient ID</th>
              <th className="pth">Patient Name</th>
              <th className="pth">Date</th>
              <th className="pth">Request Digital Health Card</th>
              <th className="pth">Request Physical Health Card</th>
              <th className="pth">Generate Health Card</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through the filtered and sorted users data */}
            {filteredAndSortedUsers.map((user) => (
              <tr key={user._id}>
                <td className="ptd">{user._id}</td>
                <td className="ptd">{user.full_name}</td>
                <td className="ptd">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="ptdd">{user.digitalCard ? "Yes" : "No"}</td>
                <td className="ptdp">{user.physicalCard ? "Yes" : "No"}</td>
                <td className="ptd">
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
