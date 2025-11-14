// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk: gọi API lấy danh sách users từ JSON Server
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      // ✅ SỬA URL: gọi tới JSON Server port 3001
      const res = await fetch('http://localhost:3001/users');

      if (!res.ok) {
        return thunkAPI.rejectWithValue('Failed to fetch users');
      }

      const data = await res.json();
      return data; // -> action.payload ở fulfilled
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Network error');
    }
  }
);

// initial state: { list: [], isLoading: false, error: null }
const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Thao tác cục bộ: Toggle Admin Status
    toggleAdminStatus(state, action) {
      const userId = action.payload;
      const user = state.list.find((u) => u.id === userId);
      if (user) {
        // Immer cho phép mutate trực tiếp
        user.isAdmin = !user.isAdmin;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // fulfilled
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      // rejected
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleAdminStatus } = usersSlice.actions;
export default usersSlice.reducer;
