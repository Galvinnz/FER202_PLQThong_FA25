// PaymentTable.jsx - Component hiển thị danh sách payments dưới dạng bảng
import React, { useEffect, useState } from 'react';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

const PaymentTable = () => {
    const { payments, isLoading, error, fetchPayments, deletePayment } = usePayment();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPayments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewDetails = (paymentId) => {
        navigate(`/payments/view/${paymentId}`);
    };

    const handleEdit = (paymentId) => {
        navigate(`/payments/edit/${paymentId}`);
    };

    const handleDeleteClick = (paymentId) => {
        setSelectedPaymentId(paymentId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedPaymentId) {
            const result = await deletePayment(selectedPaymentId);
            if (result.success) {
                alert('Payment deleted successfully!');
            } else {
                alert(`Failed to delete payment: ${result.error}`);
            }
            setShowDeleteModal(false);
            setSelectedPaymentId(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedPaymentId(null);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    if (isLoading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading payments...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Payment Management</h2>
                <button 
                    onClick={() => navigate('/payments/add')}
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    + Add New Payment
                </button>
            </div>

            {payments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>No payments found.</div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Semester</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Course</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                <td style={{ padding: '12px' }}>{payment.id}</td>
                                <td style={{ padding: '12px' }}>{payment.semester}</td>
                                <td style={{ padding: '12px' }}>{payment.courseName}</td>
                                <td style={{ padding: '12px' }}>{formatCurrency(payment.amount)}</td>
                                <td style={{ padding: '12px' }}>{new Date(payment.date).toLocaleDateString('vi-VN')}</td>
                                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => handleViewDetails(payment.id)}
                                        style={{ padding: '6px 12px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleEdit(payment.id)}
                                        style={{ padding: '6px 12px', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(payment.id)}
                                        style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '90%' }}>
                        <h3 style={{ marginTop: 0 }}>Confirm Delete</h3>
                        <p>Are you sure you want to delete this payment?</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                            <button 
                                onClick={handleCancelDelete}
                                style={{ padding: '8px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmDelete}
                                style={{ padding: '8px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentTable;
