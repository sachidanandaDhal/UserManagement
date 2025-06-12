import { useState } from 'react';
import API from '../services/api';

export default function AdminHome() {
  const [email, setEmail] = useState('');

  const createUser = async () => {
    try {
      await API.post('/admin/create-user', { email });
      alert('User created and email sent!');
      setEmail('');
    } catch (err) {
      console.error('Create user error:', err.response?.data || err.message);
      alert('Failed to create user');
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <input className="input" placeholder="User Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="btn mt-2" onClick={createUser}>Create User</button>
    </div>
  );
}
