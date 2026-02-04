import React, { useEffect, useState } from 'react';

const CombinedAttendance = () => {
  // Stores all registered employees fetched from backend
  const [employees, setEmployees] = useState([]);

  // Stores attendance records only for today
  const [markedToday, setMarkedToday] = useState([]);

  // Get today's date in YYYY-MM-DD format
  // This helps us match backend attendance records correctly
  const today = new Date().toISOString().split('T')[0];

  // -------------------------------
  // Fetch all registered employees
  // -------------------------------
  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/employees');
      const data = await res.json();

      // Safety check: backend must return an array
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error('Expected array but got:', data);
        setEmployees([]); // fallback to avoid UI crash
      }
    } catch (err) {
      console.error('❌ Failed to fetch employees:', err);
    }
  };

  // -----------------------------------
  // Fetch attendance records for today
  // -----------------------------------
  const fetchTodayAttendance = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/attendance');
      const data = await res.json();

      // Filter only today’s attendance from all records
      if (Array.isArray(data)) {
        const filtered = data.filter(record => record.date === today);
        setMarkedToday(filtered);
      } else {
        console.error('Expected array for attendance, got:', data);
        setMarkedToday([]);
      }
    } catch (err) {
      console.error('❌ Failed to fetch attendance', err);
    }
  };

  // ------------------------------------------------
  // Mark attendance for an employee (Present/Absent)
  // ------------------------------------------------
  const markAttendance = async (employee, status) => {
    try {
      const res = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: employee._id,
          name: employee.name,
          date: today,
          status
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Notify admin and refresh today’s attendance list
        alert(`${employee.name} marked ${status}`);
        fetchTodayAttendance();
      } else {
        alert(data.message || 'Failed to mark attendance');
      }
    } catch (err) {
      console.error('❌ Error marking attendance:', err);
    }
  };

  // -----------------------------------
  // Initial data load when page mounts
  // -----------------------------------
  useEffect(() => {
    fetchEmployees();
    fetchTodayAttendance();
    // Dependencies intentionally skipped to avoid re-fetch loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-4">
      <h2>📌 Mark Attendance</h2>

      {/* Employee list with action buttons */}
      <table className="table table-hover table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                {/* Present button */}
                <button
                  className="btn btn-success me-2"
                  onClick={() => markAttendance(emp, 'Present')}
                  // Disable button if attendance already marked today
                  disabled={markedToday.some(rec => rec.employeeId === emp._id)}
                >
                  ✅ Present
                </button>

                {/* Absent button */}
                <button
                  className="btn btn-danger"
                  onClick={() => markAttendance(emp, 'Absent')}
                  disabled={markedToday.some(rec => rec.employeeId === emp._id)}
                >
                  ❌ Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Summary table for today’s attendance */}
      <h3 className="mt-4">📋 Attendance Summary for Today</h3>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {markedToday.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.name}</td>
              <td>{entry.date}</td>
              <td>
                {/* Status badge with dynamic color */}
                <span
                  className={`badge ${
                    entry.status === 'Present' ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  {entry.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CombinedAttendance;
