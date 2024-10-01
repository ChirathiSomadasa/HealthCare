import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import './Profile.css';
import ProfileVector from '../../images/user.png';
import Camera from '../../images/healthcard/camera.png';
import { useAuthEmail, useAuthPassword } from '../../auth'
import { useNavigate } from "react-router-dom";
import moment from 'moment'; // Importing moment.js


function Profile() {
    
    const authEmail = useAuthEmail();
    const authPassword = useAuthPassword();
    const navigate = useNavigate();
    const [update, setUpdate] = useState(0);
    const [profileDetails, setProfileDetails] = useState({});

    const[firstName,setFullName] = useState("");
    const[address,setAddress] = useState("");
    const[mobileNumber,setMobileNumber] = useState("");
    const[email,setEmail] = useState("");
    const[birthdate,setBirthDate] = useState("");

      // Formatting birthdate using moment.js
  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD');
  };

    var profilePictureUrl = ProfileVector;
    if (profileDetails.profile_pic != null) {
        profilePictureUrl = "http://localhost:5002/image/" + profileDetails.profile_pic;
    }

    useEffect(() => {
        // Fetch all predictions from the backend
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5002/user/profile',{auth_email:authEmail,auth_password:authPassword});

                const data = response.data;
                const status = data.status;
                if (status === "success") {
                    setProfileDetails(data);

                    setFullName(data.full_name);
                    setAddress(data.address);
                    setMobileNumber(data.mobile_number);
                    setEmail(data.email);
                    setBirthDate(formatDate(data.birthdate)); // Format birthdate using moment.js
                }
            } catch (err) {
                alert("Error 2 - " + err);
               
            }
        };

        fetchData();
    }, [authEmail, authPassword, navigate]);


    const handleProfilePictureUpload = (file) => {
        const form = new FormData();
        form.append('image', file);
        form.append('auth_email', authEmail); 
        form.append('auth_password', authPassword);

        axios
            .post('http://localhost:5002/user/edit/avatar', form)
            .then((response) => {
                const data = response.data;
                const status = data.status;
                if (status === 'success') {
                    setUpdate(update + 1); 
                } else if (status === 'auth_failed') {
                    navigate('/signout'); 
                } else {
                    const message = data.message;
                    alert('Error - ' + message);
                }
            })
            .catch((error) => {
                alert('Error 2 - ' + error);
            });
    };
    

    {
        return (
            <div className='upper-img'>
                <div className='profile-container'>
                    <div className='upper-container'>
                        <div className='image-container'>
                            <img className='profile_img' src={profilePictureUrl} alt="profile" height="100px" width="100px" />
                            <label className='camera-button' htmlFor="file-input">
                                <input id="file-input" type="file" onChange={(e) => handleProfilePictureUpload(e.target.files[0])} style={{ display: "none" }} />
                                <img src={Camera} alt="camera" />
                            </label>
                        </div>
                        <div className='img_text'>
                            <h1 className='pcard-title'>{profileDetails.full_name}</h1>
                        </div>
                    </div>
                    <div className="lower_pcontainer">
                        <div className="profile_details">
                            <div className="profile_details_form card">
                                <form className='profile_form'>
                                    <label>Full Name</label>
                                    <input className="profile_input" type="text" onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name" defaultValue={profileDetails.full_name} />
                                    <label>Address</label>
                                    <input className="profile_input" type="text" onChange={(e)=>setAddress(e.target.value)} placeholder="Address" defaultValue={profileDetails.address} />
                                    <label>Contact Number</label>
                                    <input className="profile_input" type="text" onChange={(e)=>setMobileNumber(e.target.value)} placeholder="Contact Number" defaultValue={profileDetails.mobile_number} />
                                    <label>Email</label>
                                    <input className="profile_input" type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" defaultValue={profileDetails.email} />
                                    <label>Birthdate</label>
                                    <input className="profile_input" type="date" onChange={(e)=>setBirthDate(e.target.value)} placeholder="Birthdate" defaultValue={profileDetails.birthdate} value={birthdate} />
                                    <div className='profile_btn'>
                                       <button className='save'>SAVE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
