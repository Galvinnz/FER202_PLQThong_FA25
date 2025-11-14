// UserFilter.jsx - Component để lọc và tìm kiếm users
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const UserFilter = ({ filters, onFilterChange, onResetFilters }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="mb-4 p-3 bg-light rounded">
            <h5 className="mb-3">Filter Users</h5>
            <Form>
                <Row>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                name="search"
                                placeholder="Search by name or username..."
                                value={filters.search}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                value={filters.role}
                                onChange={handleInputChange}
                            >
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={filters.status}
                                onChange={handleInputChange}
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                                <option value="locked">Locked</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sort By</Form.Label>
                            <Form.Select
                                name="sortBy"
                                value={filters.sortBy}
                                onChange={handleInputChange}
                            >
                                <option value="id">ID</option>
                                <option value="username">Username</option>
                                <option value="fullName">Full Name</option>
                                <option value="role">Role</option>
                                <option value="status">Status</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="secondary" onClick={onResetFilters}>
                    Reset Filters
                </Button>
            </Form>
        </div>
    );
};

export default UserFilter;
