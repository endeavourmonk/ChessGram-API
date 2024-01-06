const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, `A user can't be without email`],
  },
  name: {
    type: String,
    required: [true, `A user can't be without name`],
  },
  username: {
    type: String,
    unique: true,
    required: [true, `A user can't be without username`],
  },
  googleId: {
    type: String,
    unique: true,
  },
  chessdotcomUsername: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'moderator'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
