import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getMovies = () => api.get('/movies');
export const getMovieById = (id) => api.get(`/movies/${id}`);
export const getShowsByMovieId = (movieId) => api.get(`/shows/movie/${movieId}`);
export const getShowById = (id) => api.get(`/shows/${id}`);
export const createBooking = (bookingData) => api.post('/bookings/create', bookingData);
export const getUserBookings = (userId) => api.get(`/bookings/user/${userId}`);

export default api;