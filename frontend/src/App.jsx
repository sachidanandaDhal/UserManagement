import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import SetPassword from './pages/SetPassword';
import UserHome from './pages/UserHome';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* 🔐 Admin Protected Route */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute role="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route path="/set-password" element={<SetPassword />} />

        {/* 🔐 User Protected Route */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute role="user">
              <UserHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
