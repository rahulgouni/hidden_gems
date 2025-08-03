const db = require('../utils/db');

// GET: Admin Dashboard Stats
exports.getStats = async (req, res) => {
  try {
    const [[userCount]] = await db.query('SELECT COUNT(*) AS users FROM users');
    const [[postCount]] = await db.query('SELECT COUNT(*) AS posts FROM posts');
    res.json({ users: userCount.users, posts: postCount.posts });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err });
  }
};

// GET: All Users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err });
  }
};

// GET: All Posts (with author name)
exports.getAllPosts = async (req, res) => {
  try {
    const [posts] = await db.query(`
      SELECT posts.id, posts.title, users.name AS author_name, posts.created_at
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err });
  }
};


// DELETE: User by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err });
  }
};

// DELETE: Post by ID
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post', error: err });
  }
};
