import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css';

/*
  Register Component
  ------------------
  - New users ko register karta hai
  - Employee ya Admin role select karne ka option deta hai
  - Admin ke liye secret key required hoti hai
  - Successful registration ke baad role-based navigation hoti hai
*/

function Register() {
  const navigate = useNavigate();

  // 🧾 Form state (controlled inputs)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // default role
    secretKey: ""     // sirf admin ke liye
  });

  // ❌ Error message state
  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Handle input changes (all fields)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // 🌐 Send registration request to backend
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      // ❌ Backend error handling
      if (!res.ok) {
        setErrorMessage(data.message || "Registration failed");
        return;
      }

      // ✅ Success message
      alert("✅ Registration successful! Please login.");

      // 🔐 Role-based navigation
      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

      // 🔄 Reset form after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
        secretKey: ""
      });

    } catch (error) {
      console.error("Register Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="container mt-1 d-flex justify-content-left align-items-left"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="text-center mb-4">
          <strong>📝 Register</strong>
        </h3>

        {/* 📋 Registration Form */}
        <form onSubmit={handleSubmit} autoComplete="off">

          {/* 👤 Name */}
          <div className="mb-3">
            <label className="form-label"><strong>Name</strong></label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* 📧 Email */}
          <div className="mb-3">
            <label className="form-label"><strong>Email address</strong></label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="new-email"
              required
            />
          </div>

          {/* 🔒 Password */}
          <div className="mb-3">
            <label className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          {/* 🧑‍💼 Role Selection */}
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

            {/* 🔑 Admin Secret Key (only visible for admin) */}
            {formData.role === "admin" && (
              <input
                type="text"
                name="secretKey"
                className="form-control mt-2"
                placeholder="Enter Admin Secret Key"
                value={formData.secretKey}
                onChange={handleChange}
                required
              />
            )}
          </div>

          {/* ❌ Error Message */}
          {errorMessage && (
            <div className="alert alert-danger mt-2">
              {errorMessage}
            </div>
          )}

          {/* ✅ Submit Button */}
          <button type="submit" className="btn btn-success w-100 mt-3">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
