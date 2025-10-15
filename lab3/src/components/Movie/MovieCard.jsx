import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Toast, ToastContainer } from 'react-bootstrap';
import { movies } from '../../data/movie';


export default function MovieCard({ filteredMovies = [] }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Use filtered movies if provided, otherwise use all movies
  const moviesToDisplay = filteredMovies.length > 0 ? filteredMovies : movies;

  // Lấy danh sách favourites từ localStorage
  const getFavourites = () => {
    const favourites = localStorage.getItem('movieFavourites');
    return favourites ? JSON.parse(favourites) : [];
  };

  // Lưu favourites vào localStorage
  const saveFavourites = (favourites) => {
    localStorage.setItem('movieFavourites', JSON.stringify(favourites));
  };

  // Thêm phim vào favourites
  const addToFavourites = (movie) => {
    const favourites = getFavourites();
    const isAlreadyFavourite = favourites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavourite) {
      favourites.push(movie);
      saveFavourites(favourites);
      setToastMessage('Added to favourites!');
      setShowToast(true);
    } else {
      setToastMessage('Already in favourites!');
      setShowToast(true);
    }
  };

  // Rút gọn description
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Row className="g-4">
        {moviesToDisplay.map((movie) => (
          <Col key={movie.id} xs={12} md={6} lg={4}>
            <Card 
              className="h-100 shadow-sm movie-card"
              style={{ 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <Card.Img 
                  variant="top" 
                  src={movie.poster} 
                  alt={`${movie.title} movie poster`}
                  style={{ 
                    height: '300px', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}
                >
                  {movie.duration} min
                </div>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <Badge bg="primary" className="me-2">{movie.genre}</Badge>
                  <Badge bg="secondary">{movie.year}</Badge>
                </div>
                
                <Card.Title className="h5 mb-2" style={{ fontSize: '1.1rem' }}>
                  {movie.title}
                </Card.Title>
                
                <Card.Text className="text-muted mb-3 flex-grow-1" style={{ fontSize: '0.9rem' }}>
                  {truncateDescription(movie.description)}
                </Card.Text>
                
                <div className="mb-3">
                  <small className="text-muted">
                    <strong>Country:</strong> {movie.country}
                  </small>
                </div>
                
                <div className="d-grid gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => addToFavourites(movie)}
                  >
                    Add to Favourites
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast thông báo */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Movie App</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}