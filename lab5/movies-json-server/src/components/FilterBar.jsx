// src/components/FilterBar.jsx
import React from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

const FilterBar = ({ filters, onFilterChange, onClearFilters }) => {
  const { searchTerm, genreId, minDuration, maxDuration, sortBy, sortOrder } = filters;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="bg-light p-4 rounded shadow-sm mb-4">
      <h5 className="mb-3"> Tìm kiếm & Lọc phim</h5>
      
      <Row className="g-3">
        {/* Search Term */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tìm kiếm theo tên</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="searchTerm"
                placeholder="Nhập tên phim..."
                value={searchTerm}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        {/* Genre Filter */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Thể loại</Form.Label>
            <Form.Select
              name="genreId"
              value={genreId}
              onChange={handleChange}
            >
              <option value="">Tất cả thể loại</option>
              <option value="1">Sci-Fi</option>
              <option value="2">Comedy</option>
              <option value="3">Drama</option>
              <option value="4">Horror</option>
              <option value="5">Romance</option>
              <option value="6">Action</option>
              <option value="7">Thriller</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Duration Range */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Thời lượng tối thiểu (phút)</Form.Label>
            <Form.Control
              type="number"
              name="minDuration"
              placeholder="0"
              min="0"
              value={minDuration}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Thời lượng tối đa (phút)</Form.Label>
            <Form.Control
              type="number"
              name="maxDuration"
              placeholder="600"
              max="600"
              value={maxDuration}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        {/* Sort Options */}
        <Col md={4}>
          <Form.Group>
            <Form.Label>Sắp xếp theo</Form.Label>
            <Form.Select
              name="sortBy"
              value={sortBy}
              onChange={handleChange}
            >
              <option value="">Mặc định</option>
              <option value="title">Tên phim</option>
              <option value="year">Năm sản xuất</option>
              <option value="duration">Thời lượng</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Thứ tự</Form.Label>
            <Form.Select
              name="sortOrder"
              value={sortOrder}
              onChange={handleChange}
              disabled={!sortBy}
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Clear Filters Button */}
        <Col md={12} className="d-flex justify-content-end">
          <Button 
            variant="outline-secondary" 
            onClick={onClearFilters}
            size="sm"
          >
              Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;

