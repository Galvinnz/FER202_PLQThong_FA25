// src/contexts/MovieContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useCallback, useState, useMemo } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import moviesAPI from '../api/movies';

// Contexts
export const MovieStateContext = createContext(initialMovieState); 
export const MovieDispatchContext = createContext(null);          

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// MovieProvider Component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);
  
  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: '',
    genreId: '',
    minDuration: '',
    maxDuration: '',
    sortBy: '',
    sortOrder: 'asc'
  });

  // Hàm READ: Tải lại dữ liệu (Axios GET)
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await moviesAPI.getAllMovies();
      dispatch({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
      console.error("Lỗi khi tải danh sách phim:", error);
      dispatch({ type: 'SET_MOVIES', payload: [] }); 
    }
  }, []);

  // Hàm fetch genres từ API
  const fetchGenres = useCallback(async () => {
    try {
      const response = await moviesAPI.getAllGenres();
      dispatch({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
      console.error("Lỗi khi tải danh sách thể loại:", error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);
  
  // Hàm DELETE: Xóa phim
  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });

    try {
      await moviesAPI.deleteMovie(id);
      fetchMovies();
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      fetchMovies();
    }
  }, [fetchMovies]);

  // Hàm CREATE/UPDATE: Xử lý POST và PUT
  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    
    try {
      if (isEditing) {
        await moviesAPI.updateMovie(isEditingId, dataToSend);
      } else {
        await moviesAPI.createMovie(dataToSend);
      }
      
      dispatch({ type: 'RESET_FORM' }); 
      fetchMovies(); 
      return true;
    } catch (error) {
      console.error("Lỗi thao tác CREATE/UPDATE:", error);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    let result = [...state.movies];

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchLower)
      );
    }

    // Filter by genre
    if (filters.genreId) {
      result = result.filter(movie => 
        movie.genreId === parseInt(filters.genreId)
      );
    }

    // Filter by duration range
    if (filters.minDuration) {
      result = result.filter(movie => 
        movie.duration >= parseInt(filters.minDuration)
      );
    }
    if (filters.maxDuration) {
      result = result.filter(movie => 
        movie.duration <= parseInt(filters.maxDuration)
      );
    }

    // Sort
    if (filters.sortBy) {
      result.sort((a, b) => {
        let aVal = a[filters.sortBy];
        let bVal = b[filters.sortBy];

        // For string comparison (title)
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (filters.sortOrder === 'asc') {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }

    return result;
  }, [state.movies, filters]);

  // Handle filter change
  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      genreId: '',
      minDuration: '',
      maxDuration: '',
      sortBy: '',
      sortOrder: 'asc'
    });
  }, []);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  // Enhanced state with filtered movies
  const enhancedState = {
    ...state,
    filteredMovies: filteredAndSortedMovies,
    filters
  };

  // Giá trị của Dispatch Context
  const dispatchValue = {
      dispatch, 
      fetchMovies,
      fetchGenres,
      confirmDelete,
      handleCreateOrUpdate,
      handleFilterChange,
      clearFilters
  };

  return (
    <MovieStateContext.Provider value={enhancedState}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
