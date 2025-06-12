import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      if (identifier === 'knox') {
        const res = await API.post('/admin/login', { id: identifier, password });
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('role', 'admin');
        navigate('/admin/home');
      } else {
        const res = await API.post('/user/login', { email: identifier, password });
        if (res.data.message === 'SET_PASSWORD') {
          sessionStorage.setItem('userId', res.data.userId);
          navigate('/set-password');
        } else {
          localStorage.setItem('userToken', res.data.token);
          localStorage.setItem('role', 'user');
          localStorage.setItem('userEmail', identifier);
          navigate('/user/home');
        }
      }
    } catch (err) {
      console.log(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email or ID</label>
          <input
            type="text"
            placeholder="Enter email or ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={loginHandler}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
