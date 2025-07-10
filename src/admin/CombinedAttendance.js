import React, { useEffect, useState } from 'react';

const CombinedAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [markedToday, setMarkedToday] = useState([]);

  const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD

  // ✅ Fetch Registered Employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/employees');
      const data = await res.json();

      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error("Expected array but got:", data);
        setEmployees([]); // Fallback to empty array
      }
    } catch (err) {
      console.error('❌ Failed to fetch employees:', err);
    }
  };

  // ✅ Fetch Today's Attendance Records
  const fetchTodayAttendance = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/attendance');
      const data = await res.json();

      if (Array.isArray(data)) {
        const filtered = data.filter(record => record.date === today);
        setMarkedToday(filtered);
      } else {
        console.error("Expected array for attendance, got:", data);
        setMarkedToday([]);
      }
    } catch (err) {
      console.error('❌ Failed to fetch attendance', err);
    }
  };

  // ✅ Mark Attendance: Present or Absent
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
        alert(`${employee.name} marked ${status}`);
        fetchTodayAttendance(); // Refresh list after marking
      } else {
        alert(data.message || 'Failed to mark attendance');
      }
    } catch (err) {
      console.error('❌ Error marking attendance:', err);
    }
  };

  // 🟡 Initial fetch on mount
  useEffect(() => {
    fetchEmployees();
    fetchTodayAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-4">
      <h2>📌 Mark Attendance</h2>

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
                <button
                  className="btn btn-success me-2"
                  onClick={() => markAttendance(emp, 'Present')}
                  disabled={markedToday.some(rec => rec.employeeId === emp._id)}
                >
                  ✅ Present
                </button>
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
                <span className={`badge ${entry.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
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
