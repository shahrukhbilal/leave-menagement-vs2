import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-auto">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Leave Management System</p>
        <small>
          Copperate with your team 👨🏼‍🤝‍👨🏼<br />
          Contact: support@leavemanager.com
        </small>
      </div>
    </footer>
  );
}

export default Footer;
