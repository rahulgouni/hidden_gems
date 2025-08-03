const express = require('express');
const router = express.Router();
const {
  getAllCategories
} = require('../controllers/categoryController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAllCategories);

module.exports = router;
