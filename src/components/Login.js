import React, { useState } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        
      });
  console.log("Login data sending:", formData);

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.token) {
        // ✅ Save token + user data
        localStorage.setItem("auth", JSON.stringify(data));
        localStorage.setItem("token", data.token);

        // ✅ Redirect based on role
        if (data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4"><strong>👤 User Login</strong></h3>

        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label className="form-label"><strong>Email address</strong></label>
            <input 
              name="email"
              type="email"
              autoComplete='off'
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Password</strong></label>
            <input
              name="password"
              type="password"
              autoComplete='new-password'
              className="form-control"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
