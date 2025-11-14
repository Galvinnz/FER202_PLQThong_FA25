import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';
import TotalCard from '../components/TotalCard';
import FilterCard from '../components/FilterCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { useExpenses } from '../contexts/ExpenseContext';

export default function HomePage() {
  const {
    items,
    filteredExpenses,
    totalAmount,
    filterCategory,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilterCategory,
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState(null);

  // lấy danh sách category duy nhất để đổ vào dropdown
  const categories = useMemo(() => {
    const set = new Set();
    items.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return Array.from(set);
  }, [items]);

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddOrUpdate = async (expense) => {
    if (editingExpense) {
      await updateExpense({
        ...editingExpense,
        ...expense,
      });
      setEditingExpense(null);
    } else {
      await addExpense(expense);
    }
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="home-wrapper d-flex flex-column min-vh-100">
      <HeaderBar />

      <Container className="my-4 flex-grow-1">
        {loading && (
          <Alert variant="info">
            <Spinner size="sm" animation="border" className="me-2" />
            Loading expenses...
          </Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Hàng 1: Total + Filter */}
        <Row className="mb-3">
          <Col md={4}>
            <TotalCard total={totalAmount} />
          </Col>
          <Col md={4}>
            <FilterCard
              category={filterCategory}
              onChange={(value) => setFilterCategory(value)}
              categories={categories}
            />
          </Col>
        </Row>

        {/* Hàng 2: Form + Table */}
        <Row>
          <Col md={4}>
            <ExpenseForm
              onSubmit={handleAddOrUpdate}
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />
          </Col>
          <Col md={8}>
            <ExpenseTable
              expenses={filteredExpenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>

      <FooterBar />
    </div>
  );
}
