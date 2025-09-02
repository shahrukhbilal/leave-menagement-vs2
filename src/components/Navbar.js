import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate('/');
  }

  function handleAdmin() {
    navigate('/admin-login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">Leave Portal</Link>
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

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Apply Leave</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>

        <div className="d-flex">
          <button className="btn btn-warning" onClick={handleAdmin}>Admin</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
