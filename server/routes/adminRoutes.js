const express = require('express');
const router = express.Router();
const {
  getStats,
  getAllUsers,
  getAllPosts,
  deleteUser,
  deletePost
} = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

router.get('/stats', auth, getStats);
router.get('/users', auth, getAllUsers);
router.get('/posts', auth, getAllPosts);
router.delete('/users/:id', auth, deleteUser);
router.delete('/posts/:id', auth, deletePost);

module.exports = router;
