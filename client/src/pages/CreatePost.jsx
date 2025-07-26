import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    title: '',
    location: '',
    category: '',
    budget: '',
    itinerary: ''
  });
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please login to create a post.');
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('Post created successfully!');
        navigate('/');
      } else {
        setStatus(data.message || 'Something went wrong');
      }
    } catch (err) {
      setStatus('Error submitting post');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Share a Hidden Gem 🧭</h2>
      {status && <p className="status-msg">{status}</p>}
      <form onSubmit={handleSubmit} className="create-post-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category (e.g. Nature, Food)" onChange={handleChange} required />
        <input type="number" name="budget" placeholder="Budget (in GBP)" onChange={handleChange} required />
        <textarea name="itinerary" placeholder="Write your itinerary or experience..." rows={6} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
