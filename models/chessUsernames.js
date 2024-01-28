const mongoose = require('mongoose');

const chessUsernameSchema = new mongoose.Schema({
  chessId: {
    type: String,
    unique: true,
    required: [true, `A user can't be without username`],
  },
  platform: {
    type: String,
    enum: ['lichess', 'chessdotcom'],
  },
});

const ChessUsername = mongoose.model('ChessUsername', chessUsernameSchema);

module.exports = ChessUsername;
