const express = require('express');

const { saveChessId } = require('../controllers/chess');
const { validateChessId } = require('../utils/chess');

const router = express.Router();

router.post('/save-chessId', validateChessId, saveChessId);

module.exports = router;
