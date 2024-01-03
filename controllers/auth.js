exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/auth/google');
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};
