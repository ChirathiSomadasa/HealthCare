import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileVector from "../../images/user.png";
import Camera from "../../images/healthcard/camera.png";
import QRCode from "react-qr-code";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserData } from "../../hooks/useUserData";
import UserAPI from "../../api/UserAPI";
import { useMutation } from "@tanstack/react-query";
import { errorMessage, successMessage } from "../../utils/Alert";
import { USER_ROLES } from "../../constants/roles";
import { handleUpload } from "../../utils/HandleUpload";

function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  
  const { data: profileDetails, isLoading, isError } = useUserData(user._id);

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: UserAPI.updateUser,
    onSuccess: (res) => {
      successMessage("Success", res.data.message);
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
  });

  const { mutate: deleteUserMutation } = useMutation({
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

  const [firstName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthDate] = useState("");

  useEffect(() => {
    if (profileDetails) {
      const { user } = profileDetails.data;
      setFullName(user.full_name || "");
      setAddress(user.address || "");
      setMobileNumber(user.mobile_number || "");
      setEmail(user.email || "");
      setBirthDate(user.birthdate ? moment(user.birthdate).format("YYYY-MM-DD") : "");
      setImage(user.profilePic || "");
    }
  }, [profileDetails]);

  const handleImageUpload = () => {
    if (file) {
      handleUpload({ file, setPercent, setImage });
    }
  };

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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <img src={Camera} alt="camera" />
              </label>
              <button
                type="button"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 24px",
                  border: "none",
                  width: "100%",
                  borderRadius: "5px",
                  opacity: percent === 100 ? 0.5 : 1,
                  cursor: percent === 100 ? "not-allowed" : "pointer",
                }}
                onClick={handleImageUpload}
                disabled={!file || percent === 100}
              >
                {percent < 100 ? `Upload ${percent}%` : "Uploaded"}
              </button>
            </div>
            <div className="img_text">
              <h1 className="pcard-title">{firstName}</h1>
            </div>
          </div>

          <div className="lower_pcontainer">
            <div className="profile_details">
              <div className="profile_details_form card">
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

      {user.role === USER_ROLES.PATIENT && user.showQR && (
        <>
          <h1 className="qr_topic">Scan QR Code</h1>
          <div className="qr">
            <QRCode
              value={qrCodeUrl}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
            />
            <button className="scan">SCAN</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
