const express = require('express');

const {
  getAllUsers,
  getUser,
  updateUser,
  deactivateUser,
} = require('../controllers/users');
const { ensureAuthenticated, restrictToRoles } = require('../controllers/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, restrictToRoles('admin'), getAllUsers);
// router.get('/', getAllUsers);
router
  .route('/:username')
  .get(getUser)
  .patch(updateUser)
  .delete(deactivateUser);

module.exports = router;
