import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/api';
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (error || !movie) return <div className="error">{error || 'Movie not found'}</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <img 
          src={movie.poster || 'https://placehold.co/300x450?text=No+Poster'} 
          alt={movie.title} 
          className="detail-poster"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x450?text=No+Poster"; }}
        />
        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          <div className="detail-rating">⭐ {movie.rating ? `${movie.rating}/10` : 'N/A'}</div>
          <div className="detail-genre">{movie.genre || 'Various'}</div>
          <p className="detail-description">{movie.description || 'No description available for this movie.'}</p>
          
          <button 
            className="book-tickets-btn"
            onClick={() => navigate(`/shows/${movie._id}`)}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
