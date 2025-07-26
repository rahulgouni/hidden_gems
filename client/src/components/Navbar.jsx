import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">🌍 Hidden Gems</Link>
      </div>
      <ul className="navbar-right">
        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/create">Create Post</Link></li>
            <li className="greeting">Hi, {user.name.split(' ')[0]}</li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
