// client/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import GoalForm from './GoalForm';
import GoalList from './GoalList';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);

  // Fetch goals from the server on component mount
  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:5006/api/goals');
      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Callback that GoalForm can call after a goal is successfully created
  const handleGoalCreated = (newGoal) => {
    // Insert the new goal at the top
    setGoals((prevGoals) => [newGoal, ...prevGoals]);
  };

  // Callback to handle updated goals (PATCH requests from ProgressUpdate)
  const handleProgressUpdated = (updatedGoal) => {
    // Replace the old version of the goal in local state
    setGoals((prevGoals) =>
      prevGoals.map((g) => (g._id === updatedGoal._id ? updatedGoal : g))
    );
  };

  // Callback to handle goal deletion
  const handleGoalDeleted = (goalId) => {
    // Filter out the deleted goal
    setGoals((prevGoals) => prevGoals.filter((g) => g._id !== goalId));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        {/* Left column for GoalForm */}
        <div className="col-md-6 mb-4">
          <GoalForm onGoalCreated={handleGoalCreated} />
        </div>
        {/* Right column for GoalList */}
        <div className="col-md-6">
          <GoalList
            goals={goals}
            onProgressUpdated={handleProgressUpdated}
            onGoalDeleted={handleGoalDeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
