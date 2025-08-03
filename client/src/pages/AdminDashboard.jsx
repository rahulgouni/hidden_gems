import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (err) {
        console.error('Error fetching stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard</h2>
      <div className="admin-stats">
        <div
          className="stat-box clickable"
          onClick={() => navigate('/admin/users')}
        >
          Total Users: {stats.users}
        </div>
        <div
          className="stat-box clickable"
          onClick={() => navigate('/admin/posts')}
        >
          Total Posts: {stats.posts}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
