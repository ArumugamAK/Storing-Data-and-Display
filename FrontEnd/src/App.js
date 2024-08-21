import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Component/Signin';
import Login from './Component/Login';
import Profile from './Component/Profile';
import AdminDashboard from './Component/AdminDashboard';
import AuthContext from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  const PrivateRoute = ({ children, adminRequired = false }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (adminRequired && user.email !== 'admin@email.com') {
      return <Navigate to="/profile" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={<PrivateRoute><Profile /></PrivateRoute>}
      />
      <Route
        path="/admin"
        element={<PrivateRoute adminRequired><AdminDashboard /></PrivateRoute>}
      />
    </Routes>
  );
}

export default App;
