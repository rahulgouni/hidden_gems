const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getLikes, likePost } = require('../controllers/likeController');
const { getComments, addComment } = require('../controllers/commentController');

// Likes
router.get('/:id/likes', auth, getLikes);
router.post('/:id/like', auth, likePost);

// Comments
router.get('/:id/comments', getComments);
router.post('/:id/comments', auth, addComment);

module.exports = router;
