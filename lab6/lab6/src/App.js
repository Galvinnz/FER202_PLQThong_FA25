import React from 'react';
import UsersPage from './components/UsersPage';
import PaymentsPage from './components/PaymentsPage';

export default function App() {
  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Lab 6 : Bài 6 Demo</h1>

      <section style={{ marginTop: 24 }}>
        <h2>Users Management</h2>
        <UsersPage />
      </section>

      <hr />

      <section style={{ marginTop: 24 }}>
        <h2>Payments Management</h2>
        <PaymentsPage />
      </section>
    </div>
  );
}
