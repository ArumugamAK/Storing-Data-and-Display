const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getProfile = async (req, res) => {
    try {
      // The user is already set in req.user by the authMiddleware
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };