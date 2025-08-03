import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  useEffect(() => {
  fetch('http://localhost:5000/api/posts/all')
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('Expected array but got:', data);
        setPosts([]);
      }
    })
    .catch((err) => {
      console.error('Fetch failed:', err);
      setPosts([]);
    });
}, []);


  useEffect(() => {
    let temp = [...posts];

    if (search) {
      const term = search.toLowerCase();
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term)
      );
    }

    if (category) {
      temp = temp.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (maxBudget) {
      temp = temp.filter((p) => parseFloat(p.budget) <= parseFloat(maxBudget));
    }

    setFiltered(temp);
  }, [search, category, maxBudget, posts]);

  return (
    <div className="home-container">
      <h2>Explore Hidden Gems 🗺️</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Nature">Nature</option>
          <option value="Food">Food</option>
          <option value="Culture">Culture</option>
        </select>

        <input
          type="number"
          placeholder="Max Budget (£)"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />
      </div>

      <div className="post-grid">
        {filtered.length > 0 ? (
          filtered.map((post) => (
            <div className="post-card" key={post.id}>
              <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
              <h3>{post.title}</h3>
              <p><strong>{post.location}</strong></p>
              <p>💷 Budget: £{post.budget}</p>
              <Link to={`/posts/${post.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No matching results found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
