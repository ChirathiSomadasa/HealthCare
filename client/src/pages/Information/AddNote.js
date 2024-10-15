import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import './AddNote.css';

function AddNote() {
    const { id } = useParams(); // Get the record ID from the URL
    const navigate = useNavigate();
    const [note, setNote] = useState(''); // For note input


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make the API request to save the note for the given record ID
            await axios.post(`http://localhost:5002/api/records/${id}/notes`, { note }); // Updated the endpoint
            alert('Note added successfully!');
            setNote('');
            navigate('/information'); // Navigate back after adding the note
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Error adding note. Please try again later.');
        }
    };

    return (
        <div className='QAddProblemForm'>
            <div className='Aaddproblem_photo'>
                <br /><br />
                <form className="PANoteForm" onSubmit={handleSubmit}>
                    <h2 className="PAtopic">Add Note</h2>
                    <div className="PAform-group">
                        <label>Clinical Note:</label>
                        <textarea 
                            className="PAinarea" 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                            required 
                        />
                    </div>
                   
                    <button type="submit" className="PAbtn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;
