import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext/UserContext'; 
import { useAuth } from './contexts/useAuth';
import Login from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProfilePage from './components/pages/ProfilePage';
import UsersListPage from './components/pages/UsersListPage';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { state } = useAuth();
  return state.isAuthenticated && state.user?.role === 'admin' ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider> 
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/user-list" element={<AdminRoute><UsersListPage /></AdminRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
