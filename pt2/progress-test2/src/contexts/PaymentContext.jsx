// PaymentContext.jsx - Quản lý thanh toán với CRUD operations
import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const PaymentContext = createContext();

// 2. Khai báo Initial State
const initialPaymentState = {
    payments: [],
    currentPayment: null,
    isLoading: false,
    error: null,
};

// 3. Reducer để quản lý các actions
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PAYMENTS_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_PAYMENTS_SUCCESS':
            return { ...state, isLoading: false, payments: action.payload, error: null };
        case 'FETCH_PAYMENTS_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        
        case 'SET_CURRENT_PAYMENT':
            return { ...state, currentPayment: action.payload };
        
        case 'ADD_PAYMENT_START':
            return { ...state, isLoading: true, error: null };
        case 'ADD_PAYMENT_SUCCESS':
            return { 
                ...state, 
                isLoading: false, 
                payments: [...state.payments, action.payload],
                error: null 
            };
        case 'ADD_PAYMENT_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        
        case 'UPDATE_PAYMENT_START':
            return { ...state, isLoading: true, error: null };
        case 'UPDATE_PAYMENT_SUCCESS':
            return {
                ...state,
                isLoading: false,
                payments: state.payments.map(payment => 
                    payment.id === action.payload.id ? action.payload : payment
                ),
                currentPayment: action.payload,
                error: null
            };
        case 'UPDATE_PAYMENT_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        
        case 'DELETE_PAYMENT_START':
            return { ...state, isLoading: true, error: null };
        case 'DELETE_PAYMENT_SUCCESS':
            return {
                ...state,
                isLoading: false,
                payments: state.payments.filter(payment => payment.id !== action.payload),
                error: null
            };
        case 'DELETE_PAYMENT_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        
        default:
            return state;
    }
};

// 4. PaymentProvider
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

    // Fetch all payments
    const fetchPayments = async (userId = null) => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        try {
            const payments = await api.getPayments(userId);
            dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: payments });
            return { success: true, data: payments };
        } catch (error) {
            const errorMessage = error.message || 'Failed to fetch payments';
            dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    // Get payment by ID
    const getPaymentById = async (id) => {
        try {
            const payment = await api.getPaymentById(id);
            dispatch({ type: 'SET_CURRENT_PAYMENT', payload: payment });
            return { success: true, data: payment };
        } catch (error) {
            const errorMessage = error.message || 'Failed to fetch payment details';
            dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    // Add new payment
    const addPayment = async (paymentData) => {
        dispatch({ type: 'ADD_PAYMENT_START' });
        try {
            const newPayment = await api.createPayment(paymentData);
            dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: newPayment });
            return { success: true, data: newPayment };
        } catch (error) {
            const errorMessage = error.message || 'Failed to add payment';
            dispatch({ type: 'ADD_PAYMENT_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    // Update payment
    const updatePayment = async (id, paymentData) => {
        dispatch({ type: 'UPDATE_PAYMENT_START' });
        try {
            const updatedPayment = await api.updatePayment(id, paymentData);
            dispatch({ type: 'UPDATE_PAYMENT_SUCCESS', payload: updatedPayment });
            return { success: true, data: updatedPayment };
        } catch (error) {
            const errorMessage = error.message || 'Failed to update payment';
            dispatch({ type: 'UPDATE_PAYMENT_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        dispatch({ type: 'DELETE_PAYMENT_START' });
        try {
            await api.deletePayment(id);
            dispatch({ type: 'DELETE_PAYMENT_SUCCESS', payload: id });
            return { success: true };
        } catch (error) {
            const errorMessage = error.message || 'Failed to delete payment';
            dispatch({ type: 'DELETE_PAYMENT_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Set current payment (for viewing/editing)
    const setCurrentPayment = (payment) => {
        dispatch({ type: 'SET_CURRENT_PAYMENT', payload: payment });
    };

    const contextValue = {
        payments: state.payments,
        currentPayment: state.currentPayment,
        isLoading: state.isLoading,
        error: state.error,
        fetchPayments,
        getPaymentById,
        addPayment,
        updatePayment,
        deletePayment,
        clearError,
        setCurrentPayment,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

// 5. Custom hook
export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
};
