// src/api/movies.js
import http from './http';

const moviesAPI = {
  // GET all movies
  getAllMovies: () => http.get('/movies'),
  
  // GET movie by ID
  getMovieById: (id) => http.get(`/movies/${id}`),
  
  // POST create new movie
  createMovie: (movieData) => http.post('/movies', movieData),
  
  // PUT update movie
  updateMovie: (id, movieData) => http.put(`/movies/${id}`, movieData),
  
  // DELETE movie
  deleteMovie: (id) => http.delete(`/movies/${id}`),
  
  // GET all genres
  getAllGenres: () => http.get('/genres'),
};

export default moviesAPI;

