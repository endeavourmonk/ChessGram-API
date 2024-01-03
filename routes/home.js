const express = require('express');

const User = require('../models/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        message: `No user exist with username: ${username}`,
        data: null,
      });
    }
    res.status(200).json({
      message: `User found`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
