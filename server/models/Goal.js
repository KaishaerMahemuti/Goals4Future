// server/models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    deadline: { type: Date },
    priority: { type: String, default: 'normal' },
    status: { type: String, default: 'pending' },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',         // <-- references the User model
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
