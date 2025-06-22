import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Move verifyUser outside useEffect
 const verifyUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get('http://localhost:5000/api/auth/verifyuser', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.user) {
        setUser(response.data.user);
      }
    } else {
      navigate('/login');
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    setUser(null);
    if (error.response && error.response.status === 401) {
      navigate('/login');
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

const logout = () => {
  setUser(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;