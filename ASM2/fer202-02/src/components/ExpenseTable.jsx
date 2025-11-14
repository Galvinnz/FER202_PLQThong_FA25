import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { formatCurrencyVND, formatDateDisplay } from '../utils/format';

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Expense Management</Card.Title>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{formatCurrencyVND(e.amount)}</td>
                <td>{e.category}</td>
                <td>{formatDateDisplay(e.date)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(e)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(e.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No expenses
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
