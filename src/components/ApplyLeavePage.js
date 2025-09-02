import React, { useState } from 'react';

const ApplyLeavePage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = JSON.parse(localStorage.getItem("auth"));
    const userId = auth?.user?._id;
    const token = localStorage.getItem('token');

    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,    // ✅ included
          reason,
          fromDate,
          toDate
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Leave submitted!');
        setReason('');
        setFromDate('');
        setToDate('');
      } else {
        alert('❌ Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('❌ An unexpected error occurred.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>From Date:</label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />

        <label>To Date:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />

        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyLeavePage;
