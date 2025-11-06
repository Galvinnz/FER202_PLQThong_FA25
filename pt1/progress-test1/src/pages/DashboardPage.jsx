import React, { useEffect } from 'react';
import { Container, Card, Button, Table, Spinner, Alert } from 'react-bootstrap'; 
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { payments, isLoading, error, fetchPayments, deletePayment } = usePayment();
    const [filteredPayments, setFilteredPayments] = React.useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchPayments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilteredPayments(payments);
    }, [payments]);

    const handleFilterChange = (filtered) => {
        setFilteredPayments(filtered);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const handleViewDetails = (paymentId) => {
        navigate(`/payments/view/${paymentId}`);
    };

    const handleEdit = (paymentId) => {
        navigate(`/payments/edit/${paymentId}`);
    };

    const handleDelete = async (paymentId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa payment này?')) {
            const result = await deletePayment(paymentId);
            if (result.success) {
                alert('Xóa payment thành công!');
                fetchPayments();
            } else {
                alert(`Lỗi: ${result.error}`);
            }
        }
    };

    const handleAddPayment = () => {
        navigate('/payments/add');
    };
      
    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content (Grid và Card), viết code các components khác tại đây */}
            <FilterBar onFilterChange={handleFilterChange} />
            
            <Container className="mt-4">
                {/* Dashboard Overview - Payment Management */}
                <Card className="shadow-sm">
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            Payment Management 
                            <span className="badge bg-light text-dark ms-2">
                                {filteredPayments.length} / {payments.length}
                            </span>
                        </h5>
                        <Button 
                            variant="success" 
                            size="sm"
                            onClick={handleAddPayment}
                        >
                            + Add New Payment
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {isLoading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-3 text-muted">Loading payments...</p>
                            </div>
                        ) : error ? (
                            <Alert variant="danger">
                                <strong>Error:</strong> {error}
                            </Alert>
                        ) : filteredPayments.length === 0 ? (
                            <Alert variant="info">
                                {payments.length === 0 
                                    ? 'No payments found.' 
                                    : 'No payments match your filter criteria.'}
                            </Alert>
                        ) : (
                            <Table striped bordered hover responsive className="mb-0">
                                <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th>Semester</th>
                                        <th>Course</th>
                                        <th className="text-end">Amount</th>
                                        <th className="text-center">Date</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="text-center">{payment.id}</td>
                                            <td>{payment.semester}</td>
                                            <td>{payment.courseName}</td>
                                            <td className="text-end text-success fw-bold">
                                                {formatCurrency(payment.amount)}
                                            </td>
                                            <td className="text-center">{formatDate(payment.date)}</td>
                                            <td className="text-center">
                                                <div className="d-flex gap-1 justify-content-center">
                                                    <Button 
                                                        variant="info" 
                                                        size="sm"
                                                        onClick={() => handleViewDetails(payment.id)}
                                                    >
                                                        View Details
                                                    </Button>
                                                    <Button 
                                                        variant="warning" 
                                                        size="sm"
                                                        onClick={() => handleEdit(payment.id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        size="sm"
                                                        onClick={() => handleDelete(payment.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default DashboardPage;
