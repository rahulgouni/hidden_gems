import { useState, useEffect } from 'react';
import './AllPosts.css';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts/all');
        const data = await res.json();

        if (res.ok) {
          setPosts(data);
        } else {
          setStatus(data.message || 'Failed to load posts');
        }
      } catch (err) {
        setStatus('Server error while fetching posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="all-posts-container">
      <h2>🌍 Explore Hidden Gems</h2>
      {status && <p className="status-msg">{status}</p>}
      <div className="post-list">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="post-image"
                />
              )}
              <div className="post-info">
                <h3>{post.title}</h3>
                <p><strong>Location:</strong> {post.location}</p>
                <p><strong>Category:</strong> {post.category}</p>
                <p><strong>Budget:</strong> £{post.budget}</p>
                <p className="post-snippet">{post.itinerary.slice(0, 100)}...</p>
                <p className="post-author">Posted by {post.author}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPosts;
