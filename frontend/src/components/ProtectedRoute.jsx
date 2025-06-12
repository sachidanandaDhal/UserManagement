import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const currentRole = localStorage.getItem('role'); // 'admin' or 'user'
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('userToken');

  const isAuthorized =
    (role === 'admin' && currentRole === 'admin' && adminToken) ||
    (role === 'user' && currentRole === 'user' && userToken);

  return isAuthorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
