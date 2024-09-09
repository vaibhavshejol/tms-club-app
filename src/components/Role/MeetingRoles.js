import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './MeetingRoles.css'; // Create this CSS file for styling

const MeetingRoles = () => {
    const [roles, setRoles] = useState([]);
    const location = useLocation();
    const { meetingId, meetingTitle } = location.state || {};

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/meeting/${meetingId}/roles`);
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, [meetingId]);

    return (
        <div className="roles-container">
            <h1>{meetingTitle}</h1>
            <table className="roles-table">
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Member</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td>{role.roleName}</td>
                            <td>{role.memberName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MeetingRoles;
