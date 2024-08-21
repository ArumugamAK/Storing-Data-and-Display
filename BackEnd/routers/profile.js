const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware to verify JWT token
const User = require('../models/user'); // Your User model

// Route to get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Find user by ID from the token
    const user = await User.findById(req.userId); // req.userId should be set by verifyToken middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.json({
      name: user.name,
      email: user.email,
      gender: user.gender,
      // Include other profile details you want to return
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
