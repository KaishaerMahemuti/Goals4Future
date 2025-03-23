// client/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import GoalForm from './GoalForm';
import GoalList from './GoalList';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5006';

  // Fetch goals from the server on component mount
  const fetchGoals = async () => {
    try {
      console.log("Fetching goals...");
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    console.log("Goals updated:", goals);
  }, []);
  useEffect(() => {
    console.log("Goals updated:", goals);
  }, [goals]);
  // Callback that GoalForm can call after a goal is successfully created
  const handleGoalCreated = (newGoal) => {
    console.log('handleGoalCreated called with:', newGoal);
    setGoals((prevGoals) => {
      console.log('Old goals:', prevGoals);
      console.log('Adding newGoal:', newGoal);
      return [newGoal, ...prevGoals];
    });
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
