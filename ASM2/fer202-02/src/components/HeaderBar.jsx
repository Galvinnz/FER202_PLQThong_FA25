import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function HeaderBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand>
           PersonalBudget
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <span className="text-light me-3">
            Signed in as <strong>{user?.fullName || user?.username}</strong>
          </span>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
