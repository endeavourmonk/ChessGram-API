const express = require('express');
const { createRoom, joinRoom } = require('../controllers/room');
const { ensureAuthenticated } = require('../controllers/auth');

const router = express.Router();

router.post('/createroom', createRoom);
router.post('/joinroom', joinRoom);

module.exports = router;
