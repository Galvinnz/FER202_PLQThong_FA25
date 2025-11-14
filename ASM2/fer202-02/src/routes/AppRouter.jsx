import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import HomePage from '../pages/HomePage';
import PrivateRoute from './PrivateRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      <Route path="*" element={<div className="p-4">404 Not Found</div>} />
    </Routes>
  );
}
