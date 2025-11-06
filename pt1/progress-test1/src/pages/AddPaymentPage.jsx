// AddPaymentPage.jsx - Trang thêm/chỉnh sửa payment
import React, { useState, useEffect } from 'react';
import { usePayment } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddPaymentPage = () => {
    const { addPayment, updatePayment, getPaymentById, isLoading } = usePayment();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        userId: user?.id || '',
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            loadPaymentData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isEditMode]);

    const loadPaymentData = async () => {
        const result = await getPaymentById(id);
        if (result.success) {
            setFormData({
                userId: result.data.userId,
                semester: result.data.semester,
                courseName: result.data.courseName,
                amount: result.data.amount,
                date: result.data.date,
            });
        } else {
            alert('Failed to load payment data');
            navigate('/payments');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.semester.trim()) {
            newErrors.semester = 'Semester is required';
        }

        if (!formData.courseName.trim()) {
            newErrors.courseName = 'Course name is required';
        }

        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a positive number';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const paymentData = {
            ...formData,
            amount: parseFloat(formData.amount),
        };

        let result;
        if (isEditMode) {
            result = await updatePayment(id, paymentData);
        } else {
            result = await addPayment(paymentData);
        }

        if (result.success) {
            alert(`Payment ${isEditMode ? 'updated' : 'added'} successfully!`);
            navigate('/payments');
        } else {
            alert(`Failed to ${isEditMode ? 'update' : 'add'} payment: ${result.error}`);
        }
    };

    const handleCancel = () => {
        navigate('/payments');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ marginTop: 0, marginBottom: '30px', textAlign: 'center' }}>
                    {isEditMode ? 'Edit Payment' : 'Add New Payment'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Semester *</label>
                        <input
                            type="text"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            placeholder="e.g., Fall 2025"
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                        {errors.semester && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.semester}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Course Name *</label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            placeholder="e.g., Web Development"
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                        {errors.courseName && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.courseName}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Amount (VND) *</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="e.g., 3500000"
                            min="0"
                            step="1000"
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                        {errors.amount && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.amount}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Date *</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                        {errors.date && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.date}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '30px', justifyContent: 'flex-end' }}>
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            disabled={isLoading}
                            style={{ padding: '12px 30px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            style={{ padding: '12px 30px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                        >
                            {isLoading ? 'Saving...' : (isEditMode ? 'Update Payment' : 'Add Payment')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPaymentPage;
