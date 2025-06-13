import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminHome() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  // Email validation function
 const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/;

  if (!value) {
    setEmailError('Email is required');
    return false;
  } else if (!emailRegex.test(value)) {
    setEmailError('Only @gmail.com, @yahoo.com, or @outlook.com emails are allowed');
    return false;
  } else {
    setEmailError('');
    return true;
  }
};


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const createUser = async () => {
    if (!validateEmail(email)) return;

    try {
      await API.post('/admin/create-user', { email });
      alert('User created and email sent!');
      setEmail('');
      setEmailError('');
    } catch (err) {
      console.error('Create user error:', err.response?.data || err.message);
      alert('Failed to create user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');  
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
            className={`w-full px-4 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-400' : 'focus:ring-blue-500'}`}
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
        </div>

        <button
          onClick={createUser}
          disabled={!email || emailError}
          className={`w-full py-2 rounded-md font-semibold transition duration-200 ${
            !email || emailError
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Create User
        </button>
      </div>
    </div>
  );
}
