import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewRoles.css';
import HomePage from '../Navigation/HomePage'; // Import the navbar component

const ViewRoles = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/role'); // Update URL if needed
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleAddRole = () => {
        // Navigate to the add role page
        navigate('/add-role');
    };

    const handleUpdate = (roleId) => {
        // Logic to update a role (this is just a placeholder)
        console.log('Update role with ID:', roleId);
    };

    const handleToggleStatus = async (roleId, isDeleted) => {
        try {
            // Assuming the API supports toggling the role status
            await axios.patch(`http://localhost:9090/api/role/${roleId}`, {
                isDeleted: !isDeleted, // Toggle status
            });
            // Update local state to reflect the change
            setRoles(roles.map(role => 
                role.roleId === roleId ? { ...role, isDeleted: !isDeleted } : role
            ));
        } catch (error) {
            console.error('Error toggling role status:', error);
        }
    };

    return (
        <>
            <HomePage />
            <div className="roles-container">
                <div className="header-container">
                    <h1>All Roles</h1>
                    <button className="add-role-button" onClick={handleAddRole}>
                        Add Role
                    </button>
                </div>
                <table className="roles-table">
                    <thead>
                        <tr>
                            <th>Role</th> {/* Column for Role */}
                            <th>Description</th> {/* Column for Role Description */}
                            <th>Action</th> {/* Column for action buttons */}
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.roleId}>
                                <td>{role.roleName}</td> {/* Assuming `roleName` is available */}
                                <td>{role.roleDescription}</td> {/* Assuming `roleDescription` is available */}
                                <td className="actions-cell">
                                    <button
                                        className="update-role-button"
                                        onClick={() => handleUpdate(role.roleId)} // Assuming `roleId` is available
                                    >
                                        Update
                                    </button>
                                    <button
                                        className={`toggle-role-button ${role.isDeleted ? 'enable' : 'disable'}`}
                                        onClick={() => handleToggleStatus(role.roleId, role.isDeleted)}
                                    >
                                        {role.isDeleted ? 'Enable' : 'Disable'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewRoles;
