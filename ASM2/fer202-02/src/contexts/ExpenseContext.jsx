import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { EP, makeResource } from '../services/api';
import { useAuth } from './AuthContext';

const expenseAPI = makeResource(EP.EXPENSES);

const initialState = {
  items: [],
  loading: false,
  error: null,
  filterCategory: '',
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.items };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'ADD_SUCCESS':
      return { ...state, items: [...state.items, action.item] };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        items: state.items.map((e) =>
          e.id === action.item.id ? action.item : e
        ),
      };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        items: state.items.filter((e) => e.id !== action.id),
      };
    case 'SET_FILTER':
      return { ...state, filterCategory: action.value };
    default:
      return state;
  }
}

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { user } = useAuth();

  // Actions
  const fetchExpenses = async () => {
    if (!user?.id) return;
    dispatch({ type: 'FETCH_START' });
    try {
      const items = await expenseAPI.list({ userId: String(user.id) });
      dispatch({ type: 'FETCH_SUCCESS', items });
    } catch (err) {
      console.error(err);
      dispatch({ type: 'FETCH_ERROR', error: 'Failed to load expenses' });
    }
  };

  const addExpense = async (data) => {
    if (!user?.id) return;
    const payload = {
      ...data,
      userId: String(user.id),
    };
    const created = await expenseAPI.create(payload);
    dispatch({ type: 'ADD_SUCCESS', item: created });
  };

  const updateExpense = async (data) => {
    const id = data.id;
    const updated = await expenseAPI.update(id, data);
    dispatch({ type: 'UPDATE_SUCCESS', item: updated });
  };

  const deleteExpense = async (id) => {
    await expenseAPI.remove(id);
    dispatch({ type: 'DELETE_SUCCESS', id });
  };

  const setFilterCategory = (value) => {
    dispatch({ type: 'SET_FILTER', value });
  };

  // Derived values
  const filteredExpenses = useMemo(() => {
    const keyword = state.filterCategory.trim().toLowerCase();
    if (!keyword) return state.items;
    return state.items.filter((e) =>
      String(e.category || '').toLowerCase().includes(keyword)
    );
  }, [state.items, state.filterCategory]);

  const totalAmount = useMemo(
    () =>
      state.items.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
      ),
    [state.items]
  );

  const value = {
    items: state.items,
    loading: state.loading,
    error: state.error,
    filterCategory: state.filterCategory,
    filteredExpenses,
    totalAmount,

    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilterCategory,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) {
    throw new Error('useExpenses must be used within ExpenseProvider');
  }
  return ctx;
}
