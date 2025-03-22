// client/src/components/GoalForm.js
import React, { useState } from 'react';

const GoalForm = ({ onGoalCreated }) => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5006/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, deadline, priority }),
      });
      if (!response.ok) {
        throw new Error('Failed to create goal');
      }
      const newGoal = await response.json();
      console.log('New goal from server:', newGoal); 
      onGoalCreated(newGoal);
      setDescription('');
      setDeadline('');
      setPriority('');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h3 className="mb-3">Add New Goal</h3>
      <form onSubmit={handleSubmit}>
        {/* Description Field */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            id="description"
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Deadline Field */}
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">
            Deadline:
          </label>
          <input
            id="deadline"
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        {/* Priority Field */}
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority:
          </label>
          <select
            id="priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalForm;
