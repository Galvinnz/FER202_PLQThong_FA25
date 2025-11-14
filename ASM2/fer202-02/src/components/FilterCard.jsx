import React from 'react';
import { Card, Form } from 'react-bootstrap';

export default function FilterCard({ category, onChange, categories = [] }) {
  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Card.Title className="text-muted text-uppercase small mb-2">
          Filter
        </Card.Title>
        <Form.Group>
          <Form.Label className="mb-1">Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
