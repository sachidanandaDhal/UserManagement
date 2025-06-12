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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Set New Password</h2>
        <input className="input" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button className="btn mt-4 w-full" onClick={handleSetPassword}>Set Password</button>
      </div>
    </div>
  );
}
