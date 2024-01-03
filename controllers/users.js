const User = require('../models/users');

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
