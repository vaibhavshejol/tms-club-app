import React, { useState } from 'react';
import axios from 'axios';
import './ScheduleMeeting.css'; // Import custom CSS

const ScheduleMeeting = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [roles, setRoles] = useState(['']);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      title,
      description,
      date,
      startTime,
      endTime,
      roles: roles.filter(role => role.trim() !== '') // Remove empty roles
    };

    try {
      // Replace URL with your actual API endpoint
      await axios.post('http://localhost:9090/api/meeting/schedule-meeting', meetingData);
      // Handle successful submission
      alert('Meeting scheduled successfully!');
      // Reset the form after submission
      setTitle('');
      setDescription('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setRoles(['']);
    } catch (error) {
      // Handle errors
      console.error('Error scheduling meeting:', error);
      setError('Failed to schedule meeting. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="full-page">
      <div className="form-container">
        <h1 className="mb-4">Schedule a Meeting</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="startTime">Start Time:</label>
              <input
                id="startTime"
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="endTime">End Time:</label>
              <input
                id="endTime"
                type="time"
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
