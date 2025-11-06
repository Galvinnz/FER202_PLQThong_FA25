// src/contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import authAPI from '../api/auth';

// Initial state
const initialAuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Create contexts
const AuthStateContext = createContext(initialAuthState);
const AuthDispatchContext = createContext(null);

// Custom hooks
export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const result = await authAPI.login(username, password);
      
      if (result.success) {
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Update state
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
        return { success: true };
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: result.error });
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMsg = 'Lỗi kết nối đến server';
      console.error('Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMsg });
      return { success: false, error: errorMsg };
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const dispatchValue = {
    dispatch,
    login,
    logout,
    clearError,
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

