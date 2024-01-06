const User = require('../models/users');
const AppError = require('../utils/appError');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: '✅ success',
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return next(new AppError(404, `No User found with id: ${username}`));
    }
    res.status(200).json({
      message: `User found`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const { username } = req.params;
    res.status(404).json({
      message: `No user exist with username: ${username}`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.deactivateUser = (req, res, next) => {
  try {
    const { username } = req.params;
    res.status(404).json({
      message: `No user exist with username: ${username}`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
