// src/pages/MovieManager.jsx
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';

// Component con hiển thị nội dung, được bọc bởi Provider
const MovieManagerContent = () => {
    const { filters, filteredMovies, loading, movies, genres } = useMovieState();
    const { handleFilterChange, clearFilters } = useMovieDispatch();
    const { user } = useAuthState();
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    
    // Hiển thị welcome message khi component mount lần đầu hoặc khi user mới đăng nhập
    useEffect(() => {
        if (user) {
            const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
            if (!hasSeenWelcome) {
                setShowWelcomeMessage(true);
                sessionStorage.setItem('hasSeenWelcome', 'true');
                
                // Tự động ẩn sau 5 giây
                const timer = setTimeout(() => {
                    setShowWelcomeMessage(false);
                }, 3000);
                
                return () => clearTimeout(timer);
            }
        }
    }, [user]);

    // Show loading on initial load
    if (loading && movies.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" className="mb-3" />
                <p>Đang tải dữ liệu...</p>
            </Container>
        );
    }

    // Check if JSON server is running
    if (!loading && movies.length === 0 && genres.length === 0) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">
                    <Alert.Heading>⚠️ Không thể kết nối đến server</Alert.Heading>
                    <p>Vui lòng kiểm tra JSON Server đã chạy chưa:</p>
                    <pre className="bg-dark text-light p-3 rounded">
                        cd lab5/movies-json-server{'\n'}
                        npx json-server --watch db.json --port 3001
                    </pre>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5">
            {showWelcomeMessage && user && (
                <Alert variant="success" dismissible onClose={() => setShowWelcomeMessage(false)} className="mb-4">
                    <Alert.Heading>🎉 Chào mừng <strong>{user.username}</strong> đến với trang quản lý phim!</Alert.Heading>
                    <p className="mb-0">Bạn có thể bắt đầu quản lý phim của bạn ngay bây giờ</p>
                </Alert>
            )}
            
            <h1 className="text-center mb-4">🎬 Quản lý Phim</h1>
            
            <MovieForm /> 
            
            <h2 className="mt-5 mb-3">Danh sách Phim</h2>
            
            <FilterBar 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
            />
            
            <div className="text-muted mb-2">
                Tìm thấy <strong>{filteredMovies?.length || 0}</strong> phim
            </div>
            
            <MovieTable /> 
            
        </Container>
    );
}

// Component chính cung cấp Context
const MovieManager = () => (
    <MovieProvider>
        <MovieManagerContent />
    </MovieProvider>
);

export default MovieManager;