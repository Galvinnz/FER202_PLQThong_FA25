// src/features/payments/paymentsSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Async Thunk: tạo thanh toán mới (POST /payments trên JSON Server)
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, thunkAPI) => {
    try {
      // ✅ SỬA URL: gọi tới JSON Server port 3001
      const res = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      // Nếu API trả về 402 -> rejectWithValue với message custom
      if (res.status === 402) {
        return thunkAPI.rejectWithValue('Tài khoản không đủ tiền');
      }

      if (!res.ok) {
        return thunkAPI.rejectWithValue('Failed to create payment');
      }

      const data = await res.json();
      return data; // -> sẽ được thêm vào state.payments
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Network error');
    }
  }
);

const initialState = {
  payments: [],
  isLoading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    // có thể thêm reducers sync khác nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default paymentsSlice.reducer;

// ----- Selectors -----
export const selectPaymentsState = (state) => state.payments;

// Lấy ra các payment có status = 'SUCCESS'
export const selectSuccessfulPayments = createSelector(
  [selectPaymentsState],
  (paymentsState) =>
    paymentsState.payments.filter((p) => p.status === 'SUCCESS')
);
