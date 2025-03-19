// GoalList.js (the real one)
import React from 'react';
import GoalItem from './GoalItem';

const GoalList = ({ goals, onProgressUpdated, onGoalDeleted }) => {
  return (
    <div>
      <h2>Your Goals</h2>
      <ul>
        {goals.map((goal) => (
          <GoalItem
            key={goal._id}
            goal={goal}
            onProgressUpdated={onProgressUpdated}
            onGoalDeleted={onGoalDeleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
