import React, { useState } from "react";
import "./HealthCard.css";
import ProfileVector from "../../images/user.png";
import QRImg from "../../images/healthcard/qr_img.png";
import { useUserData } from "../../hooks/useUserData";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { errorMessage, successMessage } from "../../utils/Alert";
import UserAPI from "../../api/UserAPI";
import { useMutation } from "@tanstack/react-query";

function HealthCard() {
  const { patientId } = useParams();
  //
  const { data: user, isLoading, isError } = useUserData(patientId);
  //
  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: UserAPI.updateUser,
    onSuccess: (res) => {
      // Set user data to global state
      // login(res.data.user, res.data.token);
      successMessage("Success", res.data.message, () => {
        // navigate("/");
      });
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
  });
  //
  const qrCodeUrl = `http://localhost:3000/medical-records/${patientId}`;
  //
  const handleYes = () => {
    successMessage("Success", "Physical card issued successfully");
  };
  //
  const handleNo = () => {
    errorMessage("Error", "Failed to issue physical card");
  };
  //
  const handleSendQR = () => {
    updateUserMutation(
      {
        id: patientId,
        data: {
          showQR: true,
        },
      },
      {
        onSuccess: (res) => {
          successMessage("Success", "QR Code sent successfully");
        },
        onError: (err) => {
          errorMessage("Error", err.response.data.message);
        },
      }
    );
  };
  //
  return (
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
            <p>
              <strong>Patient Name:</strong> {user.data.user.full_name || "N/A"}
            </p>
            <p>
              <strong>Patient ID:</strong> {user.data.user._id || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {user.data.user.address || "N/A"}
            </p>
            <p>
              <strong>Contact No:</strong>{" "}
              {user.data.user.mobile_number || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {user.data.user.birthdate
                ? new Date(user.data.user.birthdate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Registered Date:</strong>{" "}
              {user.data.user.createdAt
                ? new Date(user.data.user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="qr-section">
            <h2>Digital Health Card</h2>
            {/* <div className="qr_picture_sm">
              <img className="qrimg" src={QRImg} alt="QR Code" />
            </div> */}
            <div>
              <QRCode
                value={qrCodeUrl}
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
                level="L"
              />
            </div>
            <button className="send-qr-btn" onClick={handleSendQR}>
              Send QR Code
            </button>
          </div>

          <div className="issue-card-section">
            <h3>Issue Physical Card</h3>
            <div className="issue-buttons">
              <button className="yes-btn" onClick={handleYes}>
                Yes
              </button>
              <button className="no-btn" onClick={handleNo}>
                No
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HealthCard;
