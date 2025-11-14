// ViewPaymentDetailsPage.jsx - Trang xem chi tiết payment
import React, { useEffect, useState } from 'react';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate, useParams } from 'react-router-dom';

const ViewPaymentDetailsPage = () => {
    const { getPaymentById, isLoading, error } = usePayment();
    const { id } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        loadPaymentDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const loadPaymentDetails = async () => {
        const result = await getPaymentById(id);
        if (result.success) {
            setPayment(result.data);
        } else {
            alert('Failed to load payment details');
            navigate('/payments');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        navigate(`/payments/edit/${id}`);
    };

    const handleBack = () => {
        navigate('/payments');
    };

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '16px' }}>
                Loading payment details...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '16px', color: '#dc3545' }}>
                Error: {error}
            </div>
        );
    }

    if (!payment) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '16px' }}>
                Payment not found.
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '24px' }}>Payment Details</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            onClick={handleEdit}
                            style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                            Edit
                        </button>
                        <button 
                            onClick={handleBack}
                            style={{ padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                            Back to List
                        </button>
                    </div>
                </div>

                <div style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid #e0e0e0' }}>
                        <div style={{ flex: '0 0 200px', fontWeight: '600', color: '#666', fontSize: '14px' }}>Payment ID</div>
                        <div style={{ flex: 1, color: '#333', fontSize: '16px' }}>{payment.id}</div>
                    </div>

                    <div style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid #e0e0e0' }}>
                        <div style={{ flex: '0 0 200px', fontWeight: '600', color: '#666', fontSize: '14px' }}>User ID</div>
                        <div style={{ flex: 1, color: '#333', fontSize: '16px' }}>{payment.userId}</div>
                    </div>

                    <div style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid #e0e0e0' }}>
                        <div style={{ flex: '0 0 200px', fontWeight: '600', color: '#666', fontSize: '14px' }}>Semester</div>
                        <div style={{ flex: 1, color: '#333', fontSize: '16px' }}>{payment.semester}</div>
                    </div>

                    <div style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid #e0e0e0' }}>
                        <div style={{ flex: '0 0 200px', fontWeight: '600', color: '#666', fontSize: '14px' }}>Course Name</div>
                        <div style={{ flex: 1, color: '#333', fontSize: '16px' }}>{payment.courseName}</div>
                    </div>

                    <div style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid #e0e0e0' }}>
                        <div style={{ flex: '0 0 200px', fontWeight: '600', color: '#666', fontSize: '14px' }}>Amount</div>
                        <div style={{ flex: 1, color: '#28a745', fontSize: '18px', fontWeight: '700' }}>{formatCurrency(payment.amount)}</div>
                    </div>

                    <div style={{ display: 'flex', padding: '20px 0' }}>
                        <div style={{ flex: '0 0 200px', fontWeight: '600', color: '#666', fontSize: '14px' }}>Payment Date</div>
                        <div style={{ flex: 1, color: '#333', fontSize: '16px' }}>{formatDate(payment.date)}</div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#f8f9fa', padding: '20px 30px', borderTop: '1px solid #e0e0e0' }}>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                        This is a detailed view of the payment record. 
                        Click "Edit" to modify the information or "Back to List" to return to the payment list.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewPaymentDetailsPage;
