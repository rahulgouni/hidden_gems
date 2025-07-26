import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import UserDashboard from './pages/UserDashboard';
import EditPost from './pages/EditPost';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        
        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
