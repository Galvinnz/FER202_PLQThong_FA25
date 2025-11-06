// src/routes/Route.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

