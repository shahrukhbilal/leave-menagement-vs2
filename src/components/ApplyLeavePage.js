import React, { useState } from 'react';


const ApplyLeavePage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // Assume employeeId is stored

    const res = await fetch('http://localhost:5000/api/leaves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
  userId: user._id,  // 🔁 match backend schema
  reason,
  fromDate,
  toDate
}),

    });

    if (res.ok) {
      alert('Leave submitted!');
      setReason('');
      setFromDate('');
      setToDate('');
    } else {
      const err = await res.json();
      alert('Error: ' + err.error);
    }
  };

  return (
    <>
      
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
    </>
  );
};

export default ApplyLeavePage;
