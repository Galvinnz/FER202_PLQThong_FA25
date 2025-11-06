// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  // Lấy confirmDelete từ Context (chứa logic xóa phim)
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  
  const { filteredMovies, genres, loading, movieToDelete, showDeleteModal, movieToView, showDetailsModal } = state;
  
  // Use filteredMovies instead of movies
  const movies = filteredMovies || [];

  // Tạo genre map từ dữ liệu API
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
      // Mở Modal Sửa và gán dữ liệu vào state
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      // Mở Modal Xác nhận Xóa và gán phim vào movieToDelete
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const handleViewDetailsClick = (movie) => {
      // Mở Modal Xem Chi Tiết
      dispatch({ type: 'OPEN_DETAILS_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
          </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead className="table-light">
            <tr className="text-center align-middle">
              <th style={{ width: '80px' }}>Avatar</th>
              <th style={{ width: '60px' }}>ID</th>
              <th style={{ minWidth: '150px' }}>Tên Phim</th>
              <th style={{ width: '120px' }}>Danh mục</th>
              <th style={{ width: '120px' }}>Thời lượng (phút)</th>
              <th style={{ width: '220px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {movies.map((movie, index) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td className="text-center"><Image src={movie.avatar} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                  <td className="text-center">#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td className="text-center">
                    {genreName}
                  </td>
                  <td className="text-center">{movie.duration} phút</td>
                  <td className="text-center">
                    <Button variant="info" size="sm" onClick={() => handleViewDetailsClick(movie)} className="me-2">Chi tiết</Button>
                    <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim **"{movieToDelete?.title}"** (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL XEM CHI TIẾT PHIM */}
      <Modal show={showDetailsModal} onHide={() => dispatch({ type: 'CLOSE_DETAILS_MODAL' })} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🎬 Chi tiết Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieToView && (
            <div className="row">
              <div className="col-md-4 text-center mb-3">
                <Image 
                  src={movieToView.avatar} 
                  alt={movieToView.title} 
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }} 
                  rounded 
                  className="border"
                />
              </div>
              <div className="col-md-8">
                <h3 className="mb-3">{movieToView.title}</h3>
                <div className="mb-2">
                  <strong>ID:</strong> #{movieToView.id}
                </div>
                <div className="mb-2">
                  <strong>Thể loại:</strong> {genreMap[movieToView.genreId] || 'Unknown'}
                </div>
                <div className="mb-2">
                  <strong>Năm sản xuất:</strong> {movieToView.year}
                </div>
                <div className="mb-2">
                  <strong>Quốc gia:</strong> {movieToView.country}
                </div>
                <div className="mb-2">
                  <strong>Thời lượng:</strong> {movieToView.duration} phút
                </div>
                <div className="mt-3">
                  <strong>Mô tả:</strong>
                  <p className="mt-2 text-muted">{movieToView.description}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DETAILS_MODAL' })}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;