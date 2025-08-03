const db = require('../utils/db');

// GET all comments for a post
const getComments = async (req, res) => {
  const postId = req.params.id;
  try {
    const [comments] = await db.query(
      `SELECT c.comment_id, c.content, c.created_at, u.name AS author_name
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at ASC`,
      [postId]
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err });
  }
};

// POST a new comment
const addComment = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.user_id;
  const { content } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, userId, content]
    );

    const [[comment]] = await db.query(
      `SELECT c.comment_id, c.content, c.created_at, u.name AS author_name
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.comment_id = ?`,
      [result.insertId]
    );

    res.status(201).json({ message: 'Comment added', comment });
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err });
  }
};

module.exports = { getComments, addComment };
