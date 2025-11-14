import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  toggleAdminStatus,
} from '../features/users/usersSlice';

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Is Admin?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.username}</td>
            <td>{u.isAdmin ? 'YES' : 'NO'}</td>
            <td>
              <button onClick={() => dispatch(toggleAdminStatus(u.id))}>
                Toggle Admin
              </button>
            </td>
          </tr>
        ))}
        {list.length === 0 && (
          <tr>
            <td colSpan="4">No users</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
