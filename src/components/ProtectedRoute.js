import React from 'react';
import { Navigate } from 'react-router-dom';

/*
  ProtectedRoute component
  ------------------------
  - Ye component protected pages ko secure karta hai
  - Agar user logged in ho (token exist karta ho) → page show hoga
  - Agar token na ho → user ko login page par redirect kar diya jayega
*/

function ProtectedRoute({ children }) {

  // 🔑 Get token from localStorage
  const token = localStorage.getItem("token");

  // ❌ If token does NOT exist, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If token exists, render the protected component
  return children;
}

export default ProtectedRoute;
