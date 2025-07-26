import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 🔁 Add Link for navigation
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login function from context

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes for email/password
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // store token

        if (typeof login === 'function') {
          login(data.user); // set user globally
        }

        setSuccess('Login successful!');
        navigate('/dashboard'); // 🔁 redirect immediately
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Your Account</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* 🔗 Register link below */}
      <p className="auth-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
