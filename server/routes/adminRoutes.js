// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Goal = require('../models/Goal');

// GET all goals for admin
router.get('/all-goals', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied, admin only' });
  }

  try {
    // Populate the 'user' field with username and email
    const goals = await Goal.find({}).populate('user', 'username email');
    res.json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
