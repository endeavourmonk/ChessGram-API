const express = require('express');
const {
  createWaitlist,
  joinWaitlist,
  getAllWaitlists,
} = require('../controllers/waitlist');
const { ensureAuthenticated } = require('../controllers/auth');

const router = express.Router();

router.get('/', getAllWaitlists);
router.post('/create-waitlist', createWaitlist);
router.post('/join-waitlist', joinWaitlist);

module.exports = router;
