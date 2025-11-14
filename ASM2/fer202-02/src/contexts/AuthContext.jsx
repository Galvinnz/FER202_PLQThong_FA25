import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { findAccount } from '../services/api';

const initialAuthState = {
  user: null,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.user, error: null };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'LOGOUT':
      return { ...state, user: null, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOAD_FROM_STORAGE':
      return { ...state, user: action.user || null };
    default:
      return state;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_FROM_STORAGE', user: parsed });
      }
    } catch (e) {
      console.error('LOAD_FROM_STORAGE error:', e);
    }
  }, []);

  const login = async ({ identifier, usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const acc = await findAccount({ identifier, usernameOrEmail, password });
      if (!acc) {
        dispatch({
          type: 'LOGIN_ERROR',
          error: 'Invalid username/email or password!',
        });
        return { success: false };
      }
      dispatch({ type: 'LOGIN_SUCCESS', user: acc });
      localStorage.setItem('auth_user', JSON.stringify(acc));
      return { success: true, user: acc };
    } catch (err) {
      console.error('login error:', err);
      dispatch({
        type: 'LOGIN_ERROR',
        error: 'Login failed, please try again later.',
      });
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
