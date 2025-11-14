import React from 'react';
import { Card } from 'react-bootstrap';
import { formatCurrencyVND } from '../utils/format';

export default function TotalCard({ total }) {
  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Card.Title className="text-muted text-uppercase small mb-2">
          Total of Expenses
        </Card.Title>
        <h4 className="mb-0">{formatCurrencyVND(total)}</h4>
      </Card.Body>
    </Card>
  );
}
