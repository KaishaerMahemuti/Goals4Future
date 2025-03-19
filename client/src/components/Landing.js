// client/src/components/Landing.js
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="container my-4">
      <h1>Welcome to Goal Keeper App</h1>
      <p>Please log in or sign up to continue.</p>
      <Link to="/login" className="btn btn-primary me-2">Login</Link>
      <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
    </div>
  );
};

export default Landing;
