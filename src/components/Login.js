// React aur useState hook import kiya
import React, { useState } from 'react';

// Custom CSS file import
import './Form.css';

// Page navigation ke liye hook
import { useNavigate } from 'react-router-dom';

function Login() {
  // Form ka state: email aur password
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Navigation ke liye useNavigate hook
  const navigate = useNavigate();

  // Input change handler (email / password)
  const handleChange = (e) => {
    // Previous data copy + updated field
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload stop

    try {
      // Backend login API call
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Email & password send
      });

      // Debug: data jo backend ko ja raha
      console.log("Login data sending:", formData);

      // Backend response
      const data = await res.json();
      console.log("Login response:", data);

      // Agar login successful ho aur token mile
      if (res.ok && data.token) {

        // ✅ Complete auth object localStorage me save
        localStorage.setItem("auth", JSON.stringify(data));

        // ✅ Sirf token alag se save
        localStorage.setItem("token", data.token);

        // ✅ Role ke base par redirect
        if (data.user?.role === "admin") {
          navigate("/admin"); // Admin dashboard
        } else {
          navigate("/dashboard"); // User dashboard
        }

      } else {
        // Invalid credentials case
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      // Server ya network error
      console.error("Login error:", error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    // Center aligned login card
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <h3 className="text-center mb-4">
          <strong>👤 User Login</strong>
        </h3>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="form">

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">
              <strong>Email address</strong>
            </label>
            <input
              name="email"
              type="email"
              autoComplete="off"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">
              <strong>Password</strong>
            </label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              className="form-control"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
