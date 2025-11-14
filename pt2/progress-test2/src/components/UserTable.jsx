// UserTable.jsx - Component hiển thị danh sách users
import React from 'react';
import { Table, Button, Badge, Image } from 'react-bootstrap';
import { FaEye, FaBan } from 'react-icons/fa';

const UserTable = ({ users, onViewDetails, onBanAccount }) => {
    const getRoleBadge = (role) => {
        return role === 'admin' ? (
            <Badge bg="danger">Admin</Badge>
        ) : (
            <Badge bg="info">User</Badge>
        );
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { bg: 'success', text: 'Active' },
            blocked: { bg: 'danger', text: 'Blocked' },
            locked: { bg: 'warning', text: 'Locked' }
        };
        const config = statusConfig[status] || { bg: 'secondary', text: status };
        return <Badge bg={config.bg}>{config.text}</Badge>;
    };

    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center text-muted">
                                No users found
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <Image
                                        src={user.avatar || '/images/default-avatar.png'}
                                        alt={user.username}
                                        roundedCircle
                                        width={40}
                                        height={40}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/40';
                                        }}
                                    />
                                </td>
                                <td>{user.username}</td>
                                <td>{user.fullName}</td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>{getStatusBadge(user.status)}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onViewDetails(user)}
                                        title="View Details"
                                    >
                                        <FaEye /> View Details
                                    </Button>
                                    <Button
                                        variant={user.status === 'blocked' ? 'success' : 'danger'}
                                        size="sm"
                                        onClick={() => onBanAccount(user)}
                                        title={user.status === 'blocked' ? 'Unblock Account' : 'Block Account'}
                                    >
                                        <FaBan /> {user.status === 'blocked' ? 'Unblock' : 'Ban'}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;
