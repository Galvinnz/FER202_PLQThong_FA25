// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 👇 THÊM CÁC IMPORT NÀY
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ExpenseProvider } from './contexts/ExpenseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
