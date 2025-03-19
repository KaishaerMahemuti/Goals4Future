// client/src/components/GoalItem.js
import React, { useState } from 'react';
import ProgressUpdate from './ProgressUpdate';

const GoalItem = ({ goal, onProgressUpdated, onGoalDeleted }) => {
  const [showProgress, setShowProgress] = useState(false);

  // Optional date formatting helper
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  // DELETE request to remove this goal from the database
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5006/api/goals/${goal._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      // Read the response (optional)
      await response.json();
      // Notify parent to remove the goal from local state
      if (onGoalDeleted) onGoalDeleted(goal._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
      <p><strong>Description:</strong> {goal.description}</p>
      {goal.deadline && (
        <p><strong>Deadline:</strong> {formatDate(goal.deadline)}</p>
      )}
      <p><strong>Priority:</strong> {goal.priority}</p>
      <p><strong>Status:</strong> {goal.status}</p>

      <button onClick={() => setShowProgress(!showProgress)}>
        {showProgress ? 'Hide Update' : 'Update Progress'}
      </button>
      {showProgress && (
        <ProgressUpdate
          goalId={goal._id}
          onProgressUpdated={onProgressUpdated}
        />
      )}

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={{ marginLeft: '10px', color: 'red' }}
      >
        Delete
      </button>
    </li>
  );
};

export default GoalItem;
