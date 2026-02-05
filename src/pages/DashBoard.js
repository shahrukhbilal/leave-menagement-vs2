import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
  Dashboard Component
  -------------------
  - Logged-in user ko welcome message dikhata hai
  - Leave apply karne aur status check karne ke options deta hai
*/

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // 🔐 Get logged-in user info from localStorage
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'));

    if (authData?.user?.name) {
      setUserName(authData.user.name);
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome {userName || 'User'} 👋</h2>
      <p>👇 Choose an action:</p>

      <ul style={styles.list}>
        <li style={styles.item}>
          📄
          <button
            onClick={() => navigate('/status')}
            style={styles.btn}
          >
            Check your leave status
          </button>
        </li>

        <li style={styles.item}>
          ➕
          <button
            onClick={() => navigate('/apply')}
            style={styles.btn}
          >
            Apply for a new leave
          </button>
        </li>
      </ul>
    </div>
  );
};

// 🎨 Simple inline styles
const styles = {
  list: {
    listStyleType: 'none',
    padding: 0
  },
  item: {
    marginBottom: '10px'
  },
  btn: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '16px',
    marginLeft: '5px'
  }
};

export default Dashboard;
