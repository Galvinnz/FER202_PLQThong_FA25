import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const FilterBar = ({ onFilterChange }) => {
    const { payments } = usePayment();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [sortBy, setSortBy] = useState('date_desc');

    // Lấy danh sách unique semesters và courses
    const uniqueSemesters = [...new Set(payments.map(p => p.semester))];
    const uniqueCourses = [...new Set(payments.map(p => p.courseName))];

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, selectedSemester, selectedCourse, sortBy, payments]);

    const applyFilters = () => {
        let filtered = [...payments];

        // Tìm kiếm theo semester hoặc course name
        if (searchTerm) {
            filtered = filtered.filter(payment => 
                payment.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.courseName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo semester
        if (selectedSemester) {
            filtered = filtered.filter(payment => payment.semester === selectedSemester);
        }

        // Lọc theo course
        if (selectedCourse) {
            filtered = filtered.filter(payment => payment.courseName === selectedCourse);
        }

        // Sắp xếp
        switch (sortBy) {
            case 'course_asc':
                filtered.sort((a, b) => a.courseName.localeCompare(b.courseName));
                break;
            case 'course_desc':
                filtered.sort((a, b) => b.courseName.localeCompare(a.courseName));
                break;
            case 'date_asc':
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'date_desc':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'amount_asc':
                filtered.sort((a, b) => a.amount - b.amount);
                break;
            case 'amount_desc':
                filtered.sort((a, b) => b.amount - a.amount);
                break;
            default:
                break;
        }

        if (onFilterChange) {
            onFilterChange(filtered);
        }
    };
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by semester or course name  */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by semester or course name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Semester  */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Semester</Form.Label>
                                <Form.Select
                                    value={selectedSemester}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                >
                                    <option value="">All Semesters</option>
                                    {uniqueSemesters.map((semester, index) => (
                                        <option key={index} value={semester}>
                                            {semester}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Filter by Course name */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Course</Form.Label>
                                <Form.Select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    <option value="">All Courses</option>
                                    {uniqueCourses.map((course, index) => (
                                        <option key={index} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="course_asc">Course name ascending</option>
                                    <option value="course_desc">Course name descending</option>
                                    <option value="date_asc">Date ascending</option>
                                    <option value="date_desc">Date descending</option>
                                    <option value="amount_asc">Amount ascending</option>
                                    <option value="amount_desc">Amount descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
