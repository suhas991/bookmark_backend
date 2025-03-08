const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google Authentication Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback Route (Make sure it matches the Google Cloud Console redirect URI)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173/dashboard'); // Redirect to frontend after login
  }
);

module.exports = router;
