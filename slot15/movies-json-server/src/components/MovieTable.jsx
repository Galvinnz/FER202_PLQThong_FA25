import React from "react";
import {
  Table,
  Button,
  Image,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useMovieState, useMovieDispatch } from "../contexts/MovieContext";

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();

  const {
    movies,
    genres,
    loading,
    movieToDelete,
    showDeleteModal,
  } = state;

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: "OPEN_DELETE_MODAL", payload: movie });
  };

  const fallbackAvatar =
    "https://via.placeholder.com/50x50?text=No+Img";

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            className="me-2"
          />
          <Alert variant="info" className="mt-3">
            Đang tải dữ liệu phim...
          </Alert>
        </div>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="mt-4"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          <thead className="table-light align-middle text-center">
            <tr>
              <th style={{ width: "80px" }}>Avatar</th>
              <th style={{ width: "60px" }}>ID</th>
              <th style={{ minWidth: "220px" }}>Tên Phim</th>
              <th style={{ width: "140px" }}>Danh mục</th>
              <th style={{ width: "140px" }}>Thời lượng (phút)</th>
              <th style={{ width: "140px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || "Unknown";
              return (
                <tr key={movie.id}>
                  {/* Avatar */}
                  <td className="text-center">
                    <Image
                      src={movie.avatar || fallbackAvatar}
                      alt={movie.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      rounded
                    />
                  </td>

                  {/* ID */}
                  <td className="text-center">
                    #{movie.id}
                  </td>

                  {/* Tên phim + năm */}
                  <td>
                    <div style={{ fontWeight: 600 }}>
                      {movie.title}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      ({movie.year})
                    </div>
                  </td>

                  {/* Thể loại */}
                  <td className="text-center">{genreName}</td>

                  {/* Thời lượng */}
                  <td className="text-center">
                    {movie.duration} phút
                  </td>

                  {/* Action buttons */}
                  <td className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditClick(movie)}
                      className="me-2"
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(movie)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* Modal Xác nhận Xóa */}
      <Modal
        show={showDeleteModal}
        onHide={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim{" "}
          <strong>"{movieToDelete?.title}"</strong> (ID:{" "}
          {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="danger"
            onClick={() => confirmDelete(movieToDelete.id)}
          >
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
