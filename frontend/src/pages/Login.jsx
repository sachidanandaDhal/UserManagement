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
        // Admin login
        const res = await API.post('/admin/login', { id: identifier, password });
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('role', 'admin');
        navigate('/admin/home');
      } else {
        // User login
        const res = await API.post('/user/login', { email: identifier, password });
        if (res.data.message === 'SET_PASSWORD') {
          sessionStorage.setItem('userId', res.data.userId);
          navigate('/set-password');
        } else {
          localStorage.setItem('userToken', res.data.token);
          localStorage.setItem('role', 'user');
          navigate('/user/home');
        }
      }
    } catch (err) {
        console.log(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          className="input"
          placeholder="Email or Admin ID"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          className="input mt-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn mt-4 w-full" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
}
