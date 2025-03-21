// server/middleware/adminOnly.js
const auth = require('./authMiddleware');

const adminOnly = (req, res, next) => {
  // First run the auth middleware to populate req.user
  auth(req, res, () => {
    // Now check if the user is an admin
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied, admin only' });
    }
  });
};

module.exports = adminOnly;
