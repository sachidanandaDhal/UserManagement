import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000;
    return exp < now;
  } catch (err) {
    console.error('Error decoding token:', err);
    return true;
  }
};

const ProtectedRoute = ({ children, role }) => {
  const currentRole = localStorage.getItem('role'); // 'admin' or 'user'
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');

  let token;

  if (role === 'admin' && currentRole === 'admin') {
    token = adminToken;
  } else if (role === 'user' && currentRole === 'user') {
    token = userToken;
  }

  const isAuthorized = token && !isTokenExpired(token);

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
