import React, { useEffect, useState } from 'react';

const Event = () => {
  // Stores all events fetched from backend
  const [events, setEvents] = useState([]);

  // Controls form input values for creating a new event
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: ''
  });

  // ----------------------------------
  // Fetch all events from the backend
  // ----------------------------------
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load events:', err);
    }
  };

  // ----------------------------------
  // Handle input field value changes
  // ----------------------------------
  const handleChange = (e) => {
    // Update only the changed field while keeping others intact
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ----------------------------------
  // Submit new event to backend
  // ----------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        // Give quick feedback to admin
        alert('✅ Event added!');

        // Reset form after successful submission
        setFormData({ title: '', start: '', end: '' });

        // Refresh event list to show newly added event
        fetchEvents();
      }
    } catch (err) {
      console.error('Event add error:', err);
    }
  };

  // ----------------------------------
  // Load events once when page mounts
  // ----------------------------------
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📌 Add New Event</h2>

      {/* Event creation form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="form-control"
            required
          />
        </div>

        <div className="col-md-3">
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-3">
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </form>

      {/* Events listing table */}
      <h4>📋 All Events</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, i) => (
            <tr key={i}>
              <td>{ev.title}</td>
              {/* Convert ISO date to readable local format */}
              <td>{new Date(ev.start).toLocaleString()}</td>
              <td>{new Date(ev.end).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Event;
