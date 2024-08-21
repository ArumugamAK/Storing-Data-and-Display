import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Import the axios instance
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.get('/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axiosInstance.post('/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      console.log('Navigating to /profile'); // Should log if this line is reached
      navigate('/profile'); // Perform navigation here
      return res.data.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (data) => {
    const res = await axiosInstance.post('/api/auth/signup', data);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
