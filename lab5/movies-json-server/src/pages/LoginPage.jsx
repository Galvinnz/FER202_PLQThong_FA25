// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAuthState();
  const { login, clearError } = useAuthDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const [validated, setValidated] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/movies', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const form = e.currentTarget;
    setValidated(true);
    
    if (form.checkValidity() === false) {
      return;
    }

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/movies');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h2 className="mb-2">🎬 Movie Manager</h2>
            <p className="text-muted">Đăng nhập để quản lý phim</p>
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={clearError}>
              {error}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên đăng nhập
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </Form>

          <div className="mt-4 p-3 bg-light rounded">
            <small className="text-muted d-block mb-2"><strong>Tài khoản demo:</strong></small>
            <small className="text-muted d-block">👤 admin / admin123</small>
            <small className="text-muted d-block">👤 user / user123</small>
            <small className="text-muted d-block">👤 demo / demo123</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;

