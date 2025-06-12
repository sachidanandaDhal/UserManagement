import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Choose token based on role (admin/user)
API.interceptors.request.use((req) => {
  // You can decide the logic based on your frontend state
  const currentRole = localStorage.getItem('role'); // "admin" or "user"

  let token = null;
  if (currentRole === 'admin') {
    token = localStorage.getItem('adminToken');
  } else if (currentRole === 'user') {
    token = localStorage.getItem('userToken');
  }

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
