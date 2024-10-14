import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileVector from "../../images/user.png";
import Camera from "../../images/healthcard/camera.png";
import QRImg from "../../images/healthcard/qr_img.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserData } from "../../hooks/useUserData";
import UserAPI from "../../api/UserAPI";
import { useMutation } from "@tanstack/react-query";
import { errorMessage, successMessage } from "../../utils/Alert";
import QRCode from "react-qr-code";
import { USER_ROLES } from "../../constants/roles";
import { handleUpload } from "../../utils/HandleUpload";

function Profile() {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Personal Information"); // State to track selected section


  // Get user data from the auth store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Fetch profile data using the custom hook with the user's ID
  const { data: profileDetails, isLoading, isError } = useUserData(user._id);

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

  // delete mutation
  const { mutate: deleteUserMutation, isPending: isDeleting } = useMutation({
    mutationFn: UserAPI.deleteUser,
    onSuccess: (res) => {
      successMessage("Success", res.data.message, () => {
        logout();
        navigate("/");
      });
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
  });

  function AddMediInfoPage() {
    navigate("/profile/AddMediInfo", { state: {userId: user._id,full_name: firstName} });
    setSelectedTab("Personal Information");
  }

  function AddVitalStatusPage() {
     setSelectedTab("Vital Status");
  }

  function AddVisitHistoryPage() {
     setSelectedTab("Visit History");
  }

  // State variables for controlled inputs
  const [firstName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthDate] = useState("");
  // const [profilePictureUrl, setProfilePictureUrl] = useState(ProfileVector);

  // Update state variables when profileDetails is loaded or changes
  useEffect(() => {
    if (profileDetails) {
      setFullName(profileDetails.data.user.full_name || "");
      setAddress(profileDetails.data.user.address || "");
      setMobileNumber(profileDetails.data.user.mobile_number || "");
      setEmail(profileDetails.data.user.email || "");
      setBirthDate(
        profileDetails.data.user.birthdate
          ? moment(profileDetails.data.user.birthdate).format("YYYY-MM-DD")
          : ""
      );
      setImage(profileDetails.data.user.profilePic || "");
    }
  }, [profileDetails]);

  // Handle image upload
  const handleImageUpload = (e) => {
    // const file = e.target.files[0];
    setFile(file);
    handleUpload({ file, setPercent, setImage });
  };

  // Handle change
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = () => {
    updateUserMutation({
      id: user._id,
      data: {
        full_name: firstName,
        address,
        mobile_number: mobileNumber,
        email,
        birthdate,
        profilePic: image,
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading profile data</p>;

  const qrCodeUrl = `http://localhost:3000/medical-records/${user._id}`;

  const renderContent = () => {
    switch (selectedTab) {
      case "Personal Information":
        return  (
          <div className="Info">
        <p><strong>Email:</strong>  </p>
        <p><strong>Guradian Name:</strong>  </p>
        <p><strong>Guradian No:</strong> {}</p>
        <p><strong>Height:</strong> {  }</p>
        <p><strong>Weight:</strong> {}</p>
        <p><strong>Age:</strong> {  }</p>
        <p><strong>Gender:</strong> { }</p>
  
        </div>
        )
      case "Vital Status":
        return (
          <div className="Info">
        <p><strong>Heart Rate:</strong> {  }</p>
        <p><strong>Temperature:</strong> {}</p>
        <p><strong>Blood Pressure:</strong> { }</p>
        <p><strong>Respiratory Rate:</strong> { }</p>
        <p><strong>Oxygen Saturation:</strong> { }</p>
    
        </div>
        )
      case "Visit History": 
        return (
          <div className="Info">
        <p><strong>Date:</strong> { }</p>
        <p><strong>Doctor:</strong> { }</p>
        <p><strong>Reason for visit:</strong> { }</p>
        <p><strong>Summary:</strong> { }</p>
     
        </div>
        )
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="upper-img">
        <div className="profile-container">
          <div className="upper-container">
            <div className="image-container">
              <img
                className="profile_img"
                src={image || ProfileVector}
                alt="profile"
                height="100px"
                width="100px"
              />
              <label className="camera-button" htmlFor="file-input">
                <input
                  id="file-input"
                  type="file"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <img src={Camera} alt="camera" />
              </label>
              <button
                type="button"
                style={{
                  // add styles here
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 24px",
                  border: "none",
                  width: "100%",
                  borderRadius: "5px",
                  // disabled styles
                  opacity: percent === 100 ? 0.5 : 1,
                  cursor: percent === 100 ? "not-allowed" : "pointer",
                }}
                onClick={handleImageUpload}
                disabled={!file || percent === 100}
              >
                {
                  // show progress when uploading
                  percent < 100 ? `Upload ${percent}%` : "Uploaded"
                }
              </button>
            </div>
            <div className="img_text">
              <h1 className="pcard-title">{firstName}</h1>
            </div>
          </div>
          <div className="lower_pcontainer">
            <div className="profile_details">
              <div className="profile_details_form card">
                <h1 className="card_title">User Information</h1>
                <form className="profile_form">
                  <label>Full Name</label>
                  <input
                    className="profile_input"
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    value={firstName}
                  />
                  <label>Address</label>
                  <input
                    className="profile_input"
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    value={address}
                  />
                  <label>Contact Number</label>
                  <input
                    className="profile_input"
                    type="text"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Contact Number"
                    value={mobileNumber}
                  />
                  <label>Email</label>
                  <input
                    className="profile_input"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    value={email}
                  />
                  <label>Birthdate</label>
                  <input
                    className="profile_input"
                    type="date"
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="Birthdate"
                    value={birthdate}
                  />
                  <div className="profile_btn">
                    <button
                      type="button"
                      className="edit-profile"
                      onClick={handleSubmit}
                    >
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => deleteUserMutation(user._id)}
                    >
                      Delete Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user.role === USER_ROLES.PATIENT && (
        <>
        <div className="Pcontainer">
            <button className="PmediInfo-btn" onClick={AddMediInfoPage} >Personal Information</button>
            <button className="Pvitalsts-btn" onClick={AddVitalStatusPage}>Vital Status</button>
            <button className="Pvisithistry-btn" onClick={AddVisitHistoryPage}>Visit History</button>

        </div >
        <div className="Infocontainer">
        <h2 style={{ paddingLeft: "450px", paddingTop: "5px" }}>
              {selectedTab}
        </h2>
        <div className="Info">{renderContent()}</div>
        
         </div>
          <h1 className="qr_topic">Scan QR Code</h1>
          <div className="qr">
            <div>
              <QRCode
                value={qrCodeUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="L"
              />
            </div>
            <div>
              <button className="scan">SCAN</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
