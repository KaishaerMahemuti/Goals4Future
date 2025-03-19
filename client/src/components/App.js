// client/src/components/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <div>
    {/* Your existing header is always visible */}
    <Header />

    {/* Define all your routes below */}
    <Routes>
      {/* Landing page for visitors */}
      <Route path="/" element={<Landing />} />

      {/* Signup and Login */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes using PrivateRoute */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Fallback route if needed, or 404 handling */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </div>
);

export default App;
