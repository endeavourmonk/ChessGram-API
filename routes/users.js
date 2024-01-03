const express = require('express');

const { getAllUsers } = require('../controllers/users');
const { ensureAuthenticated } = require('../controllers/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, getAllUsers);

module.exports = router;
