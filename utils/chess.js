const AppError = require('./appError');

exports.validateChessId = async (req, res, next) => {
  const { chessId, platform } = req.body;

  if (!(chessId && platform))
    return next(new AppError(400, 'Missing chess username or platform.'));

  const userProfile = await fetch(
    `https://api.chess.com/pub/player/${chessId}/stats`,
  ).then((data) => data.json());

  // console.log(userProfile);
  if (userProfile.code === 0) {
    return next(new AppError(404, `${chessId} not found on ${platform}`));
  }

  return next();
};
