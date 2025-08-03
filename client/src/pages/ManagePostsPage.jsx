// src/pages/ManagePostsPage.js
import React, { useEffect, useState } from 'react';
import './ManagePostsPage.css';

const ManagePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setPosts(data);
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setPosts(posts.filter(post => post.post_id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (err) {
      console.error('Error deleting post', err);
    }
  };

  return (
    <div className="admin-posts-page">
      <h2>📝 Manage Posts</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author_name}</td>
              <td>{new Date(post.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePostsPage;
