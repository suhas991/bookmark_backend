const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Authentication Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('User authenticated:', req.user);
    res.redirect('http://localhost:5173'); // Redirect to frontend after successful login
  }
);

// Get logged-in user data
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;