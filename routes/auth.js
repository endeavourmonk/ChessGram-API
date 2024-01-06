const express = require('express');
const passport = require('passport');

const { logout } = require('../controllers/auth');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/faillure' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

router.get('/logout', logout);

module.exports = router;
