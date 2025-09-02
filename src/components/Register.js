import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- for redirect after register
import './Form.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    role: "employee",
    secretKey: ""
  });

  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Registration failed.");
        return;
      }

      // ✅ On success
      alert("✅ Registration successful! Please login.");
      setErrorMessage('');
      setFormData({
        name: "",
        password: "",
        email: "",
        role: "employee"
      });

      // 🔀 Redirect to login page
      navigate("/login");

    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center mb-4"><strong>📝 Register</strong></h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><strong>Name</strong></label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Email address</strong></label>
            <input
              name="email"
              type="email"
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
              className="form-control"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Role Dropdown */}
          <div className="mb-3">
            <label className="form-label"><strong>Role</strong></label>
            <select
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            {formData.role === "admin" && (
        <input
          type="text"
          name="secretKey"
          placeholder="Enter Admin Secret Key"
          onChange={handleChange}
        />
      )}
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="alert alert-danger mt-2" role="alert">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 mt-3">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
