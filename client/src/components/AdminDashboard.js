// client/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [allGoals, setAllGoals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5006/api/admin/all-goals', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not authorized or server error');
        }
        return res.json();
      })
      .then((data) => setAllGoals(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container my-4">
      <h2>Admin Dashboard</h2>
      {allGoals.map((goal) => (
        <div key={goal._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{goal.description}</h5>
            <p className="card-text">Status: {goal.status}</p>
            {/* More fields as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
