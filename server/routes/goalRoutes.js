// server/routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/authMiddleware'); // Import your JWT auth middleware

// GET /api/goals
// Fetch all goals for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    // Only fetch goals belonging to the current user
    const goals = await Goal.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/goals
// Create a new goal for the logged-in user
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating a new goal for user:', req.user);
    const { description, deadline, priority } = req.body;

    // Link the goal to the user who created it
    const newGoal = new Goal({
      description,
      deadline,
      priority,
      user: req.user.userId
    });

    const savedGoal = await newGoal.save();
    console.log('Goal saved:', savedGoal);
    res.status(201).json(savedGoal);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/goals/:id
// Update a goal (e.g., status or progress)
router.patch('/:id', auth, async (req, res) => {
  try {
    const { progress } = req.body;

    // Optionally verify that the user owns the goal or is admin before updating
    // e.g. const goal = await Goal.findOne({ _id: req.params.id, user: req.user.userId });

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { status: progress },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    // If you want to ensure the user is the owner, do an extra check here:
    // if (updatedGoal.user.toString() !== req.user.userId && req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Not authorized to update this goal' });
    // }

    res.json(updatedGoal);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/goals/:id
// Remove a goal by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    // If you want to ensure the user is the owner, find by user + id:
    // const removedGoal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.userId });

    const removedGoal = await Goal.findByIdAndDelete(req.params.id);

    if (!removedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    // If you want to ensure the user is the owner:
    // if (removedGoal.user.toString() !== req.user.userId && req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Not authorized to delete this goal' });
    // }

    return res.status(200).json({ message: 'Goal deleted successfully', removedGoal });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
