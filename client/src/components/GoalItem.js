// client/src/components/GoalItem.js
import React, { useState } from 'react';
import ProgressUpdate from './ProgressUpdate';

const GoalItem = ({ goal, onProgressUpdated, onGoalDeleted }) => {
  const [showProgress, setShowProgress] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5006/api/goals/${goal._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // <-- Add this
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      await response.json();
      if (onGoalDeleted) onGoalDeleted(goal._id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <li>
      <h3>{goal.description}</h3>
      <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
      <p>Priority: {goal.priority}</p>
      <p>Status: {goal.status}</p>  {/* Add this line */}
      <button onClick={() => setShowProgress(!showProgress)}>
        {showProgress ? 'Hide' : 'Show'} Progress
      </button>
      <button onClick={handleDelete}>Delete</button>
      {showProgress && (
        <ProgressUpdate goal={goal} onProgressUpdated={onProgressUpdated} />
      )}
    </li>
  );
  // ... rest of component unchanged
};


export default GoalItem;
