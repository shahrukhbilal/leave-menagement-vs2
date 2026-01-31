import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    secretKey: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      

      if (!res.ok) {
        setErrorMessage(data.message || "Registration failed");
        return;
      }

      alert("✅ Registration successful! Please login.");

    
      // 🔐 ROLE BASED NAVIGATION
      if (data.user?.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}

      // 🔄 Reset form
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

        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Name */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Role */}
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

            {/* Admin Secret Key */}
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

          {/* Error Message */}
          {errorMessage && (
            <div className="alert alert-danger mt-2">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 mt-3">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
