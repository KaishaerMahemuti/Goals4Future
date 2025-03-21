// client/src/components/Landing.js
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="container text-center my-5">
      <h1>Welcome to Goals 4 Future</h1>
      <p>Please sign up or log in to manage your goals.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-3">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default Landing;
