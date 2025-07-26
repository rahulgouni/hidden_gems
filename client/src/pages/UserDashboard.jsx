import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/posts/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name} 👋</h2>

      <div className="dashboard-header">
        <h3>Your Posts</h3>
        <Link to="/create" className="create-link">+ New Post</Link>
      </div>

      {posts.length === 0 ? (
        <p>You haven't posted anything yet.</p>
      ) : (
        <div className="user-posts">
          {posts.map((post) => (
            <div className="user-post-card" key={post.id}>
              <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
              <div>
                <h4>{post.title}</h4>
                <p>{post.location}</p>
                <p>💷 £{post.budget}</p>
                <Link to={`/edit/${post.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
