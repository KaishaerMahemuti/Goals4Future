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
    {/* The header is always visible */}
    <Header />

    {/* Define your routes */}
    <Routes>
      {/* 1) Landing page for visitors at path="/" */}
      <Route path="/" element={<Landing />} />

      {/* 2) Signup and Login pages */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* 3) Protected routes using PrivateRoute */}
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

      {/* 4) Optionally handle 404s */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </div>
);

export default App;
