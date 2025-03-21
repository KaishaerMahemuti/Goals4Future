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
      {allGoals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
        allGoals.map((goal) => (
          <div key={goal._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{goal.description}</h5>
              <p className="card-text">
                Status: <strong>{goal.status}</strong>
              </p>
              <p className="card-text">
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </p>
              {goal.user && typeof goal.user === 'object' ? (
                <div className="border-top pt-2 mt-2">
                  <p className="mb-1">Created by: {goal.user.username}</p>
                  {goal.user.email && <p className="mb-0">Email: {goal.user.email}</p>}
                </div>
              ) : (
                <p className="card-text">Created by: {goal.user}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
