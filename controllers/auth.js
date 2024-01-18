const AppError = require('../utils/appError');

exports.ensureAuthenticated = (req, res, next) => {
  console.log('ensure authenticated: ', req.session);
  if (req.isAuthenticated()) {
    console.log('authenticated');
    return next();
    // eslint-disable-next-line no-else-return
  } else {
    console.log('not authenticated');
    res.redirect('/auth/google');
  }
};

exports.restrictToRoles =
  (...roles) =>
  (req, res, next) => {
    const hasPermission = roles.includes(req.user.role);
    if (hasPermission) next();
    else next(new AppError(400, `you don't have permission`));
  };

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        return next(destroyErr);
      }

      // Redirect to the desired route after successful logout
      res.redirect('/');
    });
  });
};
