import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Backend might be down.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const query = searchParams.get('search')?.toLowerCase() || '';
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(query) || 
    (movie.genre && movie.genre.toLowerCase().includes(query))
  );

  return (
    <div className="home-container">
      <div className="banner">
        <h2>Book Your Tickets Now!</h2>
        <p>Catch the latest movies in your favorite theaters.</p>
      </div>
      
      <div className="section-title">
        <h3>{query ? `Search Results for "${searchParams.get('search')}"` : 'Recommended Movies'}</h3>
      </div>
      
      {loading && <div className="loading">Loading movies...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <div className="movie-list-container">
          <div className="movie-list">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            ) : (
              <p>No movies match your search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;