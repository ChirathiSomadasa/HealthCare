import React, { useState } from 'react';
import axios from 'axios';
  
function AddFeedback() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5002/api/records', { fullname, email });
            setFullname('');
            setEmail('');
            
            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback. Please try again later.');
        }
    };

    return (

        

        <div className="add-feedback-container" style={{marginTop: "25px"}}>
            <h2>Add Feedback</h2>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
               
                <button type="submit" className="submit-button">Submit Feedback</button>
            </form>
        </div>
    );
}

export default AddFeedback;