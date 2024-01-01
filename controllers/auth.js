const User = require('../models/users');

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/api/v1/auth/google');
};

exports.login = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'loggin successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'logged out',
    });
  } catch (error) {
    next(error);
  }
};
