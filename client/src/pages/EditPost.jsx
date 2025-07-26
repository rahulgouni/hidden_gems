import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreatePost.css';

const EditPost = () => {
  const { id } = useParams();
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

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title,
          location: data.location,
          category: data.category,
          budget: data.budget,
          itinerary: data.itinerary
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append('image', image);

    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Post updated!');
      navigate('/dashboard');
    } else {
      setStatus(data.message || 'Update failed');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Edit Your Hidden Gem</h2>
      {status && <p className="status-msg">{status}</p>}
      <form onSubmit={handleSubmit} className="create-post-form">
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
        <input type="text" name="location" value={form.location} onChange={handleChange} required />
        <input type="text" name="category" value={form.category} onChange={handleChange} required />
        <input type="number" name="budget" value={form.budget} onChange={handleChange} required />
        <textarea name="itinerary" value={form.itinerary} rows={6} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
