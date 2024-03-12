const WaitList = require('../models/waitingList');
const AppError = require('../utils/appError');

exports.getAllWaitlists = async (req, res, next) => {
  try {
    const waitLists = await WaitList.find({});
    res.status(200).json({
      status: 'success',
      results: waitLists.length,
      data: {
        waitLists,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getWaitlist = (req, res, next) => {
  const { id } = req.body;

  if (!id) next(new AppError(400, 'Please provide waitList Id.'));
  res.status(200).json({
    status: 'joined room',
  });
};

exports.createWaitlist = (req, res, next) => {
  const { roomId } = req.body;
  if (!roomId) next(new AppError(400, 'Please provide room details.'));
  next();
};

exports.joinWaitlist = (req, res, next) => {
  const { roomId } = req.body;
  console.log('room: ', roomId);
  if (!roomId) next(new AppError(400, 'Please provide room details.'));
  res.status(200).json({
    status: 'joined room',
  });
};

exports.leaveWaitlist = (req, res, next) => {
  const { roomId } = req.body;
  console.log('room: ', roomId);
  if (!roomId) next(new AppError(400, 'Please provide room details.'));
  res.status(200).json({
    status: 'joined room',
  });
};
