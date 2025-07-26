import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (err) {
        console.error('Failed to fetch user');
      }
    };

    fetchUser();
  }, [token]);

  // ✅ Define the login function
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
