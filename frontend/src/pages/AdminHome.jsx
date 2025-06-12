import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminHome() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Logged in as <span className="font-medium">Admin</span></span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New User</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
          <input
            type="email"
            placeholder="Enter user's email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={createUser}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Create User
        </button>
      </div>
    </div>
  );
}
