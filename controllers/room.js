const AppError = require('../utils/appError');

exports.createRoom = (req, res, next) => {
  const { roomId } = req.body;
  if (!roomId) next(new AppError(400, 'Please provide room details.'));
  next();
};

exports.joinRoom = (req, res, next) => {
  const { roomId } = req.body;
  console.log('room: ', roomId);
  if (!roomId) next(new AppError(400, 'Please provide room details.'));
  res.status(200).json({
    status: 'joined room',
  });
};
