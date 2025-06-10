import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>You're not logged in.</p>
      )}
    </div>
  );
};

export default Dashboard;
