import React from 'react';
import { Link } from 'react-router-dom';
const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="movie-card">
      <div className="movie-poster-container">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="movie-poster"
        />
        <div className="movie-rating">
          ⭐ {movie.rating ? `${movie.rating}/10` : 'N/A'}
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
      </div>
    </Link>
  );
};

export default MovieCard;