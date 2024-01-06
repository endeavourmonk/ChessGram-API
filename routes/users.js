const express = require('express');

const {
  getAllUsers,
  getUser,
  updateUser,
  deactivateUser,
} = require('../controllers/users');
const { ensureAuthenticated } = require('../controllers/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, getAllUsers);
router
  .route('/:username')
  .get(getUser)
  .patch(updateUser)
  .delete(deactivateUser);

module.exports = router;
