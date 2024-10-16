import React, { useState } from "react";
import "./Medical.css";
import ProfileVector from "../../images/user.png";
import { useUserData } from "../../hooks/useUserData";
import { useParams } from "react-router-dom";


function Medical() {
    const { patientId } = useParams();
    //
    const { data: user, isLoading, isError } = useUserData(patientId);
    //
    
    //

    //
    
    //
    return (

        <div className="healthCard_bg">
            <div className="health-card-container">
                {/* Display loading state */}
                {isLoading && <p>Loading patient data...</p>}

                {/* Display error state */}
                {isError && <p>Error loading patient data</p>}

                {/* Display patient data if available */}
                {user && (
                    <>
                        <div className="patient-info-section">
                            <h2>Patient Information</h2>
                            <img
                                className="profile_img"
                                src={user.data.user.profilePic || ProfileVector}
                                alt="profile"
                                height="100px"
                                width="100px"
                            />
                            <table className="healthcard_table">
                                <tbody>
                                    <tr>
                                        <th className="hth">Patient Name</th>
                                        <td className="htd"></td>
                                    </tr>
                                    <tr>
                                        <th className="hth">Patient ID </th>
                                        <td className="htd"></td>
                                    </tr>
                                    <tr>
                                        <th className="hth">Address</th>
                                        <td className="htd"></td>
                                    </tr>
                                    <tr>
                                        <th className="hth">Contact No</th>
                                        <td className="htd"></td>
                                    </tr>
                                    

                                </tbody>
                            </table>
                        </div>




                    </>
                )}
            </div>
        </div>
    );
}

export default Medical;
