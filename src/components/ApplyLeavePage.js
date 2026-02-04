import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ApplyLeavePage = () => {
  // Store selected leave dates and reason
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  // ----------------------------------
  // Handle leave form submission
  // ----------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload

    // Get logged-in user info from localStorage
    const auth = JSON.parse(localStorage.getItem('auth'));
    const userId = auth?.user?._id;
    const token = localStorage.getItem('token');

    // Safety check: user must be logged in
    if (!userId) {
      alert('User not found. Please login again.');
      return;
    }

    try {
      // Send leave request to backend
      const res = await fetch('http://localhost:5000/api/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // JWT token for authentication
        },
        body: JSON.stringify({
          userId,
          reason,
          fromDate,
          toDate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Success feedback and reset form
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
    // Full-page centered layout
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f4f7fa',
        padding: '20px',
      }}
    >
      {/* Main card with entry animation */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: '#fff',
          padding: '30px 25px',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '450px',
        }}
      >
        {/* Page heading animation */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
          }}
        >
          📝 Apply for Leave
        </motion.h2>

        {/* Leave application form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {/* From date input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1.5px solid #ddd',
              }}
            />
          </motion.div>

          {/* To date input */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <label>To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1.5px solid #ddd',
              }}
            />
          </motion.div>

          {/* Reason textarea */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Explain why you need leave..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1.5px solid #ddd',
                minHeight: '80px',
                resize: 'vertical',
              }}
            />
          </motion.div>

          {/* Submit button with hover/tap animation */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '12px',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >
            Submit Leave
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplyLeavePage;
