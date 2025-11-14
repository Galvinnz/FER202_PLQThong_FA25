import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const emptyForm = {
  name: '',
  amount: '',
  category: '',
  date: '',
};

export default function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setForm({
        name: editingExpense.name || '',
        amount: editingExpense.amount || '',
        category: editingExpense.category || '',
        date: editingExpense.date || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingExpense]);

  const validate = () => {
    const newErr = {};
    if (!form.name.trim()) newErr.name = 'Name is required';
    if (!form.category.trim()) newErr.category = 'Category is required';

    const amount = Number(form.amount);
    if (!amount || amount <= 0) newErr.amount = 'Amount must be > 0';

    if (!form.date) newErr.date = 'Date is required';

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...editingExpense,
      ...form,
      amount: Number(form.amount),
    });

    if (!editingExpense) {
      setForm(emptyForm);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{editingExpense ? 'Edit Expense' : 'Add Expense'}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="submit" variant="primary" style={{ flex: 1 }}>
              {editingExpense ? 'Save changes' : 'Add expense'}
            </Button>
            {editingExpense && (
              <Button
                type="button"
                variant="secondary"
                style={{ flex: 1 }}
                onClick={onCancelEdit}
              >
                Cancel edit
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
