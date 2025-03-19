// server/routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal'); 
// ^ Make sure this is correct: 
//   If your file is actually named "Goal.js" in /models, 
//   change to require('../models/Goal');

// GET /api/goals
// Fetch all goals
router.get('/', async (req, res) => {
  try {
    // Sort by createdAt descending so newest appear first
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/goals
// Create a new goal
router.post('/', async (req, res) => {
  try {
    const { description, deadline, priority } = req.body;
    const newGoal = new Goal({ description, deadline, priority });
    const savedGoal = await newGoal.save();
    // Return the newly created goal with a 201 status
    res.status(201).json(savedGoal);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/goals/:id
// Update a goal (e.g., status or progress)
router.patch('/:id', async (req, res) => {
  try {
    const { progress } = req.body;
    // For example, interpret "progress" as the new "status" for the goal
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { status: progress }, 
      { new: true }  // returns the updated document
    );
    if (!updatedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(updatedGoal);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/goals/:id
// Remove a goal by ID
router.delete('/:id', async (req, res) => {
    try {
      const removedGoal = await Goal.findByIdAndDelete(req.params.id);
      if (!removedGoal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      return res.status(200).json({ message: 'Goal deleted successfully', removedGoal });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  });


module.exports = router;
