import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/useAuth';

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { state } = useAuth();
  return state.isAuthenticated && state.user?.role === 'admin' ? children : <Navigate to="/login" />;
};

export default AdminRoute;
