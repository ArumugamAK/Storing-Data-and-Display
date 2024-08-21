import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import your configured axios instance

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profile'); // Adjust the endpoint if needed
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch profile data.');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Last Login Date:</strong> {new Date(user.lastLoginDate).toLocaleDateString()}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Profile;
