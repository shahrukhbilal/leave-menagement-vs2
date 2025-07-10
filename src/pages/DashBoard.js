import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, []);

  return (
    <>
    
      <div style={{ padding: '20px' }}>
        <h2>Welcome {userName || 'User'}!</h2>
        <p>👇 Choose an action:</p>

        <ul style={styles.list}>
          
          <li style={styles.item}>
            📄 <button onClick={() => navigate('/status')} style={styles.btn}>Check your leave status</button>
          </li>
          <li style={styles.item}>
            ➕ <button onClick={() => navigate('/apply')} style={styles.btn}>Apply for a new leave</button>
          </li>
        </ul>
      </div>
    </>
  );
};

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
    fontSize: '16px'
  }
};

export default Dashboard;
