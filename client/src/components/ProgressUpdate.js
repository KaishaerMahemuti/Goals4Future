// client/src/components/ProgressUpdate.js
import React, { useState } from 'react';

const ProgressUpdate = ({ goalId, onProgressUpdated }) => {
  const [progress, setProgress] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5006/api/goals/${goalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress }), // sending { progress: 'met' } etc.
      });
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
      const updatedGoal = await response.json();
      console.log('Progress updated:', updatedGoal);
      setProgress('');

      // Optional: Notify parent to refresh or update the specific goal
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
