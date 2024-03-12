const mongoose = require('mongoose');

const waitListSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, `A Waitlist cannot be without name.`],
  },
  createdBy: {
    type: String,
    required: [true, `Creator name required.`],
  },
  Participants: [
    {
      username: {
        type: String,
        unique: true,
        required: [true, `Cannot Join waitlist without username.`],
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  closed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: Date,
});

const WaitList = mongoose.model('WaitList', waitListSchema);

module.exports = WaitList;
