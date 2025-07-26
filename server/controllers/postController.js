const db = require('../utils/db');

const createPost = async (req, res) => {
  const { title, location, category, budget, itinerary } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const [result] = await db.query(
      'INSERT INTO posts (user_id, title, location, category, budget, itinerary, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, title, location, category, budget, itinerary, image]
    );
    res.status(201).json({ message: 'Post created', postId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const [posts] = await db.query(`
      SELECT posts.*, users.name AS author
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
};


const getPostById = async (req, res) => {
  try {
    const [posts] = await db.query(
      'SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?',
      [req.params.id]
    );
    if (posts.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.json(posts[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post', error: err });
  }
};


const getUserPosts = async (req, res) => {
  try {
    const [posts] = await db.query(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user posts', error: err });
  }
};

const updatePost = async (req, res) => {
  const { title, location, category, budget, itinerary } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    // Only update image if a new one is uploaded
    const query = image
      ? 'UPDATE posts SET title=?, location=?, category=?, budget=?, itinerary=?, image=? WHERE id=? AND user_id=?'
      : 'UPDATE posts SET title=?, location=?, category=?, budget=?, itinerary=? WHERE id=? AND user_id=?';

    const values = image
      ? [title, location, category, budget, itinerary, image, req.params.id, req.user.id]
      : [title, location, category, budget, itinerary, req.params.id, req.user.id];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Post not found or not yours' });

    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
};

module.exports = {
  createPost, getAllPosts, getPostById, getUserPosts, updatePost
};




