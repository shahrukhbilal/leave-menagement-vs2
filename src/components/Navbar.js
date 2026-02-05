import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Icons
import { FaUserShield } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

function Navbar() {

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Check if user is logged in by checking token
  const token = localStorage.getItem("token");

  // 🔓 Logout handler
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to home page
    navigate('/');
  };

  // 🛡️ Redirect to admin login page
  const handleAdmin = () => {
    navigate('/admin-login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 gap-2">

      {/* App icon */}
      <FaCalendarAlt size={24} style={{ color: "#61DBFB" }} />

      {/* Brand / Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        Leave Portal
      </Link>

      {/* Mobile toggle button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar content */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        {/* Left-side navigation links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {/* Home link */}
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {/* Show Login if user is NOT authenticated */}
          {!token ? (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          ) : (
            <>
              {/* Show Apply Leave if user IS authenticated */}
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Apply Leave
                </Link>
              </li>

              {/* Logout button */}
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Right-side Admin button */}
        <div className="d-flex">
          <button
            className="btn btn-dark d-flex align-items-center gap-2"
            onClick={handleAdmin}
          >
            <FaUserShield size={20} style={{ color: "#61DBFB" }} />
            Admin
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
