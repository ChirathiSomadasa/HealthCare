import React from "react";
import { useLocation , useNavigate} from "react-router-dom";
import "./confirmation.css"; 
import ConfirmImg from '../../images/Appointments/confirmation.png';

const Confirmation = () => {
  const location = useLocation();
  const { appointmentDate, appointmentTime } = location.state || {};
  const navigate = useNavigate();
  const handlePayNow = () => {
    alert("Redirecting to payment page...");
  };

  const handleViewDetails = () => {
    navigate("/viewAllAppointments");
  };

  return (
    <div className="confirmation-fullcontainer">
      <div className="confirmation-container">
        <h2 className="confirmation-title">You’re all booked in!</h2>
        <div className="image-containerapp">
          <img src={ConfirmImg} alt="Doctor and patient"/>
        </div>

        <div className="confirmation-box">
          <p className="confirmation-text">
            Thank you for scheduling with us! Your visit is confirmed for {appointmentDate} at {appointmentTime}. We look forward to seeing you!
          </p>
          <button className="pay-button" onClick={handlePayNow}>
            Pay Now
          </button>
          <p className="warning-text">
            <span className="warning-title">Warning:</span> Come at least 15 minutes prior to appointment time
          </p>
        </div>
        <button className="conDetails-button" onClick={handleViewDetails}>
          View Appointment Details
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
