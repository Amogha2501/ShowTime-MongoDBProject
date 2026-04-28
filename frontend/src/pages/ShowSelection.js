import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getShowsByMovieId } from '../services/api';
import ShowCard from '../components/ShowCard';
const ShowSelection = () => {
  const { movieId } = useParams();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await getShowsByMovieId(movieId);
        setShows(response.data);
      } catch (err) {
        console.error("Error fetching shows:", err);
        setError("Failed to load shows.");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [movieId]);

  if (loading) return <div className="loading">Loading shows...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="show-selection-container">
      <h2 className="shows-title">Select Show Time</h2>
      
      {shows.length > 0 ? (
        shows.map(show => (
          <ShowCard key={show._id} show={show} />
        ))
      ) : (
        <div className="no-shows">No shows available for this movie at the moment.</div>
      )}
    </div>
  );
};

export default ShowSelection;