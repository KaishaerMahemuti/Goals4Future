// client/src/components/GoalForm.js
import React, { useState } from 'react';

const GoalForm = ({ onGoalCreated }) => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5006/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, deadline, priority }),
      });
      if (!response.ok) {
        throw new Error('Failed to create goal');
      }
      // Parse the newly created goal from the response
      const newGoal = await response.json();

      // Call the callback passed down from Dashboard
      onGoalCreated(newGoal);

      // Optionally clear the form
      setDescription('');
      setDeadline('');
      setPriority('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Add New Goal</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;
