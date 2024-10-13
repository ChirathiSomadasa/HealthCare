import React from "react";
import "./confirmation.css"; 
import ConfirmImg from '../../images/Appointments/confirmation.png';

const Confirmation = () => {
  const handlePayNow = () => {
    alert("Redirecting to payment page...");
    
  };

  const handleViewDetails = () => {
    alert("Viewing appointment details...");
    
  };

  return (
    <div className="confirmation-fullcontainer">
    <div className="confirmation-container">
      <h2 className="confirmation-title">Confirmation Message</h2>
      <div className="image-container">
        
      <img src={ConfirmImg} alt="Doctor and patient"/>
      </div>

      <div className="confirmation-box">
        <p className="confirmation-text">Your appointment is confirmed</p>
        <button className="pay-button" onClick={handlePayNow}>
          Pay Now
        </button>
        <p className="warning-text">
          <span className="warning-title">Warning:</span> Come at least 15 minutes
          prior to appointment time
        </p>
        
      </div>
      <button className="details-button" onClick={handleViewDetails}>
          View appointment Details
        </button>
    </div>
    </div>
  );
};

export default Confirmation;
