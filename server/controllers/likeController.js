const db = require('../utils/db');

// GET like count + user liked status
const getLikes = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?.user_id;

  try {
    const [[{ count }]] = await db.query(
      'SELECT COUNT(*) AS count FROM likes WHERE post_id = ?',
      [postId]
    );

    let likedByUser = false;
    if (userId) {
      const [[like]] = await db.query(
        'SELECT * FROM likes WHERE user_id = ? AND post_id = ?',
        [userId, postId]
      );
      likedByUser = !!like;
    }

    res.json({ count, likedByUser });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching likes', error: err });
  }
};

// POST like a post
const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    await db.query(
      'INSERT IGNORE INTO likes (user_id, post_id) VALUES (?, ?)',
      [userId, postId]
    );
    res.json({ message: 'Post liked' });
  } catch (err) {
    res.status(500).json({ message: 'Error liking post', error: err });
  }
};

module.exports = { getLikes, likePost };
