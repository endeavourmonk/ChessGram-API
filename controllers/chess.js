const ChessUsername = require('../models/chessUsernames');
const AppError = require('../utils/appError');

exports.saveChessId = async (req, res, next) => {
  try {
    const { chessId, platform } = req.body;
    if (!(chessId && platform))
      return next(new AppError(400, 'Missing chess username of platform.'));

    const data = await ChessUsername.create(req.body);
    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};
