const AppError = require('../utils/appError');

exports.createRoom = (req, res, next) => {
  const { room } = req.body;
  if (!room) next(new AppError(400, 'Please provide room details.'));
  next();
};

exports.joinRoom = (req, res, next) => {
  const { room } = req.body;
  if (!room) next(new AppError(400, 'Please provide room details.'));
  next();
};
