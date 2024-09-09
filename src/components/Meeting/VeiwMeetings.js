import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewMeetings.css';
import HomePage from '../Navigation/HomePage';

const ViewMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/meeting');
                setMeetings(response.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };

        fetchMeetings();
    }, []);

    const handleViewRoles = (meetingId, meetingTitle) => {
        // Navigate to the roles page with meetingId and meetingTitle in the state
        navigate('/meeting-roles', { state: { meetingId, meetingTitle } });
    };

    const handleCreateMeeting = () => {
        navigate('/create-meeting');
    };

    return (
        <>
            <HomePage />
            <div className="table-container">
                <div className="header-container">
                    <h1>All Meetings</h1>
                    <button
                        className="create-meeting-button"
                        onClick={handleCreateMeeting}
                    >
                        Create New Meeting
                    </button>
                </div>
                <table className="meetings-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map((meeting) => (
                            <tr key={meeting.id}>
                                <td>{meeting.meetingTitle}</td>
                                <td>{meeting.meetingDescription}</td>
                                <td>{new Date(meeting.meetingDate).toLocaleDateString()}</td>
                                <td>{meeting.meetingStartTime}</td>
                                <td>{meeting.meetingEndTime}</td>
                                <td>
                                    <button
                                        className="view-roles-button"
                                        onClick={() => handleViewRoles(meeting.meetingId, meeting.meetingTitle)}
                                    >
                                        View Roles
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

export default ViewMeetings;
