import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './ScheduleMeeting.css'; // Import custom CSS

const ScheduleMeeting = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const [roles, setRoles] = useState(['']);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRoleChange = (index, value) => {
    const newRoles = [...roles];
    newRoles[index] = value;
    setRoles(newRoles);
  };

  const addRoleField = () => {
    setRoles([...roles, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const meetingData = {
      meetingTitle,
      meetingDescription,
      meetingDate,
      meetingStartTime,
      meetingEndTime,
      roles: roles.filter(role => role.trim() !== '') // Remove empty roles
    };

    try {
      // Replace URL with your actual API endpoint
      await axios.post('http://localhost:9090/api/meeting/schedule-meeting', meetingData);
      // Handle successful submission
      alert('Meeting scheduled successfully!');
      // Reset the form after submission
      setMeetingTitle('');
      setMeetingDescription('');
      setMeetingDate('');
      setMeetingStartTime('');
      setMeetingEndTime('');
      setRoles(['']);
    } catch (error) {
      // Handle errors
      console.error('Error scheduling meeting:', error);
      setError('Failed to schedule meeting. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewMeetings = () => {
    navigate('/view-meetings'); // Navigate to /view-meetings
  };

  return (
    <div className="full-page">
      <div className="form-container">
        <h1 className="mb-4">Schedule a Meeting</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="meetingTitle">Title:</label>
            <input
              id="meetingTitle"
              type="text"
              className="form-control"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="meetingDescription">Description:</label>
            <textarea
              id="meetingDescription"
              className="form-control"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="meetingDate">Date:</label>
            <input
              id="meetingDate"
              type="date"
              className="form-control"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="meetingStartTime">Start Time:</label>
              <input
                id="meetingStartTime"
                type="time"
                className="form-control"
                value={meetingStartTime}
                onChange={(e) => setMeetingStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="meetingEndTime">End Time:</label>
              <input
                id="meetingEndTime"
                type="time"
                className="form-control"
                value={meetingEndTime}
                onChange={(e) => setMeetingEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Roles:</label>
            {roles.map((role, index) => (
              <div className="input-group mb-3" key={index}>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  placeholder={`Role ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addRoleField}
            >
              Add Role
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleViewMeetings}
            style={{ marginLeft: '10px' }} // Add some spacing between buttons
          >
            View Meetings
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
