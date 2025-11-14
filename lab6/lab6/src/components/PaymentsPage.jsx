import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPayment,
  selectSuccessfulPayments,
} from '../features/payments/paymentsSlice';

export default function PaymentsPage() {
  const dispatch = useDispatch();
  const { payments, isLoading, error } = useSelector(
    (state) => state.payments
  );
  const successfulPayments = useSelector(selectSuccessfulPayments);

  const [form, setForm] = useState({
    amount: '',
    status: 'PENDING',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPayment({
        amount: Number(form.amount),
        status: form.status,
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <div>
          <label>
            Amount:{' '}
            <input
              type="number"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Status:{' '}
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="FAILED">FAILED</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          Create Payment
        </button>
      </form>

      {isLoading && <p>Đang tạo thanh toán...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>All Payments</h3>
      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            #{p.id} - {p.amount} - {p.status}
          </li>
        ))}
        {payments.length === 0 && <li>No payments</li>}
      </ul>

      <h3>Successful Payments</h3>
      <ul>
        {successfulPayments.map((p) => (
          <li key={p.id}>
            #{p.id} - {p.amount} - {p.status}
          </li>
        ))}
        {successfulPayments.length === 0 && <li>No SUCCESS payments</li>}
      </ul>
    </div>
  );
}
