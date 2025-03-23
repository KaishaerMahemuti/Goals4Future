// client/src/components/ProgressUpdate.js
import React, { useState } from 'react';

const ProgressUpdate = ({ goal, onProgressUpdated }) => {
  const [progress, setProgress] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006';
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/goals/${goal._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // <-- Add this
        },
        body: JSON.stringify({ progress }), // sending { progress: 'met' } etc.
      });
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
      const updatedGoal = await response.json();
      console.log('Progress updated:', updatedGoal);
      setProgress('');

      // Notify parent to update local state
      if (onProgressUpdated) {
        onProgressUpdated(updatedGoal);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="d-flex align-items-center mt-2">
      <input
        type="text"
        className="form-control me-2"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        placeholder="Enter progress update"
      />
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default ProgressUpdate;
