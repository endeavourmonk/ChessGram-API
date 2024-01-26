const express = require('express');
const { validateChessId } = require('../controllers/chess');

const router = express.Router();

router.post('/validate-chessId', validateChessId);

module.exports = router;
