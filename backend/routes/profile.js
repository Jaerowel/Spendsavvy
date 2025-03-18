const express = require('express');
const router = express.Router();
const User = require("../models/Users"); // Make sure your User model is set up!
const authMiddleware = require("../middleware/authMiddleware"); // Assuming you have one for JWT

// @route    GET /api/profile
// @desc     Get logged-in user's profile
// @access   Private (requires auth)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user should come from the auth middleware (the decoded JWT)
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
