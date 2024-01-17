exports.ensureAuthenticated = (req, res, next) => {
  console.log(req);
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
    else next('not have permission');
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
