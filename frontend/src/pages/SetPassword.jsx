import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function SetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
    let valid = true;

    // Validate new password
    if (!newPassword) {
      setPasswordError('Password is required');
      valid = false;
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        'Must include uppercase, lowercase, number, symbol, min 5 chars'
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmError('Confirm password is required');
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmError("Passwords don't match");
      valid = false;
    } else {
      setConfirmError('');
    }

    setIsValid(valid);
  }, [newPassword, confirmPassword]);

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

        {/* New Password */}
        
        <input
          type="password"
          placeholder="New Password"
          className={`w-full px-4 py-2 mb-2 border ${
            passwordError ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-red-400' : 'focus:ring-blue-500'}`}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {passwordError && <p className="text-sm text-red-500 mb-2">{passwordError}</p>}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className={`w-full px-4 py-2 mb-1 border ${
            confirmError ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-red-400' : 'focus:ring-blue-500'}`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmError && <p className="text-sm text-red-500 mb-4">{confirmError}</p>}

        <button
          className={`w-full py-2 rounded-md font-semibold text-white transition ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSetPassword}
          disabled={!isValid}
        >
          Set Password
        </button>
      </div>
    </div>
  );
}
