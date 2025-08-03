const db = require('../utils/db');

// GET: All Categories
const getAllCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err });
  }
};

module.exports = {
  getAllCategories
};
