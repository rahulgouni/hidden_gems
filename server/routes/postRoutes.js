const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, getUserPosts, updatePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', auth, upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/user/me', auth, getUserPosts);
router.put('/:id', auth, upload.single('image'), updatePost);

module.exports = router;
