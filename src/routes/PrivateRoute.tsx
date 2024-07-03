import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/useAuth';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
