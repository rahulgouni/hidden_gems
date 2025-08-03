import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);

  // Fetch post detail
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error('Error fetching post detail:', err));
  }, [id]);

  // Fetch likes and comments with token
  useEffect(() => {
    if (!token) return;

    fetch(`http://localhost:5000/api/posts/${id}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setLikes(data.count);
        setLiked(data.likedByUser);
      })
      .catch(err => console.error('Error fetching likes:', err));

    fetch(`http://localhost:5000/api/posts/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error('Error fetching comments:', err));
  }, [id, token]);

  // Handle Like
  const handleLike = async () => {
    if (!token) return alert('Please login to like this post');
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setLiked(true);
        setLikes(prev => prev + 1);
      } else {
        alert(data.message || 'Failed to like post');
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  // Handle Comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Please login to comment');
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment })
      });
      const data = await res.json();
      if (res.ok) {
        setComments([...comments, data.comment]);
        setNewComment('');
      } else {
        alert(data.message || 'Failed to post comment');
      }
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  if (!post) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div className="detail-container">
      <h2>{post.title}</h2>
      <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Budget:</strong> £{post.budget}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <p className="itinerary"><strong>Itinerary / Experience:</strong><br />{post.itinerary}</p>

      <div className="likes-section">
        <button onClick={handleLike} disabled={liked}>
          {liked ? 'Liked ❤️' : 'Like ❤️'}
        </button>
        <span>{likes} Likes</span>
      </div>

      <div className="comments-section">
        <h3>💬 Comments</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            required
          />
          <button type="submit">Post Comment</button>
        </form>

        <ul className="comment-list">
          {comments.map((comment, idx) => (
            <li key={idx}>
              <strong>{comment.author_name}:</strong> {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetail;
