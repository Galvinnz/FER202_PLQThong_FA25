// UserListPage.jsx - Trang quản lý danh sách users
import React, { useState, useEffect } from 'react';
import { Container, Alert, Modal, Button } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { getUsers } from '../services/api';
import { updateUser } from '../services/api';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: '',
        sortBy: 'id'
    });

    // Modal state
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showBanModal, setShowBanModal] = useState(false);
    const [userToBan, setUserToBan] = useState(null);

    // Fetch users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
            setFilteredUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters
    useEffect(() => {
        let result = [...users];

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchLower) ||
                    user.fullName.toLowerCase().includes(searchLower)
            );
        }

        // Role filter
        if (filters.role) {
            result = result.filter((user) => user.role === filters.role);
        }

        // Status filter
        if (filters.status) {
            result = result.filter((user) => user.status === filters.status);
        }

        // Sort
        result.sort((a, b) => {
            const aValue = a[filters.sortBy];
            const bValue = b[filters.sortBy];
            if (typeof aValue === 'string') {
                return aValue.localeCompare(bValue);
            }
            return aValue - bValue;
        });

        setFilteredUsers(result);
    }, [filters, users]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleResetFilters = () => {
        setFilters({
            search: '',
            role: '',
            status: '',
            sortBy: 'id'
        });
    };

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const handleBanAccount = (user) => {
        setUserToBan(user);
        setShowBanModal(true);
    };

    const confirmBanAccount = async () => {
        if (!userToBan) return;

        try {
            const newStatus = userToBan.status === 'blocked' ? 'active' : 'blocked';
            const updatedUser = { ...userToBan, status: newStatus };
            
            await updateUser(userToBan.id, updatedUser);
            
            // Update local state
            setUsers(users.map(u => u.id === userToBan.id ? updatedUser : u));
            setShowBanModal(false);
            setUserToBan(null);
        } catch (err) {
            setError('Failed to update user status. Please try again.');
            console.error(err);
        }
    };

    return (
        <>
            <NavigationHeader />
            <Container>
                <h2 className="mb-4">User Management</h2>

                {error && (
                    <Alert variant="danger" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <UserFilter
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onResetFilters={handleResetFilters}
                        />

                        <div className="mb-3">
                            <strong>Total Users: {filteredUsers.length}</strong>
                        </div>

                        <UserTable
                            users={filteredUsers}
                            onViewDetails={handleViewDetails}
                            onBanAccount={handleBanAccount}
                        />
                    </>
                )}

                {/* View Details Modal */}
                <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedUser && (
                            <div>
                                <p><strong>ID:</strong> {selectedUser.id}</p>
                                <p><strong>Username:</strong> {selectedUser.username}</p>
                                <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
                                <p><strong>Role:</strong> {selectedUser.role}</p>
                                <p><strong>Status:</strong> {selectedUser.status}</p>
                                <p><strong>Avatar:</strong></p>
                                <img
                                    src={selectedUser.avatar || 'https://via.placeholder.com/100'}
                                    alt={selectedUser.username}
                                    className="img-thumbnail"
                                    width={100}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/100';
                                    }}
                                />
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Ban/Unban Confirmation Modal */}
                <Modal show={showBanModal} onHide={() => setShowBanModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Action</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {userToBan && (
                            <p>
                                Are you sure you want to {userToBan.status === 'blocked' ? 'unblock' : 'ban'} user{' '}
                                <strong>{userToBan.username}</strong>?
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowBanModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant={userToBan?.status === 'blocked' ? 'success' : 'danger'}
                            onClick={confirmBanAccount}
                        >
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default UserListPage;
