import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check login status (e.g., via token or localStorage)
  const isLoggedIn = !!localStorage.getItem('authToken'); // Adjust based on your auth mechanism

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login page
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
