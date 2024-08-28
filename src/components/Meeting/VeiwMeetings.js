import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewMeetings.css';
import HomePage from '../Navigation/HomePage';

const ViewMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

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

    const handleViewMembers = (meetingId) => {
        // Navigate to the assigned members page for the selected meeting
        navigate(`/assigned-members/${meetingId}`);
    };

    return (
        <>
            <HomePage />
            <div className="table-container">
                <h1>All Meetings</h1>
                <table className="meetings-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Action</th> {/* Column for the button */}
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
                                        className="view-members-button"
                                        onClick={() => handleViewMembers(meeting.meetingId)}
                                    >
                                        View Members
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
