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
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Description: {goal.description}</h5>
        {goal.deadline && (
          <h6 className="card-subtitle mb-2 text-muted">
            Deadline: {formatDate(goal.deadline)}
          </h6>
        )}
        <p className="card-text">
          Priority: {goal.priority}
          <br />
          Status: {goal.status}
        </p>

        {/* Update Progress Button */}
        <button
          onClick={() => setShowProgress(!showProgress)}
          className="btn btn-secondary me-2"
        >
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
          className="btn btn-danger mt-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalItem;
