// server/models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    deadline: { type: Date },      // Optional
    priority: { type: String, default: 'normal' },
    status: { type: String, default: 'pending' }
  },
  { timestamps: true } // This automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Goal', goalSchema);
