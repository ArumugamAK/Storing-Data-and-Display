import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Login Count</th>
            <th>Last Login Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.count}</td>
              <td>{new Date(user.lastLoginDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Chart users={users} />
    </div>
  );
};

export default AdminDashboard;
