
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { UserProvider } from './contexts/UserContext/UserContext';
import Login from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProfilePage from './components/pages/ProfilePage';
import UsersListPage from './components/pages/UsersListPage';
import ShowUserDetailPage from './components/pages/ShowUserDetailPage';
import Header from './components/commons/Header';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/user/:id" element={<PrivateRoute><ShowUserDetailPage /></PrivateRoute>} />
            <Route path="/user/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/user-list" element={<AdminRoute><UsersListPage /></AdminRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
