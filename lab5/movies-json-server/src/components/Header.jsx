// src/components/Header.jsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthState();
  const { logout } = useAuthDispatch();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#" onClick={() => navigate('/movies')} style={{ cursor: 'pointer' }}>
          🎬 Movie Manager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={() => navigate('/movies')}>
              Quản lý Phim
            </Nav.Link>
            
            <NavDropdown 
              title={
                <span>
                  👤 {user.fullName || user.username}
                  {user.role === 'admin' && (
                    <Badge bg="warning" text="dark" className="ms-2">Admin</Badge>
                  )}
                </span>
              } 
              id="user-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item disabled>
                <small className="text-muted">Email: {user.email}</small>
              </NavDropdown.Item>
              <NavDropdown.Item disabled>
                <small className="text-muted">Role: {user.role}</small>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                🚪 Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

