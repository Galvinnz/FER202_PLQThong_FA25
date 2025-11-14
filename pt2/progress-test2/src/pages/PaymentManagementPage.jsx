// PaymentManagementPage.jsx - Trang quản lý payments
import React from 'react';
import PaymentTable from '../components/PaymentTable';

const PaymentManagementPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px 0' }}>
            <PaymentTable />
        </div>
    );
};

export default PaymentManagementPage;
