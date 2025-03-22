// client/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  // Check if token exists and is a valid string
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return <Navigate to="/login" />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error('Token decoding failed:', error);
    return <Navigate to="/login" />;
  }

  // If a role is required, check it against the decoded token's role
  if (requiredRole && decoded.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
