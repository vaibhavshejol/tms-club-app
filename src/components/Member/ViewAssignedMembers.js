import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewAssignedMembers.css';

const ViewAssignedMembers = () => {
    const { meetingId } = useParams();
    const [members, setMembers] = useState([]);
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const [newMember, setNewMember] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/meeting/${meetingId}/members`);
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, [meetingId]);

    const handleAddMemberClick = () => {
        setShowAddMemberForm(true);
    };

    const handleAddMemberSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:9090/api/meeting/${meetingId}/members`, { name: newMember });
            setMembers([...members, newMember]);
            setNewMember('');
            setShowAddMemberForm(false);
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewMember(e.target.value);
    };

    return (
        <div className="members-container">
            <h1>Assigned Members</h1>
            <button 
                className="add-member-button" 
                onClick={handleAddMemberClick}
            >
                Add Member
            </button>
            {showAddMemberForm && (
                <form onSubmit={handleAddMemberSubmit} className="add-member-form">
                    <input
                        type="text"
                        value={newMember}
                        onChange={handleInputChange}
                        placeholder="Enter member's name"
                        required
                    />
                    <button type="submit" className="submit-button">Add</button>
                </form>
            )}
            <ul className="members-list">
                {members.length > 0 ? (
                    members.map((member, index) => (
                        <li key={index}>{member}</li>
                    ))
                ) : (
                    <p>No members assigned to this meeting.</p>
                )}
            </ul>
        </div>
    );
};

export default ViewAssignedMembers;
