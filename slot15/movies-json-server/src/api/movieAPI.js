import axios from 'axios';

const movieApi = axios.create({
  baseURL: 'http://localhost:3001', // json-server
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default movieApi;
