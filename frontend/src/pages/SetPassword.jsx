import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function SetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  const handleSetPassword = async () => {
    try {
      await API.post('/user/set-password', { userId, newPassword });
      alert('Password set successfully!');
      sessionStorage.removeItem('userId');
      navigate('/');
    } catch {
      alert('Failed to set password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-green-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Set New Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
          onClick={handleSetPassword}
        >
          Set Password
        </button>
      </div>
    </div>
  );
}
